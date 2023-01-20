import {ViewerBlockDataProps} from '@intf/Blocks'

/**
 * BlockEvents
 * @description type defining all events that can be executed in a card preview
 */
export type BlockEvents = {
   onOpenButtonClick(id: string, type: string, data: ViewerBlockDataProps)
}

/**
 * TrackbarEvents
 * @description defines all the events that can be executed in the trackbar (top element)
 */
export type TrackbarEvents = {
   onAlignButtonClick()
   onSaveNodesButtonClick()
   onPathwaySyncButtonClick()
   onPathwaySyncRollbackButtonClick(version: number)
   onPathwayResetProgressButtonClick()
   onMentorButtonClick()
   onPathButtonClick()
   onCloseButtonClick()
   onModalPathClose()
   onModalMentorClose()
}