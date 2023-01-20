import {common_CardTypes, KeyAny, TModels, TPayloads} from '@kue-space/common'
import {Node} from 'react-flow-renderer'
import {AsyncProcesses} from '@root/properties'
import {
   Action, AsyncProcessLifecycle,
   StateAsyncProcess, StateMigrations, StateModal,
   StatePathway
} from '@intf/State'
import {ViewerBlockDataProps} from '@intf/Blocks'

export enum Actions {
   deleteMigration = 'deleteMigration',
   updateMigration = 'updateMigration',
   revealCard = 'revealCard',
   resetPathwayProgress = 'resetPathwayProgress',
   syncPathway = 'syncPathway',
   setAsyncProcess = 'setAsyncProcess',
   setBlockPositionChange = 'setBlockPositionChange',
   setPathway = 'setPathway',
   setModal = 'setModal',
   setMigrations = 'setMigrations',
   setVisibilityForProgress = 'setVisibilityForProgress',
   selectBlock = 'selectBlock',
   deselectBlock = 'deselectBlock'
}

export type SelectBlockActionPayload = {
   id: string
   type: common_CardTypes
   data: ViewerBlockDataProps
}

export type RevealCardActionPayload = {
   cardId: string
   level: number
}

/**
 * setPathway
 * @description set pathway dataset from the API
 * @param pathway
 */
export const setPathway = (pathway: StatePathway): Action<StatePathway> => {
   return {
      type: Actions.setPathway,
      payload: pathway
   }
}

/**
 * setModal
 * @description set modal configuration / state
 * @param modal
 */
export const setModal = (modal: StateModal): Action<StateModal> => {
   return {
      type: Actions.setModal,
      payload: modal
   }
}

/**
 * selectBlock
 * @description set a new selected block
 * @param id
 * @param type
 * @param data
 */
export const selectBlock = (id: string, type: common_CardTypes, data: ViewerBlockDataProps): Action<SelectBlockActionPayload> => {
   return {
      type: Actions.selectBlock,
      payload: {id, type, data}
   }
}

/**
 * deselectBlock
 * @description deselect block that is currently selected
 */
export const deselectBlock = (): Action<void> => {
   return {
      type: Actions.deselectBlock
   }
}

/**
 * revealCard
 * @description mark a card as revealed in the viewer
 * @param payload
 */
export const revealCard = (payload: RevealCardActionPayload): Action<RevealCardActionPayload> => {
   return {
      type: Actions.revealCard,
      payload
   }
}

/**
 * syncPathway
 * @description apply new pathway dataset which was just synchronised
 * @param data
 */
export const syncPathway = (data: TPayloads.TPathwaySyncFromBackendPayload): Action<TPayloads.TPathwaySyncFromBackendPayload> => {
   return {
      type: Actions.syncPathway,
      payload: data
   }
}

/**
 * resetPathwayProgress
 * @description reset the current pathway exploration in the viewer
 */
export const resetPathwayProgress = (): Action<void> => {
   return {
      type: Actions.resetPathwayProgress
   }
}

/**
 * setBlockPositionChange
 * @description lets viewer know that user changed some block position
 * @param sw
 */
export const setBlockPositionChange = (sw: boolean): Action<boolean> => {
   return {
      type: Actions.setBlockPositionChange,
      payload: sw
   }
}

/**
 * setVisibilityForProgress
 * @description when user explores a card it changes visibility level, making their children available to be explored
 * @param nodes
 */
export const setVisibilityForProgress = (nodes: Node[]): Action<Node[]> => {
   return {
      type: Actions.setVisibilityForProgress,
      payload: nodes
   }
}

/**
 * setMigrations
 * @description set a list of pathway migration versions for the potential user rollback
 * @param migrations
 */
export const setMigrations = (migrations: StateMigrations): Action<StateMigrations> => {
   return {
      type: Actions.setMigrations,
      payload: migrations
   }
}

/**
 * setAsyncProcess
 * @description sets async process and their details
 * @param processId
 * @param lifecycle
 * @param payload
 */
export const setAsyncProcess = (processId: AsyncProcesses, lifecycle: AsyncProcessLifecycle, payload: KeyAny = {}): Action<StateAsyncProcess> => {
   return {
      type: Actions.setAsyncProcess,
      payload: {
         id: processId,
         lifecycle,
         payload
      }
   }
}

/**
 * updateMigration
 * @description updates a single migration item
 * @param migration
 */
export const updateMigration = (migration: TModels.PathwayMigrationListItem): Action<TModels.PathwayMigrationListItem> => {
   return {
      type: Actions.updateMigration,
      payload: migration
   }
}

/**
 * deleteMigration
 * @description deletes a single migration item (pathway version) from the list
 * @param version
 */
export const deleteMigration = (version: number): Action<number> => {
   return {
      type: Actions.deleteMigration,
      payload: version
   }
}
