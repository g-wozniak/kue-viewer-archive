import React, {PropsWithChildren} from 'react'

type Props = PropsWithChildren & {
   decoratorClassName: string
}

const ModalSection = ({decoratorClassName, children}: Props) => {
   return <section className={`--kue-v-b-modal-section --${decoratorClassName}`}>{children}</section>
}

export default ModalSection
