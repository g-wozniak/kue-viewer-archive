import React from 'react'
import {ReactNode} from 'react'
import __UITableStat from './table_stat'

type Props = {
   name: string
   type: 'classic' | 'stats'
   thead?: string[]
   children: ReactNode
}

const UITable = ({name, type, thead, children}: Props) => {
   const decoratorClass = `--table-${type}`
   return (
      <table className={`--kue-v-ui-table ${decoratorClass}`} id={`viewer-table-${name}`}>
         {
            thead && (
               <thead>
                  <tr>
                     {thead.map((s, i) => <td key={`thead_${name}_${i}`}>{s}</td>)}
                  </tr>
               </thead>
            )
         }
         <tbody>
            {children}
         </tbody>
      </table>
   )
}

UITable.Stat = __UITableStat

export default UITable
