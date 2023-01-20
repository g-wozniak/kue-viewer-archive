import React, {useMemo} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBadgeDollar} from '@fortawesome/pro-light-svg-icons/faBadgeDollar'
import ModalSection from '@c/modal/_modal/_modal_section'
import locale from '@root/locale/en-GB'
import floor from 'lodash/floor'

type Props = {
   value: number
}

function toHumanCost(amount: number): string {
   const {cost} = locale.properties
   if (amount === 0) {
      return cost.free
   }
   return `${floor(amount, 2)}$`
}

const ModalSectionCost = ({value}: Props) => {
   const humanCost = useMemo(() => toHumanCost(value), [value])
   return (
      <ModalSection decoratorClassName="section-cost">
         <div className="--icon">
            <FontAwesomeIcon icon={faBadgeDollar}/>
         </div>
         <div className="--record">
            <span className="--label">Cost</span>
            <span className="--value">{humanCost}</span>
         </div>
      </ModalSection>
   )
}

export default ModalSectionCost
