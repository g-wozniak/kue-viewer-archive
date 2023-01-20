import React, {useMemo} from 'react'
import {CardConfig, common_CardTypes, Configs, Utils} from '@kue-space/common'
import ModalTab from '@c/modal/_modal/_modal_tab'
import UI from '@c/ui/ui'
import countBy from 'lodash/countBy'
import {isUIZoneBusy} from '@state/selectors'
import {RootState} from '@intf/State'
import {UIZones} from '@root/properties'
import CardIcon from '@c/cards/block/card_icon'

type Props = {
   state: RootState
   revealedBlocks: number
   onPathwayResetProgress()
}

const ModalPathTabDetails = ({state, revealedBlocks, onPathwayResetProgress}: Props): JSX.Element => {
   const pathway = state.pathway
   const totalBlocks = useMemo(() => pathway.nodes.length, [pathway])
   const totalCards = useMemo(() => countBy(pathway.nodes, (node) => node.cardType), [pathway])
   const isResetting = useMemo(() => isUIZoneBusy(state, UIZones.ModalPath), [state.processes])
   return (
      <ModalTab>
         <h3>Pathway details</h3>
         <UI.Table name="pathway-details" type="stats">
            <UI.Table.Stat label="Name">
               <span>{pathway.customName}</span>
            </UI.Table.Stat>
            <UI.Table.Stat label="Goal">
               <span>{pathway.nodes.find(n => n._id === 'goal')!.description}</span>
            </UI.Table.Stat>
            <UI.Table.Stat label="Cards">
               <span className="--stat-total">
                  <strong>{totalBlocks}</strong> cards in total
               </span>
               <span className="--stat-count">
                  <ul>
                  {
                     Utils.enumToValues(common_CardTypes).map((type, i) => {
                        const totalCardsForType = totalCards.hasOwnProperty(type) ? totalCards[type].toString() : '0'
                        const blockConfig: CardConfig = Configs.cards[type]
                        return (
                           <li key={`stat-block-${type}-${i}`}>
                              <span className="--icon">
                                 <CardIcon icon={blockConfig.icon} height={16} alt={blockConfig.caption}/>
                              </span>
                              <span className="--name">
                                 {blockConfig.caption}
                              </span>
                              <span className={`--quantity --card-${blockConfig.slug}`}>
                                 {totalCardsForType}
                              </span>
                           </li>
                        )
                     })
                  }
                  </ul>
               </span>
            </UI.Table.Stat>
            <UI.Table.Stat label="Last change">
               <span>{Utils.isoToDateTime(pathway.modified)}</span>
            </UI.Table.Stat>
            <UI.Table.Stat label="Created">
               <span>{Utils.isoToDateTime(pathway.created)}</span>
            </UI.Table.Stat>
         </UI.Table>
         <h3>Progress</h3>
         <UI.Table name="pathway-progress" type="stats">
            <UI.Table.Stat label="Explored">
               <span className="--stat-progress">
                  so far, <strong>{revealedBlocks}</strong> cards completed and <strong>{totalBlocks-revealedBlocks}</strong> to go
               </span>
               <div className="--stat-button">
                  <UI.Button
                     onClick={onPathwayResetProgress}
                     disabled={isResetting || revealedBlocks === 0}
                     primary={true}
                  >Reset progress</UI.Button>
               </div>
            </UI.Table.Stat>
         </UI.Table>
      </ModalTab>
   )
}

export default ModalPathTabDetails
