import React, {PropsWithChildren} from 'react'

type Props = PropsWithChildren

const ModalMetrics = ({children}: Props) => {
   return <div className="--kue-v-b-modal-metrics">{children}</div>
}

export default ModalMetrics
