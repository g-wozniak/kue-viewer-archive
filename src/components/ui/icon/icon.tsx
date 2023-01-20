import * as React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition} from '@fortawesome/fontawesome-svg-core'

type Props = {
   icon: IconDefinition
}

const UIIcon = ({icon}: Props) => {
   return (
      <div className="--kue-v-ui-icon">
         <div className="--kue-v-ui-icon--inner">
            <FontAwesomeIcon icon={icon}/>
         </div>
      </div>
   )
}

export default UIIcon
