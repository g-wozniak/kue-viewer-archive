import {Dispatch, SetStateAction, useEffect} from 'react'
import {PathwaySyncRollbackFromBackendPayload, PathwaySyncRollbackToBackendPayload} from '@kue-space/common'
import {Edge, Node} from 'react-flow-renderer'

import {getAsyncProcess} from '@state/selectors'
import {deleteMigration, setAsyncProcess, syncPathway} from '@state/actions'
import {AsyncProcesses} from '@root/properties'
import {extractPathway} from '@helpers/convert'
import {isAsyncProcessResolved, isAsyncProcessTriggered} from '@helpers/utils'
import {toggleModalPath} from '@state/ui'

import {Dispatcher, RootState} from '@intf/State'
import {OnSyncRollbackPathwayAsyncProcess, PathwaySyncRollbackRequest} from '@intf/Requests'
import {BlockEvents} from '@intf/Events'


type Args = {
   state: RootState
   pathwayId: string
   request: PathwaySyncRollbackRequest
   setNodes: Dispatch<SetStateAction<Node[]>>
   setEdges: Dispatch<SetStateAction<Edge[]>>
   events: BlockEvents
   dispatcher: Dispatcher
}

const processName = AsyncProcesses.SyncRollback

/**
 * onSyncRollbackPathwayHook
 * @description Hook: triggered when user chooses to rollback the pathway previously synchronised
 * @param state
 * @param dispatcher
 * @param pathwayId
 * @param setNodes
 * @param setEdges
 * @param events
 * @param request
 */
function onSyncRollbackPathwayHook({state, dispatcher, pathwayId, setNodes, setEdges, events, request}: Args) {
   useEffect(() => {
      const proc: OnSyncRollbackPathwayAsyncProcess = getAsyncProcess(state, processName)
      if (isAsyncProcessTriggered(proc)) {
         const toVersion = proc.payload.version
         request(new PathwaySyncRollbackToBackendPayload({pathwayId, version: toVersion}).getPayload())
            .then(response => {
               if (response.data && response.data.data) {

                  // Obtain new nodes, edges and version after the rollback
                  const fromBackendPayload = new PathwaySyncRollbackFromBackendPayload(response.data.data)
                  const data = fromBackendPayload.getData()

                  // Set the new nodes and edges
                  const res = extractPathway(data.nodes, data.edges, events)
                  setNodes(res[0])
                  setEdges(res[1])

                  // Synchronise with the existing pathway model (data)
                  dispatcher(syncPathway(data))

                  // Remove the original version from the migrations
                  dispatcher(deleteMigration(toVersion))

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

export default onSyncRollbackPathwayHook
