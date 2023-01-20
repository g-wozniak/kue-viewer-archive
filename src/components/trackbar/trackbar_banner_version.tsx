import React, {useMemo} from 'react'
import {TModels, Utils} from '@kue-space/common'
import {faCodeMerge} from '@fortawesome/pro-light-svg-icons/faCodeMerge'
import {faCheck} from '@fortawesome/pro-light-svg-icons/faCheck'

import UI from '@c/ui/ui'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

type Props = {
   pathway: TModels.PathwayViewerItem
   discrepancy: number
}

const TrackbarBannerVersion = ({pathway, discrepancy}: Props) => {
   const delta = useMemo(() => {
      return discrepancy === 0 || pathway.template.version === 0
         ? <UI.Tag genre="ok"><FontAwesomeIcon icon={faCheck}/></UI.Tag>
         : <UI.Tag genre="warning">{discrepancy} behind</UI.Tag>
   }, [discrepancy])

   return (
      <UI.Banner icon={faCodeMerge}>
         <span className="--strong">{Utils.versionIndicator(pathway.version)}</span>
         {delta}
      </UI.Banner>
   )
}

export default TrackbarBannerVersion