import * as React from 'react'
import {useMemo, useState} from 'react'
import {faClone} from '@fortawesome/pro-light-svg-icons/faClone'

import ModalTab from '@c/modal/_modal/_modal_tab'
import UI from '@c/ui/ui'
import {isUIZoneBusy} from '@state/selectors'
import {UIZones} from '@root/properties'

import {RootState} from '@intf/State'

type Props = {
   state: RootState
   onPathwaySyncButtonClick()
}

const ModalPathTabSynchronise = ({state, onPathwaySyncButtonClick}: Props): JSX.Element => {

   const [confirmed, setConfirmed] = useState(false)
   const isUpdating = useMemo(() => isUIZoneBusy(state, UIZones.ButtonModalPathUpdate), [state])

   return (
      <ModalTab>
         <UI.Message
            header="Early Access warning"
            type="danger"
            text={
               <p>This software is still in Early Access (beta) version. It can introduce unexpected results or issues
                  which we may not be able to fix immediately. We took measures that should ensure a safe rollback in
                  case of such event occurrence.</p>
            }/>
         <h3>You can update your pathway!</h3>
         <span className="--headline">Your mentor published the more recent version of your pathway. This means you are able to update it and bring it up to date.</span>
         <UI.Message
            header="Before you update"
            type="info"
            text={(
               <>
                  <p>The update replaces your current pathway version and things like your discovery progress or card
                     notes may be deleted during the process.</p>
                  <p>We strongly recommend reading the following guide before updating.</p>
               </>
            )}
            list={[
               <span key="mpsw1">How the update works?</span>,
               <span key="mpsw2">Can I roll back if I do not like the changes?</span>,
               <span key="mpsw3">Should I update?</span>
            ]}/>
         <div className="--kue-v-b-modal-actions">
            <UI.Checkbox
               name="confirm-update"
               type="toggle"
               checked={confirmed}
               onChange={() => setConfirmed(!confirmed)}
               label="I understand the change and I want to update this pathway"
            />
            <UI.ButtonIcon
               icon={faClone}
               text="Update"
               loading={isUpdating}
               disabled={!confirmed || isUpdating}
               className="--default"
               onClick={onPathwaySyncButtonClick}
            />
         </div>
      </ModalTab>
   )
}

export default ModalPathTabSynchronise

/*

         <h4>How the update works?</h4>
         <p>We will replace your pathway nodes and links with the most recent version provided by your mentor.</p>
         <p>The following changes will happen:</p>
         <ul>
            <li>The cards which your mentor did not change will remain the same.</li>
            <li>Your pathway discovery and progress along with your personal card notes will remain unchanged but only for the cards present in both versions.</li>
            <li>Any progress and notes saved for the cards that are no longer there will be cleared</li>
         </ul>

         <h4>Should I update?</h4>
         <p>For the best experience, we suggest to keep the pathway up to date but we also recommend to reset the progress and start over, learn about differences and changes yourself.</p>

         <h4>What if I change my mind?</h4>
         <p>You can rollback the change.</p>
 */