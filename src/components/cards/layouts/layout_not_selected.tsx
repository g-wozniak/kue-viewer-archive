import * as React from 'react'
import CardLayoutWrapper from './_layout/layout'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFaceDowncastSweat} from '@fortawesome/pro-light-svg-icons/faFaceDowncastSweat'

const CardLayoutNotSelected = (): JSX.Element => {
   return (
      <CardLayoutWrapper decorator="--not-selected">
         <div className="--icon">
            <FontAwesomeIcon icon={faFaceDowncastSweat}/>
         </div>
         <div className="--message">
            <span className="--header">Layout is not selected</span>
            <span className="--text">Your mentor did not select a layout for this card yet. It can be a little glitch too, so it would be great if you could contact your mentor and let him know about this issue.</span>
         </div>
      </CardLayoutWrapper>
   )
}

export default CardLayoutNotSelected
