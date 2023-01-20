import * as React from 'react'
import {Tab} from 'semantic-ui-react'

type Props = {
   children: React.ReactNode
}

const ModalTab = ({children}: Props): JSX.Element => {
   return (
      <Tab.Pane className="--kue-v-b-modal-tabs-tab">
         {children}
      </Tab.Pane>
   )
}

export default ModalTab
