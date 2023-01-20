import {useEffect} from 'react'
import {PathwayExploreToBackendPayload} from '@kue-space/common'

import {getAsyncProcess} from '@state/selectors'
import {deselectBlock, revealCard, setAsyncProcess} from '@state/actions'
import {AsyncProcesses} from '@root/properties'

import {isAsyncProcessResolved, isAsyncProcessTriggered} from '@helpers/utils'

import {Dispatcher, RootState} from '@intf/State'
import {OnExplorePathwayAsyncProcess, PathwayExploreRequest} from '@intf/Requests'
import {toggleModalCardDetails} from '@state/ui'

type Args = {
   state: RootState
   pathwayId: string
   request: PathwayExploreRequest
   dispatcher: Dispatcher
}

const processName = AsyncProcesses.Explore

/**
 * onExplorePathwayHook
 * @description Hook: when user presses "Explore" button on the card
 * @param state
 * @param dispatcher
 * @param pathwayId
 * @param request
 */
function onExplorePathwayHook({state, dispatcher, pathwayId, request}: Args) {
   useEffect(() => {
      const proc: OnExplorePathwayAsyncProcess = getAsyncProcess(state, processName)
      if (isAsyncProcessTriggered(proc) && proc.payload) {

         // Prepare a new progress
         const {cardId} = proc.payload

         request(new PathwayExploreToBackendPayload({pathwayId, cardId}).getPayload())
            .then(() => {

               // Set the exploration progress in the app
               dispatcher(revealCard(proc.payload))

               // Hide modal
               dispatcher(toggleModalCardDetails(false))

               // Deselect block
               dispatcher(deselectBlock())

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

export default onExplorePathwayHook
