import * as React from 'react'
import {ReactNode} from 'react'
import {KeyAny} from '@kue-space/common'

type Props = {
   children: ReactNode
   style?: KeyAny
   classNames?: string[]
}

const UIWindow = ({style, children, classNames}: Props) => {
   const extraProps: KeyAny = {}

   if (style) {
      extraProps.style = style
   }

   return (
      <section {...extraProps} className={`--kue-v-ui-window ${classNames && classNames.length > 0 ? classNames.join(' ') : ''}`}>
         {children}
      </section>
   )
}

export default UIWindow
