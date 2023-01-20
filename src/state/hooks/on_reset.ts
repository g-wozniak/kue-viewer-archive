import {useEffect} from 'react'
import {PathwayResetToBackendPayload} from '@kue-space/common'

import {getAsyncProcess} from '@state/selectors'
import {resetPathwayProgress, setAsyncProcess} from '@state/actions'
import {toggleModalPath} from '@state/ui'
import {AsyncProcesses} from '@root/properties'
import {isAsyncProcessResolved, isAsyncProcessTriggered} from '@helpers/utils'

import {Dispatcher, RootState} from '@intf/State'
import {OnResetPathwayAsyncProcess, PathwayResetRequest} from '@intf/Requests'

type Args = {
   state: RootState
   pathwayId: string
   request: PathwayResetRequest
   dispatcher: Dispatcher
}

const processName = AsyncProcesses.Reset

/**
 * onResetPathwayHook
 * @description Hook: when user resets the pathway progress (pathway modal)
 * @param state
 * @param dispatcher
 * @param pathwayId
 * @param request
 */
function onResetPathwayHook({state, dispatcher, pathwayId, request}: Args) {
   useEffect(() => {
      const proc: OnResetPathwayAsyncProcess = getAsyncProcess(state, processName)
      if (isAsyncProcessTriggered(proc)) {
         request(new PathwayResetToBackendPayload({pathwayId}).getPayload())
            .then(() => {
               // Reset pathway temporary progress in both: pathway model and temporary progress
               dispatcher(resetPathwayProgress())

               // Close pathway settings modal
               dispatcher(toggleModalPath(false))

               // Set process as completed
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

export default onResetPathwayHook
