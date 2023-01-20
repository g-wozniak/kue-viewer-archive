import {AsyncProcesses, Modals, UIZones} from '@root/properties'

import {RootState, StateAsyncProcess, StateSelectedBlock} from '@intf/State'

export const isBlockRevealed = (state: RootState, id: string): boolean => state.blocks.revealed.indexOf(id) !== -1

export const getSelectedBlock = (state: RootState): StateSelectedBlock => state.selectedBlock

export const hasBlockPositionChanged = (state: RootState): boolean => state.blocks.changedPosition

export const canRollbackPathway = (state: RootState): boolean => state.migrations.length > 0

export const getVersionDiscrepancy = (state: RootState): number => state.pathway.template.version - state.pathway.version

export const getAsyncProcess = (state: RootState, processId: AsyncProcesses): StateAsyncProcess => state.processes.find(p => p.id === processId)!

export const isModalOpen = (state: RootState, modal: Modals): boolean => !!state.modals.find(m => m.id === modal && m.open)

export const isUIZoneBusy = (state: RootState, uiZone: UIZones): boolean => !!state.processes.find(p => p.uiZones?.includes(uiZone) && p.lifecycle === 'triggered')