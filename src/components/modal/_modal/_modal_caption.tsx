import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition} from '@fortawesome/fontawesome-svg-core'
import {faXmark} from '@fortawesome/pro-light-svg-icons/faXmark'
import {Button} from 'semantic-ui-react'
import CardIcon from '@c/cards/block/card_icon'

type Props = {
   icon?: IconDefinition
   image?: string
   label: string
   extraLabel?: string
   description?: string
   onClose()
}

type PropsWithIcon = Props & {
   icon: IconDefinition
   image?: never
}

type PropsWithImage = Props & {
   image: string
   icon?: never
}

const ModalCaption = ({icon, image, label, extraLabel, description, onClose}: PropsWithIcon | PropsWithImage) => {
   return (
      <section className="--kue-v-b-modal-caption">
         <div className="--icon">
            {icon && <FontAwesomeIcon icon={icon}/>}
            {image && <CardIcon icon={image} height={28} alt={label}/>}
         </div>
         <div className="--caption">
            <span className="--label">{label}</span>
            {extraLabel && <span className="--extra">({extraLabel})</span>}
            {description && <span className="--headline">{description}</span>}
         </div>
         <div className="--close">
            <Button onClick={onClose}><FontAwesomeIcon icon={faXmark}/></Button>
         </div>
      </section>
   )
}

export default ModalCaption
