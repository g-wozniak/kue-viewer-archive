import {CardConfig, common_CardTypes, Configs} from '@kue-space/common'
import {NodeProps} from 'react-flow-renderer'
import {ReactElement} from 'react'

import CardBlock from '@c/cards/block/_block'
import Card from '@c/cards/block/card'


type ViewerCardConfig = CardConfig & {
   component: (props: any) => ReactElement
}

type Config = {
   card: {
      width: number
      height: number
   }
   blocks: {
      [blockType: string]: ViewerCardConfig
   }
}

const config: Config = {
   card: {
      width: 380,
      height: 250
   },

   blocks: {
      [common_CardTypes.Goal]: {
         ...Configs.cards[common_CardTypes.Goal],
         component: (props: NodeProps) => CardBlock({...props, block: Card})
      },
      [common_CardTypes.Category]: {
         ...Configs.cards[common_CardTypes.Category],
         component: (props: NodeProps) => CardBlock({...props, block: Card})
      },
      [common_CardTypes.Skill]: {
         ...Configs.cards[common_CardTypes.Skill],
         component: (props: NodeProps) => CardBlock({...props, block: Card})
      },
      [common_CardTypes.Task]: {
         ...Configs.cards[common_CardTypes.Task],
         component: (props: NodeProps) => CardBlock({...props, block: Card})
      }
   }
}

export default config
