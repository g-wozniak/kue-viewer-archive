import {common_CardTypes, TModels} from '@kue-space/common'
import {AsyncProcesses, Modals, UIZones} from '@root/properties'
import {ViewerBlockDataProps} from '@intf/Blocks'

// Async processes available state/lifecycle
export type AsyncProcessLifecycle = 'idle' | 'triggered' | 'completed' | 'failed'

// Selected block type
export type SelectedBlock = string | null

// Action dispatcher to state
export type Dispatcher = (action: Action<any>) => void

// Action definition
export interface Action<Payload> {
   type: string // Actions enum
   payload?: Payload
}

// Root state context
export interface RootState {
   pathway: StatePathway // details about the pathway provided by the API
   modals: StateModals // modal windows available/existing in the viewer
   blocks: StateBlocksFragment // information centre about the blocks drawn on the flow
   migrations: StateMigrations // list of migrations which let user revert the pathway to the previous versions
   processes: StateAsyncProcess[] // context of async processes triggered in the viewer
   selectedBlock: StateSelectedBlock // selected block details
}

export type StateSelectedBlock = {
   id: SelectedBlock // selected block id
   type: common_CardTypes | null // selected block card type
   data: ViewerBlockDataProps | Record<string, any> // selected block properties
}

export type StateBlocksFragment = {
   changedPosition: boolean // signalises to viewer if any of the block positions has changed so it can be saved
   visibility: number // global block visibility in the viewer, corresponds to `levels` in blocks
   revealed: string[] // list of block id's which are revealed in the viewer plan
}

// Raw from the API
export type StateMigrations = TModels.PathwayMigrationListItem[]

// Raw from the API
export type StatePathway = TModels.PathwayViewerItem

export type StateAsyncProcess<Payload = any> = {
   id: AsyncProcesses // async process ID
   lifecycle: AsyncProcessLifecycle // async process lifecycle
   payload: Payload // async process payload
   uiZones?: UIZones[] // UI zone, which will be shown as busy if the process state changes
}

export type StateModals = StateModal[]

export type StateModal = {
   id: Modals // modal ID
   uiZone: UIZones // UI zone that corresponds to the modal
   open: boolean // state of the modal (open or not)
}