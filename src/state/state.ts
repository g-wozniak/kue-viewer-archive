import React, {useState} from 'react'
import cloneDeep from 'lodash/cloneDeep'
import orderBy from 'lodash/orderBy'
import {common_PathwayThemes, common_UserAccountStatus, PathwayViewerModel, TModels, TPayloads} from '@kue-space/common'
import {Node} from 'react-flow-renderer'
import {Actions, RevealCardActionPayload, SelectBlockActionPayload} from './actions'
import {AsyncProcesses, UIZones} from '@root/properties'
import {Action, RootState, StateAsyncProcess, StateMigrations, StateModal, StatePathway} from '@intf/State'
import {ViewerBlockDataProps} from '@intf/Blocks'

export const initialState: RootState = {
   pathway: new PathwayViewerModel({
      _id: '',
      learner: {
         _id: ''
      },
      mentor: {
         _id: '',
         nickname: '',
         status: common_UserAccountStatus.Active
      },
      template: {
        _id: '',
        name: '',
        slug: '',
        version: 0,
        created: ''
      },
      customName: '',
      theme: common_PathwayThemes.Vanilla,
      version: 1,
      notes: [],
      progress: [],
      nodes: [],
      edges: [],
      modified: '',
      created: ''
   }).toJSON(),
   modals: [],
   blocks: {
      changedPosition: false,
      visibility: 0,
      revealed: []
   },
   migrations: [],
   selectedBlock: {
      id: null,
      type: null,
      data: {}
   },
   processes: [
      {
        id: AsyncProcesses.Pull,
        lifecycle: 'idle',
        payload: {},
        uiZones: [UIZones.App]
      },
      {
         id: AsyncProcesses.Explore,
         lifecycle: 'idle',
         payload: {},
         uiZones: [UIZones.ModalCardDetails]
      },
      {
         id: AsyncProcesses.Reset,
         lifecycle: 'idle',
         payload: {},
         uiZones: [UIZones.ModalPath]
      },
      {
         id: AsyncProcesses.SaveNodes,
         lifecycle: 'idle',
         payload: {},
         uiZones: [UIZones.ButtonSaveNodes]
      },
      {
         id: AsyncProcesses.Sync,
         lifecycle: 'idle',
         payload: {},
         uiZones: [
            UIZones.ModalPath,
            UIZones.ButtonModalPathUpdate
         ]
      },
      {
         id: AsyncProcesses.SyncRollback,
         lifecycle: 'idle',
         payload: {},
         uiZones: [UIZones.ModalPath]
      }
   ]
}

export const useViewerState = () => useState(initialState)

export const dispatch = (setter: React.Dispatch<React.SetStateAction<RootState>>, action: Action<any>): void => {
   console.log(action)
   setter(prevState => {
      const state = cloneDeep(prevState)

      switch (action.type) {

         case Actions.setPathway: {
            state.pathway = action.payload as StatePathway
            state.blocks.revealed = [...state.pathway.progress]
            return state
         }
         case Actions.setModal: {
            const payload = action.payload as StateModal
            state.modals = state.modals.filter(w => w.id !== payload.id)
            state.modals.push({...payload})
            return state
         }
         case Actions.setMigrations: {
            state.migrations = action.payload as StateMigrations
            return state
         }
         case Actions.selectBlock: {
            const {id, type, data} = action.payload as SelectBlockActionPayload
            state.selectedBlock = {id, type, data}
            return state
         }
         case Actions.deselectBlock: {
            state.selectedBlock = {id: null, type: null, data: {}}
            return state
         }
         case Actions.resetPathwayProgress: {
            state.pathway.progress = []
            state.blocks.revealed = []
            state.blocks.visibility = 0
            return state
         }
         case Actions.revealCard: {
            const {cardId, level} = action.payload as RevealCardActionPayload
            if (state.blocks.revealed.indexOf(cardId) === -1) {
               if (state.blocks.visibility < level) {
                  state.blocks.visibility++
               }
               state.blocks.revealed.push(cardId)
               state.pathway.progress = [...state.blocks.revealed]
            }
            return state
         }
         case Actions.syncPathway: {
            const {version, nodes, edges} = action.payload as TPayloads.TPathwaySyncFromBackendPayload
            state.pathway.nodes = nodes
            state.pathway.edges = edges
            state.pathway.version = version
            return state
         }
         case Actions.setVisibilityForProgress: {
            const nodes = action.payload as Node<ViewerBlockDataProps>[]
            const node = orderBy(nodes, 'data.level', 'desc')[0]
            state.blocks.visibility = node.data.level
            return state
         }
         case Actions.setBlockPositionChange: {
            state.blocks.changedPosition = action.payload as boolean
            return state
         }
         case Actions.setAsyncProcess: {
            const {id, payload, lifecycle} = action.payload as StateAsyncProcess
            const index = state.processes.findIndex(p => p.id === id)
            if (index === -1) {
               throw new Error('Every async process must be initialised in the state')
            }
            state.processes[index].lifecycle = lifecycle
            state.processes[index].payload = payload
            return state
         }
         case Actions.updateMigration: {
            const migration = action.payload as TModels.PathwayMigrationListItem
            if (!state.migrations.find(m => m.version === migration.version)) {
               state.migrations.push(migration)
            }
            return state
         }
         case Actions.deleteMigration: {
            const version = action.payload as number
            const index = state.migrations.findIndex(m => m.version === version)
            if (index !== -1) {
               state.migrations.splice(index, 1)
            }
            return state
         }
         default:
            return state
      }
   })
}

export default dispatch