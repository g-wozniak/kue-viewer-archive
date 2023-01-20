import {Dispatch, SetStateAction, useEffect} from 'react'
import {
   PathwayToBackendPayload,
   PathwayViewerModel, TModels,
   TPayloads
} from '@kue-space/common'
import {Edge, Node, Project} from 'react-flow-renderer'
import {omit} from 'lodash'

import {getAsyncProcess} from '@state/selectors'
import {
   setAsyncProcess, setMigrations,
   setPathway, setVisibilityForProgress
} from '@state/actions'
import {AsyncProcesses} from '@root/properties'
import {isAsyncProcessResolved, isAsyncProcessTriggered} from '@helpers/utils'
import {extractPathway} from '@helpers/convert'

import {Dispatcher, RootState} from '@intf/State'
import {OnPullPathwayAsyncProcess, PathwayRequest} from '@intf/Requests'
import {BlockEvents} from '@intf/Events'


type Args = {
   dispatcher: Dispatcher
   state: RootState
   project: Project
   pathwayId: string
   request: PathwayRequest
   events: BlockEvents
   setNodes: Dispatch<SetStateAction<Node[]>>
   setEdges: Dispatch<SetStateAction<Edge[]>>
}

const processName = AsyncProcesses.Pull

/**
 * onPullPathwayHook
 * @description Hook: when user launches the viewer and the pathway is getting pulled from the API
 * @param state
 * @param dispatcher
 * @param pathwayId
 * @param request
 * @param events
 * @param setNodes
 * @param setEdges
 */
function onPullPathwayHook({state, dispatcher, pathwayId, request, events, setNodes, setEdges}: Args) {

   useEffect(() => {
      const proc: OnPullPathwayAsyncProcess = getAsyncProcess(state, processName)
      if (isAsyncProcessTriggered(proc)) {
         request(new PathwayToBackendPayload({pathwayId}).getPayload())
            .then(response => {

               if (response.data) {
                  const payload = response.data.data as TPayloads.TPathwayFromBackendPayload
                  const pathway = new PathwayViewerModel(omit(payload, 'migrations') as TModels.PathwayViewerItem)

                  dispatcher(setPathway(pathway.toJSON()))

                  // Convert the nodes structure from the database object to builder language
                  const nodes = pathway.getNodes()
                  const edges = pathway.getEdges()
                  const res = extractPathway(nodes, edges, events)

                  // Set nodes and edges as the active revision is
                  setNodes(res[0])
                  setEdges(res[1])

                  // Set available pathway roll back
                  dispatcher(setMigrations(payload.migrations))

                  // Update visibility based on the pathway progress
                  dispatcher(setVisibilityForProgress(res[0]))

                  // Toggle initial UI panel
                  // dispatcher(toggleRevisionsPanel(true))

                  // Complete the process
                  dispatcher(setAsyncProcess(processName, 'completed'))
               } else {
                  dispatcher(setAsyncProcess(processName, 'failed'))
               }
            })
            .catch(() => {
               dispatcher(setAsyncProcess(processName, 'failed'))
            })

      } else if (isAsyncProcessResolved(proc)) {
         dispatcher(setAsyncProcess(processName, 'idle'))
      }
   }, [getAsyncProcess(state, processName)])

}

export default onPullPathwayHook