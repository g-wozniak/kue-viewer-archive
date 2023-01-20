import {StateAsyncProcess} from '@intf/State'
import {icon, toHtml} from '@fortawesome/fontawesome-svg-core'
import moment from 'moment/moment'

/**
 * isAsyncProcessResolved
 * @description checks if asynchronous process state is resolved
 * @param proc
 */
export const isAsyncProcessResolved = (proc: StateAsyncProcess): boolean => proc.lifecycle === 'completed'

/**
 * isAsyncProcessTriggered
 * @description checks if asynchronous process state is triggered
 * @param proc
 */
export const isAsyncProcessTriggered = (proc: StateAsyncProcess): boolean => proc.lifecycle === 'triggered'

/**
 * getThemeClassName
 * @description returns CSS class name that corresponds to the chosen UI theme
 * @param theme
 */
export const getThemeClassName = (theme: string): string => `--v-theme-${theme && theme.toLowerCase()}`

/**
 * daysTillNow
 * @description returns how much time passed from the date provided in the parameter
 * @param dateFrom
 */
export const daysTillNow = (dateFrom: string): string => {
   return moment().from(dateFrom, true)
}

/**
 * getSVGUri
 * @description allows for inline embedding of the SVG font-awesome icon provided in the parameter
 * @note keep it as it's quite challenging to find this implementation, might be useful for future theme variations
 * @param faIcon
 * @param color
 */
export const getSVGUri = (faIcon, color) => {
   const abstract = icon(faIcon).abstract[0] as any
   if (color) {
      abstract.children[0].attributes.fill = color
   }
   return `data:image/svg+xml;base64,${btoa(toHtml(abstract))}`
}

/**
 * alignPosition
 * @description function used to align positions of the cards; approximates the distance to the gap size and returns a new coordinate
 * @param pos
 * @param gap
 */
export const alignPosition = (pos: number, gap: number): number => {
   const quotient = ~~(pos / gap)
   const reminder = pos % gap
   return reminder <= gap / 2
      ? gap * quotient
      : gap * quotient + gap
}