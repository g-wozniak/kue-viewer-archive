import * as React from 'react'
import {faObjectGroup} from '@fortawesome/pro-light-svg-icons/faObjectGroup'
import {faSitemap} from '@fortawesome/pro-light-svg-icons/faSitemap'
import {faDistributeSpacingVertical} from '@fortawesome/pro-light-svg-icons/faDistributeSpacingVertical'
import {faUserCrown} from '@fortawesome/pro-light-svg-icons/faUserCrown'
import {faRightFromBracket} from '@fortawesome/pro-light-svg-icons/faRightFromBracket'
import {daysTillNow} from '@helpers/utils'
import UI from '@c/ui/ui'
import Logo from '@c/logo/logo'
import TrackbarBannerVersion from '@c/trackbar/trackbar_banner_version'
import TrackbarBannerProgress from '@c/trackbar/trackbar_banner_progress'
import TrackbarBannerRemaining from '@c/trackbar/trackbar_banner_remaining'
import {canRollbackPathway, getVersionDiscrepancy, hasBlockPositionChanged, isUIZoneBusy} from '@state/selectors'
import {UIZones} from '@root/properties'

import {Dispatcher, RootState} from '@intf/State'
import {TrackbarEvents} from '@intf/Events'
import {useMemo} from 'react'
import ModalPath from '@c/modal/path/modal_path'
import ModalMentor from '@c/modal/mentor/modal_mentor'

type Props = {
   state: RootState
   events: TrackbarEvents
}

const Trackbar = ({state, events}: Props) => {
   const {pathway, blocks} = state
   const allBlocks = pathway.nodes.length
   const revealedBlocks = blocks.revealed.length
   const discrepancy = useMemo(() => getVersionDiscrepancy(state), [state])
   const canRollback = canRollbackPathway(state)
   const isBusy = useMemo(() => isUIZoneBusy(state, UIZones.ButtonSaveNodes), [state])
   return (
      <nav id="viewer-trackbar" className="--kue-v-tb">
         <UI.Window>
            <div className="--kue-v-tb--inner">
               <div className="--kue-v-tb-details">
                  <div className="--kue-v-tb-details-pathway">
                     <div className="--logo">
                        <Logo width={24}/>
                     </div>
                     <div className="--pathway">
                        <h3 className="--name">{pathway.customName}</h3>
                        <span
                           className="--started">Acquired from <strong>{pathway.mentor.nickname}</strong> and started <strong>{daysTillNow(pathway.created)}</strong> ago.</span>
                     </div>
                  </div>
                  <div className="--kue-v-tb-details-progress">
                     <TrackbarBannerVersion pathway={pathway} discrepancy={discrepancy}/>
                     <TrackbarBannerProgress allBlocks={allBlocks} revealedBlocks={revealedBlocks}/>
                     <TrackbarBannerRemaining allBlocks={allBlocks} revealedBlocks={revealedBlocks}/>
                  </div>
               </div>
               <nav className="--kue-v-tb-menu">
                  <UI.Menu
                     items={[
                        <UI.ButtonIcon key="m1i1" icon={faDistributeSpacingVertical} text={'Align'} onClick={events.onAlignButtonClick}/>,
                        <UI.ButtonIcon key="m1i2" loading={isBusy} disabled={!hasBlockPositionChanged(state) || isBusy} icon={faObjectGroup} text={'Save'} onClick={events.onSaveNodesButtonClick}/>
                     ]}
                  />
                  <UI.Menu
                     items={[
                        <UI.ButtonIcon key="m2i1" icon={faSitemap} text={'Path'} onClick={events.onPathButtonClick}/>,
                        <UI.ButtonIcon key="m2i2" icon={faUserCrown} text={'Mentor'} onClick={events.onMentorButtonClick}/>,
                        <UI.ButtonIcon key="m2i3" icon={faRightFromBracket} text={'Exit'} onClick={events.onCloseButtonClick}/>
                     ]}
                  />
               </nav>
            </div>
            <ModalPath state={state} discrepancy={discrepancy} canRollback={canRollback} events={events}/>
            <ModalMentor state={state} events={events}/>
         </UI.Window>
      </nav>
   )
}

export default Trackbar
