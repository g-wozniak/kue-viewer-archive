import * as React from 'react'
import CardIcon from '@c/cards/block/card_icon'

type Props = {
   icon: string
}

const CardBlockObscured = ({icon}: Props) => {

   return (
         <div className="--card-icon">
            <CardIcon icon={icon} height={72} alt="obscured card"/>
         </div>
   )
}

export default CardBlockObscured
