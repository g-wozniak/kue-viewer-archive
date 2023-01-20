import {BlockDataProps} from '@kue-space/common'
import {NodeProps} from 'react-flow-renderer'

import {RootState} from '@intf/State'
import {BlockEvents} from '@intf/Events'


/**
 * ViewerBlockDataProps
 * @description common props for every block located in each {node.data}
 */
export interface ViewerBlockDataProps extends BlockDataProps {
   level: number
   parents: string[]
   children: string[]
   dependants: string[]
   accumulated: {
      cost: number
      time: number
      difficulty: number
   }
   events: BlockEvents
   state: RootState
}

/**
 * Those props are coming directly from the parent block
 */
export interface ViewerBlockProps extends NodeProps<ViewerBlockDataProps> {
   icon: string
   revealed: boolean
   explored: boolean
}