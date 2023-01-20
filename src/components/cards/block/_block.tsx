import React, {useMemo} from 'react'
import {common_CardTypes} from '@kue-space/common'
import {Handle, NodeProps, Position} from 'react-flow-renderer'

import CardObscured from './card_obscured'
import config from '@root/config'

import {ViewerBlockProps, ViewerBlockDataProps} from '@intf/Blocks'
import {getSelectedBlock} from '@state/selectors'



type Props = NodeProps<ViewerBlockDataProps> & {
   block: (props: ViewerBlockProps) => JSX.Element
}

const CardBlock = (props: Props) => {
   const {type, xPos, yPos, data, id, block} = props
   const {icon, slug} = useMemo(() => config.blocks[type], [type])
   const revealed = data.parents.length === 0 || (data.parents.length > 0 && data.state.blocks.revealed.includes(data.parents[0]))
   const explored = data.state.blocks.revealed.includes(id)
   const selected = getSelectedBlock(data.state).id === id

   const blockClassNames = ['--kue-v-b']
   const decoratorClassNames = ['--kue-v-b-wrapper', `--kue-v-b--${slug}`]
   if (selected) {
      decoratorClassNames.push('--selected')
   }
   if (revealed) {
      decoratorClassNames.push('--revealed')
   }
   decoratorClassNames.push(explored ? '--explored' : '--not-explored')
   if (!revealed) {
      decoratorClassNames.push('--obscured')
   }

   return (
      <>
         {type !== common_CardTypes.Goal && <Handle type="target" position={Position.Left}/>}
         {data.children.length > 0 && <Handle type="source" position={Position.Right}/>}
         <div className={decoratorClassNames.join(' ')}>
            <main className={blockClassNames.join(' ')} id={`viewer-block--${id}`}>
               {
                  revealed
                     ? block({
                        ...props,
                        icon,
                        revealed,
                        explored
                     })
                     : <CardObscured icon={icon} />
               }
            </main>
         </div>
      </>
   )
}

export default CardBlock

//                <span>{xPos} {yPos} {data.level}</span>