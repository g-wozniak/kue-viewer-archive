import {Dispatch, SetStateAction, useEffect} from 'react'
import {
   PathwaySyncFromBackendPayload,
   PathwaySyncToBackendPayload,
   TPayloads
} from '@kue-space/common'
import {Edge, Node} from 'react-flow-renderer'

import {getAsyncProcess} from '@state/selectors'
import {setAsyncProcess, setVisibilityForProgress, syncPathway, updateMigration} from '@state/actions'
import {AsyncProcesses} from '@root/properties'
import {extractPathway} from '@helpers/convert'
import {isAsyncProcessResolved, isAsyncProcessTriggered} from '@helpers/utils'
import {toggleModalPath} from '@state/ui'

import {Dispatcher, RootState} from '@intf/State'
import {OnSyncPathwayAsyncProcess, PathwaySyncRequest} from '@intf/Requests'
import {BlockEvents} from '@intf/Events'

type Args = {
   state: RootState
   pathwayId: string
   request: PathwaySyncRequest
   setNodes: Dispatch<SetStateAction<Node[]>>
   setEdges: Dispatch<SetStateAction<Edge[]>>
   events: BlockEvents
   dispatcher: Dispatcher
}

const processName = AsyncProcesses.Sync

/**
 * onSyncPathwayHook
 * @description Hook: when user starts synchronising the pathway versions
 * @param state
 * @param dispatcher
 * @param pathwayId
 * @param setNodes
 * @param setEdges
 * @param events
 * @param request
 */
function onSyncPathwayHook({state, dispatcher, pathwayId, setNodes, setEdges, events, request}: Args) {
   useEffect(() => {
      const proc: OnSyncPathwayAsyncProcess = getAsyncProcess(state, processName)
      if (isAsyncProcessTriggered(proc)) {
         request(new PathwaySyncToBackendPayload({pathwayId}).getPayload())
            .then(response => {
               if (response.data) {
                  const previousVersion = state.pathway.version
                  const payload = new PathwaySyncFromBackendPayload(response.data.data as TPayloads.TPathwaySyncFromBackendPayload, response.data.message)
                  const data = payload.getData()

                  // Set new nodes and edges
                  const res = extractPathway(data.nodes, data.edges, events)
                  setNodes(res[0])
                  setEdges(res[1])

                  // Synchronise with the existing pathway model (data)
                  dispatcher(syncPathway(data))

                  // Update visibility based on the pathway progress
                  dispatcher(setVisibilityForProgress(res[0]))

                  // Add possible rollback
                  dispatcher(updateMigration({
                     version: previousVersion,
                     created: new Date().toISOString()
                  }))

                  // Close pathway settings modal
                  dispatcher(toggleModalPath(false))

                  // Mark the process as completed
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

export default onSyncPathwayHook
