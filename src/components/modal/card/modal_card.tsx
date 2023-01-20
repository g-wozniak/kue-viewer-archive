import React, {useCallback, useMemo} from 'react'
import {CardConfig, common_CardTypes} from '@kue-space/common'
import {faArrowTurnDownLeft} from '@fortawesome/pro-light-svg-icons/faArrowTurnDownLeft'
import {faCheck} from '@fortawesome/pro-light-svg-icons/faCheck'

import {AsyncProcesses, Modals, UIZones} from '@root/properties'
import config from '@root/config'
import {getSelectedBlock, isBlockRevealed, isModalOpen, isUIZoneBusy} from '@state/selectors'
import {toggleModalCardDetails} from '@state/ui'
import {deselectBlock, setAsyncProcess} from '@state/actions'
import UI from '@c/ui/ui'
import CardLayout from '@c/cards/layouts/layout'
import ModalSectionDifficulty from '@c/modal/card/modal_card_difficulty'
import ModalSectionTimeToComplete from '@c/modal/card/modal_card_time'
import ModalSectionCost from '@c/modal/card/modal_card_cost'
import ModalWrapper from '@c/modal/_modal/_modal'
import ModalCaption from '@c/modal/_modal/_modal_caption'
import ModalMetrics from '@c/modal/_modal/_modal_metrics'

import {Dispatcher, RootState} from '@intf/State'

type Props = {
   dispatcher: Dispatcher
   state: RootState
}

const ModalCard = ({dispatcher, state}: Props) => {

   const selectedBlock = getSelectedBlock(state)

   if (selectedBlock && selectedBlock.type && selectedBlock.id) {
      const {id, type, data} = selectedBlock

      const blockConfig = config.blocks[selectedBlock.type] as CardConfig

      const accumulatedBlockStats = blockConfig.stats

      const onClose = useCallback(() => {
         dispatcher(toggleModalCardDetails(false))
         dispatcher(deselectBlock())
      }, [dispatcher])

      const isRevealed = useMemo(() => isBlockRevealed(state, id), [state, id])

      return (
         <ModalWrapper
            decoratorClassName={`--${blockConfig.slug}`}
            theme={state.pathway.theme}
            modal={{
               open: isModalOpen(state, Modals.CardDetails) && !!id,
               onClose
            }}
            dimmer={{
               busy: isUIZoneBusy(state, UIZones.ModalCardDetails),
               header: 'Congratulations! Your skills are growing!',
               subheader: 'Wait until we saved the progress...'
            }}
            header={
               <>
                  <ModalCaption
                     image={blockConfig.icon}
                     label={data.label}
                     extraLabel={data.customCardType}
                     description={type === common_CardTypes.Goal ? blockConfig.description : data.description}
                     onClose={onClose}
                  />
                  <ModalMetrics>
                     <ModalSectionDifficulty
                        value={accumulatedBlockStats ? data.accumulated.difficulty : data.difficulty}/>
                     <ModalSectionCost value={accumulatedBlockStats ? data.accumulated.cost : data.cost}/>
                     <ModalSectionTimeToComplete value={accumulatedBlockStats ? data.accumulated.time : data.time}/>
                  </ModalMetrics>
               </>
            }
            actions={
               <>
                  <UI.ButtonIcon
                     icon={faArrowTurnDownLeft}
                     text="I will be back!"
                     className="--back"
                     onClick={onClose}
                  />
                  <UI.ButtonIcon
                     icon={faCheck}
                     text={isRevealed ? '(already completed)' : 'Mark as completed!'}
                     disabled={isRevealed}
                     className="--complete"
                     onClick={() => dispatcher(setAsyncProcess(AsyncProcesses.Explore, 'triggered', {
                        cardId: id,
                        level: data.level
                     }))}
                  />
               </>
            }><CardLayout layout={data.layout} widgets={data.widgets}/></ModalWrapper>
      )
   } else {
      return <div/>
   }
}

export default ModalCard
