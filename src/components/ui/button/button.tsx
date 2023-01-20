import * as React from 'react'
import {Button, ButtonProps} from 'semantic-ui-react'

type Props = Partial<ButtonProps>

const UIButton = (props: Props) => {
   return (
      <div className="--kue-v-ui-button">
         <div className="--left-corner"></div>
         <div className="--right-corner"></div>
         <Button className="--button" {...props} />
      </div>
   )
}

export default UIButton
