import React from 'react'
import {faSitemap} from '@fortawesome/pro-light-svg-icons/faSitemap'

import {Modals, UIZones} from '@root/properties'
import {isModalOpen, isUIZoneBusy} from '@state/selectors'
import ModalWrapper from '@c/modal/_modal/_modal'
import ModalCaption from '@c/modal/_modal/_modal_caption'
import ModalTabsWrapper from '@c/modal/_modal/_modal_tabs'
import ModalPathTabDetails from '@c/modal/path/modal_path_details'
import ModalPathTabSynchronise from '@c/modal/path/modal_path_synchronise'
import ModalPathTabRollback from '@c/modal/path/modal_path_rollback'

import {RootState} from '@intf/State'
import {TrackbarEvents} from '@intf/Events'

type Props = {
   state: RootState
   discrepancy: number
   canRollback: boolean
   events: TrackbarEvents
}

const ModalPath = ({discrepancy, canRollback, state, events}: Props) => {

   return (
      <ModalWrapper
         decoratorClassName="--kue-v-b-modal-path"
         theme={state.pathway.theme}
         modal={{
            open: isModalOpen(state, Modals.Path),
            onClose: events.onModalPathClose
         }}
         dimmer={{
            busy: isUIZoneBusy(state, UIZones.ModalPath),
            header: 'Please wait...',
            subheader: 'We are working on the request'
         }}
         header={
            <ModalCaption
               icon={faSitemap}
               label="Pathway settings"
               description="Your pathway details and configuration"
               onClose={events.onModalPathClose}/>
         }>
         <ModalTabsWrapper tabs={[
            {
               menuItem: 'Details',
               render: () => <ModalPathTabDetails revealedBlocks={state.blocks.revealed.length} state={state} onPathwayResetProgress={events.onPathwayResetProgressButtonClick} />
            },
            {
               ...(discrepancy > 0 && {menuItem: 'Update', render: () => <
                  ModalPathTabSynchronise
                     state={state}
                     onPathwaySyncButtonClick={events.onPathwaySyncButtonClick}
                  />})
            },
            {
               ...(canRollback && {menuItem: 'Rollback', render: () => <
                     ModalPathTabRollback
                     state={state}
                     onPathwaySyncRollbackButtonClick={events.onPathwaySyncRollbackButtonClick}
                  />})
            }
         ]}/>
      </ModalWrapper>
   )
}

export default ModalPath
