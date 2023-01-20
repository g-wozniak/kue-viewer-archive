import * as React from 'react'
import {CardWidgetTextProps, CardWidget, common_CardWidgets} from '@kue-space/common'

import CardWidgetText from '@c/cards/widgets/text/card_widget_text'

type Props = {
   widget: CardWidget<CardWidgetTextProps>
}

const CardWidgetRenderer = ({widget}: Props): JSX.Element => {
   switch (widget.widget) {
      case common_CardWidgets.Text:
         return <CardWidgetText widget={widget}/>
      default:
         return <div />
   }
}

export default CardWidgetRenderer
