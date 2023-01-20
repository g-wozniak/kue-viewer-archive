import * as React from 'react'
import {ReactNode} from 'react'

type Props = {
   children: ReactNode
}

const CardBody = ({children}: Props) => <div className="--kue-v-b-body">{children}</div>

export default CardBody
