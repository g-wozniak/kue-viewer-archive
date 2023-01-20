import * as React from 'react'
import __UIWindow from './_window/window'
import __UIButton from './button/button'
import __UIButtonIcon from './button/button_icon'
import __UIIcon from './icon/icon'
import __UIBanner from './banner/banner'
import __UIMenu from './menu/menu'
import __UITag from './tag/tag'
import __UIMessage from './message/message'
import __UICheckbox from './checkbox/checkbox'
import __UITable from './_table/table'

const UI = () => {
   return <div />
}

UI.Window = __UIWindow
UI.Button = __UIButton
UI.ButtonIcon = __UIButtonIcon
UI.Icon = __UIIcon
UI.Banner = __UIBanner
UI.Menu = __UIMenu
UI.Tag = __UITag
UI.Message = __UIMessage
UI.Checkbox = __UICheckbox
UI.Table = __UITable

export default UI