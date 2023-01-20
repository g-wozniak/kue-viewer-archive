import React from 'react'
import {faPuzzle} from '@fortawesome/pro-light-svg-icons/faPuzzle'

import UI from '@c/ui/ui'

type Props = {
   allBlocks: number
   revealedBlocks: number
}

const TrackbarBannerRemaining = ({allBlocks, revealedBlocks}: Props) => {
   return (
      <UI.Banner icon={faPuzzle}>
         {
            revealedBlocks > 0
               ? <><span className="--strong">{revealedBlocks}</span> cards explored of <span className="--strong">{allBlocks}</span></>
               : <><span className="--strong">{allBlocks}</span> cards left to explore</>
         }
      </UI.Banner>
   )
}

export default TrackbarBannerRemaining