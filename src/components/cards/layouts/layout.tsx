import * as React from 'react'
import {CardWidgets, common_CardLayouts} from '@kue-space/common'
import CardLayoutWrapper from '@c/cards/layouts/_layout/layout'
import CardLayoutSlot from '@c/cards/layouts/layout_slot'
import CardLayoutNotSelected from '@c/cards/layouts/layout_not_selected'

type Props = {
   layout: common_CardLayouts | undefined
   widgets: CardWidgets | undefined
}

const CardLayout = ({layout, widgets}: Props): JSX.Element => {

   if (widgets && layout) {

      const slots: JSX.Element[] = []

      for (let slot = 1; slot <= 3; slot++) {
         slots.push(<CardLayoutSlot
            key={`widget_render_slot_${slot}`}
            widget={widgets.find(w => w.slot === slot)}
            slot={slot}
         />)
      }

      switch (layout) {
         case common_CardLayouts.Single:
         case common_CardLayouts.TwoColumns:
         case common_CardLayouts.TwoEqualColumns:
         case common_CardLayouts.TwoRows:
            return (
               <CardLayoutWrapper decorator="--layout-single">
                  <div>
                     {slots[0]}
                     {slots[1]}
                     {slots[2]}
                  </div>
               </CardLayoutWrapper>
            )
         case common_CardLayouts.None:
         default:
            return <CardLayoutNotSelected/>
      }
   } else {
      return <div/>
   }
}

export default CardLayout
