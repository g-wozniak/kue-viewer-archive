import {BFFResolvedResponse, TPayloads} from '@kue-space/common'
import {StateAsyncProcess} from '@intf/State'

/**
 * Requests
 * @description all the external events that are coming to the Viewer from the outside
 */

export type PathwayRequest = (payload: TPayloads.TPathwayToBackendPayload) => Promise<BFFResolvedResponse<TPayloads.TPathwayFromBackendPayload>>
export type PathwayExploreRequest = (payload: TPayloads.TPathwayExploreToBackendPayload) => Promise<BFFResolvedResponse<void>>
export type PathwayResetRequest = (payload: TPayloads.TPathwayResetToBackendPayload) => Promise<BFFResolvedResponse<void>>
export type PathwaySaveNodesRequest = (payload: TPayloads.TPathwaySaveNodesToBackendPayload) => Promise<BFFResolvedResponse<void>>
export type PathwaySyncRequest = (payload: TPayloads.TPathwaySyncToBackendPayload) => Promise<BFFResolvedResponse<TPayloads.TPathwayFromBackendPayload>>
export type PathwaySyncRollbackRequest = (payload: TPayloads.TPathwaySyncRollbackToBackendPayload) => Promise<BFFResolvedResponse<TPayloads.TPathwaySyncRollbackFromBackendPayload>>

export type OnPullPathwayAsyncProcess = StateAsyncProcess<void>
export type OnExplorePathwayAsyncProcess = StateAsyncProcess<{cardId: string, level: number}>
export type OnResetPathwayAsyncProcess = StateAsyncProcess<void>
export type OnSaveNodesPathwayAsyncProcess = StateAsyncProcess<void>
export type OnSyncPathwayAsyncProcess = StateAsyncProcess<void>
export type OnSyncRollbackPathwayAsyncProcess = StateAsyncProcess<{version: number}>

export type Requests = {
   onPullPathway: PathwayRequest
   onExplorePathway: PathwayExploreRequest
   onResetPathway: PathwayResetRequest
   onSaveNodesPathway: PathwaySaveNodesRequest
   onSyncPathway: PathwaySyncRequest
   onSyncRollbackPathway: PathwaySyncRollbackRequest
}

