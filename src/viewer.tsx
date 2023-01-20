import React, {MouseEvent, useCallback, useEffect, useMemo} from 'react'
import ReactFlow, {
   ConnectionMode,
   Controls,
   MiniMap,
   Node,
   ReactFlowProvider,
   useEdgesState,
   useNodesState,
   useReactFlow
} from 'react-flow-renderer'
import {AsyncProcesses, UIZones} from '@root/properties'
import {getThemeClassName} from '@helpers/utils'
import {hasBlockPositionChanged, isUIZoneBusy} from '@state/selectors'
import {dispatch, useViewerState} from '@state/state'
import {selectBlock, setAsyncProcess, setBlockPositionChange} from '@state/actions'
import {toggleModalCardDetails, toggleModalMentor, toggleModalPath} from '@state/ui'
import {getNodeTypes, updateNodeDataIterator, updateNodePositionIterator} from '@helpers/convert'

import onPullPathwayHook from '@state/hooks/on_pull'
import onAppMount from '@state/hooks/on_app_mount'
import onExplorePathwayHook from '@state/hooks/on_explore'
import onResetPathwayHook from '@state/hooks/on_reset'
import onSaveNodesPathwayHook from '@state/hooks/on_save_nodes'
import onSyncPathwayHook from '@state/hooks/on_sync'
import onSyncRollbackPathwayHook from '@state/hooks/on_sync_rollback'

import DimmerArea from '@c/dimmer/_dimmer/_dimmer'
import ModalCard from '@c/modal/card/modal_card'
import Trackbar from '@c/trackbar/trackbar'

import {Requests} from '@intf/Requests'
import {Action} from '@intf/State'
import {BlockEvents, TrackbarEvents} from '@intf/Events'

interface Props {
   pathwayId: string
   returnUrl: string
   bffRequests: Requests
}

const Flow = ({pathwayId, returnUrl, bffRequests}: Props): JSX.Element => {

   const {project, setViewport} = useReactFlow()
   // const {x, y, zoom} = useViewport()
   const [state, setState] = useViewerState()

   const dispatcher = useCallback((action: Action<any>) => {
      dispatch(setState, action)
   }, [setState, dispatch])

   const nodeTypes = useMemo(getNodeTypes, [])

   const [nodes, setNodes, onNodesChange] = useNodesState([])
   const [edges, setEdges, onEdgesChange] = useEdgesState([])

   const pathway = state.pathway

   /**
    * Events for react flow viewer pane
    **/
   const viewerEvents = {

      // When clicking on a node block inside the pane
      onNodeSelect: useCallback((event: MouseEvent, node: Node) => {
         // setViewport({x: node.position.x, y: node.position.y, zoom: 10}, {duration: 800})
      }, [nodes, setState]),

      // When a node block is dropped
      onNodeDrop: useCallback(() => {
         if (!hasBlockPositionChanged(state)) {
            dispatcher(setBlockPositionChange(true))
         }
      }, [dispatcher, state])
   }

   const blockEvents: BlockEvents = {

      // When user clicks on "Open" or "Explore" button in the card
      onOpenButtonClick: useCallback((id, type, data) => {
         const _type = type as any // common_CardTypes
         dispatcher(selectBlock(id, _type, data))
         dispatcher(toggleModalCardDetails(true))
      }, [])
   }

   const trackbarEvents: TrackbarEvents = {

      // When user clicks on "Align" button in the menu
      onAlignButtonClick: useCallback(() => {
         setNodes(_nodes => updateNodePositionIterator(_nodes))
         dispatcher(setBlockPositionChange(true))
      }, [setNodes, dispatcher]),

      // When user clicks on "Save" button in the menu
      onSaveNodesButtonClick: useCallback(() => {
         dispatcher(setAsyncProcess(AsyncProcesses.SaveNodes, 'triggered'))
      }, [dispatcher]),

      onPathwaySyncButtonClick: useCallback(() => {
         dispatcher(setAsyncProcess(AsyncProcesses.Sync, 'triggered'))
      }, [dispatcher]),

      onPathwayResetProgressButtonClick: useCallback(() => {
         dispatcher(setAsyncProcess(AsyncProcesses.Reset, 'triggered'))
      }, [dispatcher]),

      onPathwaySyncRollbackButtonClick: useCallback((version: number) => {
         dispatcher(setAsyncProcess(AsyncProcesses.SyncRollback, 'triggered', {version}))
      }, [dispatcher]),

      onPathButtonClick: useCallback(() => {
         dispatcher(toggleModalPath(true))
      }, [dispatcher]),

      onMentorButtonClick: useCallback(() => {
         dispatcher(toggleModalMentor(true))
      }, [dispatcher]),

      // When user clicks on "Exit" button in the menu
      onCloseButtonClick: useCallback(() => {
         window.location.href = returnUrl
      }, [returnUrl]),

      onModalPathClose: useCallback(() => {
         dispatcher(toggleModalPath(false))
      }, [dispatcher]),

      onModalMentorClose: useCallback(() => {
         dispatcher(toggleModalMentor(false))
      }, [dispatcher])
   }

   useEffect(() => {
      // Synchronise state inside nodes when state changes
      setNodes(_nodes => updateNodeDataIterator(_nodes, {
         state
      }))
   }, [state, setState])

   onAppMount({
      dispatcher
   })

   onPullPathwayHook({
      dispatcher,
      state,
      project,
      pathwayId,
      request: bffRequests.onPullPathway,
      events: blockEvents,
      setNodes,
      setEdges
   })

   onExplorePathwayHook({
      dispatcher,
      state,
      pathwayId,
      request: bffRequests.onExplorePathway
   })

   onResetPathwayHook({
      dispatcher,
      state,
      pathwayId,
      request: bffRequests.onResetPathway
   })

   onSaveNodesPathwayHook({
      dispatcher,
      state,
      pathwayId,
      nodes,
      request: bffRequests.onSaveNodesPathway
   })

   onSyncPathwayHook({
      dispatcher,
      state,
      pathwayId,
      request: bffRequests.onSyncPathway,
      events: blockEvents,
      setNodes,
      setEdges
   })

   onSyncRollbackPathwayHook({
      dispatcher,
      state,
      pathwayId,
      request: bffRequests.onSyncRollbackPathway,
      events: blockEvents,
      setNodes,
      setEdges
   })

   return (
      <DimmerArea
         inverted={false}
         active={isUIZoneBusy(state, UIZones.App)}
         content={{
            header: 'A few more moments...',
            subheader: 'We are getting things ready and loading your pathway details'
         }}>
         <div id="kue-viewer" className={getThemeClassName(pathway.theme)}>
            <main id="kue-viewer-flow" className="--kue-v-flow">
               <ReactFlow
                  nodes={nodes || []}
                  edges={edges || []}
                  nodeTypes={nodeTypes}
                  onNodeClick={viewerEvents.onNodeSelect}
                  onNodeDragStop={viewerEvents.onNodeDrop}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  connectionMode={ConnectionMode.Strict}
                  defaultZoom={0.5}
                  minZoom={0.2}
                  maxZoom={1}
                  attributionPosition="bottom-left"
                  fitView={true}
               >
                  <Trackbar state={state} events={trackbarEvents}/>
                  <Controls/>
                  <MiniMap
                     nodeStrokeColor="#181321"
                     nodeColor="#6a75ec"
                     nodeBorderRadius={0}
                     nodeStrokeWidth={3}
                     maskColor="#2a213b"
                  />
                  <ModalCard
                     dispatcher={dispatcher}
                     state={state}
                  />
               </ReactFlow>
            </main>
         </div>
      </DimmerArea>
   )
}

export const Viewer = (props: Props): JSX.Element => {
   return (
      <ReactFlowProvider>
         <Flow {...props} />
      </ReactFlowProvider>
   )
}
