import React from 'react'
import {faBullseye} from '@fortawesome/pro-light-svg-icons/faBullseye'

import UI from '@c/ui/ui'

type Props = {
   allBlocks: number
   revealedBlocks: number
}

const TrackbarBannerProgress = ({allBlocks, revealedBlocks}: Props) => {
   const percentage = Math.floor(revealedBlocks * 100 / allBlocks)
   return (
      <UI.Banner icon={faBullseye}>
         <span className="--strong">{percentage}%</span> completed
      </UI.Banner>
   )
}

export default TrackbarBannerProgress