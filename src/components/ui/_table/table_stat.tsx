import * as React from 'react'
import {ReactNode} from 'react'

type Props = {
   label?: string
   children: ReactNode
}

const UITableStat = ({label, children}: Props) => {
   return (
      <tr>
         <td className={`--label ${!label && '--empty'}`}>{label}</td>
         <td className="--stat">{children}</td>
      </tr>
   )
}

export default UITableStat