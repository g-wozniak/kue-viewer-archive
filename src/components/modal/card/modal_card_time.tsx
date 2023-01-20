import React, {useMemo} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClockDesk} from '@fortawesome/pro-light-svg-icons/faClockDesk'
import ModalSection from '@c/modal/_modal/_modal_section'
import locale from '@root/locale/en-GB'

type Props = {
   value: number
}

function toHumanTime(minutes: number): string {
   const {time} = locale.properties
   if (minutes === 0) {
      return time.unknown
   }
   if (minutes === 1) {
      return `1 ${time.minute}`
   }
   if (minutes > 120) {
      return `${Math.floor(minutes / 60)} ${time.hours}`
   }
   return `${minutes} ${time.minutes}`
}

const ModalSectionTimeToComplete = ({value}: Props) => {
   const humanTime = useMemo(() => toHumanTime(value), [value])
   return (
      <ModalSection decoratorClassName="section-time">
         <div className="--icon">
            <FontAwesomeIcon icon={faClockDesk}/>
         </div>
         <div className="--record">
            <span className="--label">Time effort</span>
            <span className="--value">{humanTime}</span>
         </div>
      </ModalSection>
   )
}

export default ModalSectionTimeToComplete
