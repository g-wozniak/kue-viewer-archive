import React, {useMemo} from 'react'
import {faUserCrown} from '@fortawesome/pro-light-svg-icons/faUserCrown'

import {Modals, UIZones} from '@root/properties'
import {isModalOpen, isUIZoneBusy} from '@state/selectors'

import ModalWrapper from '@c/modal/_modal/_modal'
import ModalCaption from '@c/modal/_modal/_modal_caption'

import {RootState} from '@intf/State'
import {TrackbarEvents} from '@intf/Events'
import UI from '@c/ui/ui'

type Props = {
   state: RootState
   events: TrackbarEvents
}

const ModalMentor = ({events, state}: Props) => {
   const mentor = useMemo(() => state.pathway.mentor, [state.pathway.mentor])

   return (
      <ModalWrapper
         decoratorClassName="--kue-v-b-modal-mentor"
         theme={state.pathway.theme}
         modal={{
            open: isModalOpen(state, Modals.Mentor),
            onClose: events.onModalMentorClose
         }}
         dimmer={{
            busy: isUIZoneBusy(state, UIZones.ModalMentor),
            header: 'We are on it...',
            subheader: 'Please wait while we are processing your request'
         }}
         header={
            <ModalCaption
               icon={faUserCrown}
               label="Your mentor"
               onClose={events.onModalMentorClose}/>
         }>
         <UI.Table name="mentor" type="stats">
            <UI.Table.Stat label="Nickname">
               <span>{mentor.nickname}</span>
            </UI.Table.Stat>
            <UI.Table.Stat label="Profile">
               <span><a href={`/u/${mentor.nickname}`} rel="nofollow" target="_blank">visit profile</a></span>
            </UI.Table.Stat>
         </UI.Table>
      </ModalWrapper>
   )
}

export default ModalMentor
