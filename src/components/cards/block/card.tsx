import React from 'react'
import {isModalOpen} from '@state/selectors'
import {Modals} from '@root/properties'
import UI from '@c/ui/ui'

import CardHeader from './card_header'
import CardBody from './card_body'
import CardFooter from './card_footer'
import CardIcon from './card_icon'

import {ViewerBlockProps} from '@intf/Blocks'


const Card = ({id, type, data, icon, explored}: ViewerBlockProps) => {
   return (
      <>
         <CardHeader>
            <span className="--icon-card">
               <CardIcon icon={icon} height={32} alt={data.label}/>
            </span>
            <span className="--label">{data.label}</span>
            <span className="--icon-status"></span>
         </CardHeader>
         <CardBody>
            <span className="--description">{data.description}</span>
         </CardBody>
         <CardFooter>
            <UI.Button
               content={explored ? 'Open' : 'Explore'}
               onClick={() => data.events.onOpenButtonClick(id, type, data)}
               active={isModalOpen(data.state, Modals.CardDetails)}
            />
         </CardFooter>
      </>
   )
}

export default Card
