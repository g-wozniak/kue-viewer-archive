import * as React from 'react'
import {Checkbox} from 'semantic-ui-react'

type Props = {
   name: string
   type: 'radio' | 'toggle' | 'checkbox'
   checked: boolean
   label?: string
   disabled?: boolean
   onChange(check?: boolean)
}

const UICheckbox = ({name, label, type, disabled, checked, onChange}: Props): JSX.Element => {
   const id = `viewer-checkbox-${name}`
   const decoratorClassName = checked
      ?  '--checked'
      :  '--not-checked'
   return (
      <div className={`--kue-v-ui-checkbox ${decoratorClassName}`}>
         <Checkbox
            id={id}
            name={name}
            disabled={disabled}
            {...(type === 'toggle' && {toggle: true})}
            {...(type === 'radio' && {radio: true})}
            checked={checked}
            onChange={() => onChange(!checked)}
         />
         {label && <label className="--label" htmlFor={id}>{label}</label>}
      </div>
   )
}

export default UICheckbox
