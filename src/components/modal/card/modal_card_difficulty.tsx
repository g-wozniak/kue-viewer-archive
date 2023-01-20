import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowUpRightDots} from '@fortawesome/pro-light-svg-icons/faArrowUpRightDots'
import ModalSection from '@c/modal/_modal/_modal_section'
import locale from '@root/locale/en-GB'

type Props = {
   value: string
}

const ModalSectionDifficulty = ({value}: Props) => {
   return (
      <ModalSection decoratorClassName="section-difficulty">
         <div className="--icon">
            <FontAwesomeIcon icon={faArrowUpRightDots}/>
         </div>
         <div className="--record">
            <span className="--label">Difficulty</span>
            <span className="--value">{locale.properties.difficulties[value]}</span>
         </div>
      </ModalSection>
   )
}

export default ModalSectionDifficulty
