import * as React from 'react'
import {Message} from 'semantic-ui-react'
import {ReactNode} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleExclamation} from '@fortawesome/pro-light-svg-icons/faCircleExclamation'
import {faBolt} from '@fortawesome/pro-light-svg-icons/faBolt'
import {faInfo} from '@fortawesome/pro-light-svg-icons/faInfo'


type Props = {
   header: string
   type: 'warning' | 'danger' | 'info'
   text?: ReactNode
   list?: ReactNode[]
}

const UIMessage = ({header, type, text, list}: Props): JSX.Element => {
   return (
      <Message
         className="--kue-v-ui-message"
         {...(type === 'warning' && {warning: true})}
         {...(type === 'danger' && {negative: true})}
      >
         <Message.Header className="--header">
            <FontAwesomeIcon icon={type === 'warning' ? faCircleExclamation : type === 'info' ? faInfo : faBolt}/>{header}
         </Message.Header>
         <Message.Content className="--content">
            {text && <div className="--text">{text}</div>}
            {list && <Message.List className="--list">{list.map((item, index) => <Message.Item className="--list-item" key={`message_list_${index}`}>{item}</Message.Item>)}</Message.List>}
         </Message.Content>
      </Message>
   )
}

export default UIMessage
