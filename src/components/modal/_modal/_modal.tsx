import React, {PropsWithChildren, ReactNode} from 'react'
import {Modal, ModalProps} from 'semantic-ui-react'
import {getThemeClassName} from '@helpers/utils'

import UI from '@c/ui/ui'
import DimmerArea from '@c/dimmer/_dimmer/_dimmer'

type Props = PropsWithChildren & {
   theme: string
   decoratorClassName: string
   modal: ModalProps
   header?: ReactNode
   actions?: ReactNode
   dimmer: {
      busy: boolean
      header: string
      subheader: string
   }
}

const ModalWrapper = (props: Props) => {
   return (
      <Modal
         className={['--kue-v-b-modal', props.decoratorClassName, getThemeClassName(props.theme)].join(' ')}
         {...props.modal}
         closeOnDimmerClick={true}
      >
         <DimmerArea
            inverted={false}
            active={props.dimmer.busy}
            content={{
               header: props.dimmer.header,
               subheader: props.dimmer.subheader
            }}>
            <UI.Window>
               {props.header && <div className="--kue-v-b-modal-header">{props.header}</div>}
               <div className="--kue-v-b-modal-body">
                  {props.children}
               </div>
               {props.actions && <div className="--kue-v-b-modal-actions">{props.actions}</div>}
            </UI.Window>
         </DimmerArea>
      </Modal>
   )
}

export default ModalWrapper
