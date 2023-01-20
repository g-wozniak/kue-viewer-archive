import merge from 'lodash/assign'
import {Locale, locale} from '@kue-space/common'

// Translation file where you can provide local locale context which will be merged with what is supplied by the common package
const translation: Locale = merge({

}, locale())

export default translation
