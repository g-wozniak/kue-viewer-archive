import * as React from 'react'
import {Tab} from 'semantic-ui-react'
import {SemanticPane} from '@kue-space/common'

type Props = {
   tabs: SemanticPane[]
}

const ModalTabsWrapper = ({tabs}: Props): JSX.Element => {
   return (
      <Tab className="--kue-v-b-modal-tabs" panes={tabs}/>
   )
}

export default ModalTabsWrapper
