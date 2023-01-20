import * as React from 'react'
import {CardWidget} from '@kue-space/common'
import CardWidgetRenderer from '../widgets/widget'

type Props = {
   slot: number
   widget: CardWidget<any> | undefined
}

const CardLayoutSlot = ({slot, widget}: Props): JSX.Element => {
   return (
      <section className="--kue-v-b-layout-slot">
         {widget && <CardWidgetRenderer widget={widget}/>}
      </section>
   )
}

export default CardLayoutSlot
