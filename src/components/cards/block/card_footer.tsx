import * as React from 'react'
import {ReactNode} from 'react'

type Props = {
   children: ReactNode
}

const CardFooter = ({children}: Props) => <div className="--kue-v-b-footer">{children}</div>

export default CardFooter
