import * as React from 'react'
import {ReactNode} from 'react'

type Props = {
   genre: 'warning' | 'ok'
   children: ReactNode
}

const UITag = ({children, genre}: Props) => {
   return (
      <span className={`--kue-v-ui-tag --${genre}`}>
         {children}
      </span>
   )
}

export default UITag
