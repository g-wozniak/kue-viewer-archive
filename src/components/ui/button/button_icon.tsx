import * as React from 'react'
import {Button} from 'semantic-ui-react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition} from '@fortawesome/fontawesome-svg-core'
import {faSpinner} from '@fortawesome/pro-light-svg-icons/faSpinner'

type Props = {
   icon: IconDefinition
   id?: string
   text?: string
   className?: string
   disabled?: boolean
   loading?: boolean
   onClick(): any
}

const UIButtonIcon = (props: Props) => {
   return (
      <Button
         id={props.id}
         name={props.id}
         disabled={props.disabled || false}
         className={`--kue-v-ui-button-icon ${props.className || ''}`}
         onClick={props.onClick}
      >
         <span className="--icon">
            <FontAwesomeIcon icon={props.loading ? faSpinner : props.icon}/>
         </span>
         {props.text && <span className="--text">{props.text}</span>}
      </Button>
   )
}

export default UIButtonIcon
