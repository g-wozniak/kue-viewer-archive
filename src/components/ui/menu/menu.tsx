import * as React from 'react'
import {ReactNode} from 'react'

type Props = {
   items: ReactNode[]
}

const UIMenu = ({items}: Props) => {
   if (items && items.length > 0) {
      return (
         <ol className="--kue-v-ui-menu">
            {items.map((item) => (item))}
         </ol>
      )
   }
   return null
}

export default UIMenu
