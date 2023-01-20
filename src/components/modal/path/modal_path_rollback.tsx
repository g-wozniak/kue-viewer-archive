import * as React from 'react'
import {useMemo, useState} from 'react'
import {Utils} from '@kue-space/common'
import {faUndo} from '@fortawesome/pro-light-svg-icons/faUndo'

import ModalTab from '@c/modal/_modal/_modal_tab'
import UI from '@c/ui/ui'
import {isUIZoneBusy} from '@state/selectors'
import {UIZones} from '@root/properties'

import {RootState} from '@intf/State'

type Props = {
   state: RootState
   onPathwaySyncRollbackButtonClick(version: number)
}

const ModalPathTabRollback = ({state, onPathwaySyncRollbackButtonClick}: Props): JSX.Element => {

   const [version, setVersion] = useState<number | undefined>()
   const isReverting = useMemo(() => isUIZoneBusy(state, UIZones.ButtonModalPathRollback), [state])

   const setVersionOrReset = (v: number) => {
      if (v === version) {
         setVersion(undefined)
      } else {
         setVersion(v)
      }
   }

   return (
      <ModalTab>
         <UI.Message
            header="Early Access warning"
            type="danger"
            text={
               <p>This software is still in Early Access (beta) version. It can introduce unexpected results or issues
                  which we may not be able to fix immediately. We took measures that should allow for manual data
                  restoration should it be necessary.</p>
            }/>
         <h3>Rollback available</h3>
         <span className="--headline">You can revert your pathway to the previously stored version if you are not satisfied with the update.</span>
         <UI.Message
            header="Before reverting"
            type="info"
            text={(
               <p>Once you rollback, the current progress will be reverted to its state from the moment of the pathway update. Card notes
                  stored after the update will be lost.</p>)}/>
         <h3>Versions</h3>
         <span className="--headline">Select the version to which you wish to revert your pathway</span>
         <UI.Table
            name="rollback-versions"
            type="classic"
            thead={['#', 'version', 'created']}
         >
            {state.migrations.map((m) => (
               <tr key={`pathway_rollback_v_${m.version}`}>
                  <td>
                     <UI.Checkbox
                        name={`rollback_version_${m.version}`}
                        type="checkbox"
                        checked={version === m.version}
                        onChange={() => setVersionOrReset(m.version)}/>
                  </td>
                  <td>{Utils.versionIndicator(m.version)}</td>
                  <td>{Utils.isoToDateTime(m.created)}</td>
               </tr>)
            )}
         </UI.Table>
         <div className="--kue-v-b-modal-actions --single">
            <UI.ButtonIcon
               icon={faUndo}
               text="Rollback"
               loading={isReverting}
               disabled={!version || isReverting}
               className="--default"
               onClick={() => onPathwaySyncRollbackButtonClick(version || 0)}
            />
         </div>
      </ModalTab>
   )
}

export default ModalPathTabRollback
