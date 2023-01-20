import * as React from 'react'
import {ReactNode} from 'react'

type Props = {
   children: ReactNode
}

const CardHeader = ({children}: Props) => <div className="--kue-v-b-header">{children}</div>

export default CardHeader
