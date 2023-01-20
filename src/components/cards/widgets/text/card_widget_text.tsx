import * as React from 'react'
import {CardWidgetTextProps, CardWidget} from '@kue-space/common'

type Props = {
   widget: CardWidget<CardWidgetTextProps>
}

const CardWidgetText = ({widget}: Props): JSX.Element => {

   return (
      <main className="--card-widget --widget-text">
         <h3 className="--caption">{widget.props.caption}</h3>
         <p className="--text">{widget.props.text}</p>
      </main>
   )
}

export default CardWidgetText
