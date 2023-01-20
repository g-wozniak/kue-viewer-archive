import {useEffect} from 'react'
import {PathwaySaveNodesToBackendPayload, TPayloads} from '@kue-space/common'
import {Node} from 'react-flow-renderer'

import {getAsyncProcess} from '@state/selectors'
import {setAsyncProcess, setBlockPositionChange} from '@state/actions'
import {AsyncProcesses} from '@root/properties'

import {isAsyncProcessResolved, isAsyncProcessTriggered} from '@helpers/utils'

import {Dispatcher, RootState} from '@intf/State'
import {OnSaveNodesPathwayAsyncProcess, PathwaySaveNodesRequest} from '@intf/Requests'

type Args = {
   state: RootState
   pathwayId: string
   nodes: Node[]
   request: PathwaySaveNodesRequest
   dispatcher: Dispatcher
}

const processName = AsyncProcesses.SaveNodes

function mapNodesToPositions(nodes: Node[]): TPayloads.TPathwayNodePositionFragment[] {
   return nodes.map(node => ({
      id: node.id,
      x: node.position.x,
      y: node.position.y
   }))
}

/**
 * onSaveNodesPathwayHook
 * @description Hook: when user saves the current nodes position (tracker)
 * @param state
 * @param dispatcher
 * @param pathwayId
 * @param nodes
 * @param request
 */
function onSaveNodesPathwayHook({state, dispatcher, pathwayId, nodes, request}: Args) {
   useEffect(() => {
      const proc: OnSaveNodesPathwayAsyncProcess = getAsyncProcess(state, processName)
      if (isAsyncProcessTriggered(proc)) {
         request(new PathwaySaveNodesToBackendPayload({pathwayId, nodes: mapNodesToPositions(nodes)}).getPayload())
            .then(() => {
               // The nodes position is already reflected in the flow diagram because it comes from there
               // Set block position change back to default
               dispatcher(setBlockPositionChange(false))
               dispatcher(setAsyncProcess(processName, 'completed'))
            })
            .catch(() => {
               dispatcher(setAsyncProcess(processName, 'failed'))
            })
      } else if (isAsyncProcessResolved(proc)) {
         dispatcher(setAsyncProcess(processName, 'idle'))
      }
   }, [getAsyncProcess(state, processName)])
}

export default onSaveNodesPathwayHook
