import * as React from 'react'
import {ReactNode} from 'react'

type Props = {
   decorator: string
   children: ReactNode
}

const CardLayoutWrapper = ({decorator, children}: Props) => (
   <div className={`--kue-v-b-layout ${decorator}`}>{children}</div>
)

export default CardLayoutWrapper
