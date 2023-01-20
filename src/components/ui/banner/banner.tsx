import * as React from 'react'
import {ReactNode} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {IconDefinition} from '@fortawesome/fontawesome-svg-core'

type Props = {
   children: ReactNode
   icon?: IconDefinition
}

const UIBanner = ({icon, children}: Props) => {
   return (
      <div className="--kue-v-ui-banner">
         {icon && <FontAwesomeIcon icon={icon}/>}
         <span>{children}</span>
      </div>
   )
}

export default UIBanner
