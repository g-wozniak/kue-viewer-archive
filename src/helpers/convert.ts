import {Edge, Node, NodeTypes} from 'react-flow-renderer'
import {KeyAny, TModels} from '@kue-space/common'
import floor from 'lodash/floor'

import config from '@root/config'
import {initialState} from '@state/state'
import {orderByLevel} from './position'

import {ViewerBlockDataProps} from '@intf/Blocks'
import {BlockEvents} from '@intf/Events'
import {alignPosition} from '@helpers/utils'

/**
 * getNodeTypes
 * @description returns block types (cards, in our case) for React-flow to pick up
 */
export const getNodeTypes = (): NodeTypes => {
   const nodeTypes: KeyAny = {}
   for (const block in config.blocks) {
      nodeTypes[block] = config.blocks[block].component
   }
   nodeTypes['error'] = () => {
      const el = document.createElement('div')
      el.innerHTML = 'Unknown node type'
      return el
   }
   return nodeTypes
}

/**
 * extractPathway
 * @description extracts the pathway from data provided by the API to the format recognised by the react-flow
 * @param treeNodes
 * @param treeEdges
 * @param events
 */
export const extractPathway = (treeNodes: TModels.TreeNode[], treeEdges: TModels.TreeEdge[], events: BlockEvents): [Node[], Edge[]] => {

   // Convert API edge to react-flow edge
   function treeEdgeToFlowEdge(treeEdge: TModels.TreeEdge): Edge {
      return {
         id: treeEdge._id,
         source: treeEdge.source,
         target: treeEdge.target
      }
   }

   // Convert API node to react-flow node
   function treeNodeToFlowNode(treeNode: TModels.TreeNode, data: Partial<ViewerBlockDataProps>): Node {
      const blockData: ViewerBlockDataProps = {
         label: treeNode.label,
         description: treeNode.description,
         customCardType: treeNode.customCardType,
         time: treeNode.time,
         cost: treeNode.cost,
         layout: treeNode.layout,
         difficulty: treeNode.difficulty,
         widgets: treeNode.widgets || [],
         state: initialState,
         events,
         parents: [],
         children: [],
         dependants: [],
         level: 0,
         accumulated: {
            time: 0,
            cost: 0,
            difficulty: 0
         },
         ...data
      }
      return {
         id: treeNode._id,
         position: treeNode.position,
         type: treeNode.cardType,
         data: blockData,
         hidden: false,
         selected: false,
         draggable: true,
         selectable: true,
         connectable: true
      }
   }

   // Recursive function call that determines nesting level of a block
   function nodeTreeLevel(treeNode: TModels.TreeNode): number {
      if (treeNode._id === 'goal') {
         return 0
      } else {
         return recursion__moveUpInTree(treeNode._id, 1)
      }
   }

   // Recursion iterator moving up in the tree structure
   function recursion__moveUpInTree(id: string, depth: number): number {
      const edge = treeEdges.find(edge => edge.target === id)
      if (edge) {
         if (edge.source === 'goal') {
            return depth
         } else {
            depth++
            return recursion__moveUpInTree(edge.source, depth)
         }
      } else {
         return -1
      }
   }

   // Recursive function to determine all the depending blocks of the given node
   function getDependants(nodeId: string): string[] {
      const blocks: string[] = []

      // Recursion iterator exploring tree
      function recursion__dependants(sourceId: string) {
         blocks.push(sourceId)
         const children = edges.filter(e => e.source === sourceId)
         if (children.length > 0) {
            children.forEach(e => recursion__dependants(e.target))
         }
      }
      recursion__dependants(nodeId)
      return blocks
   }

   // Returns accumulated cost of the node dependants
   function getAccumulatedCost(treeNode: TModels.TreeNode, dependants: string[]): number {
      return treeNodes
         .filter(n => dependants.includes(n._id))
         .reduce((cost, node) => cost + node.cost, treeNode.cost)
   }

   // Returns accumulated time of the node dependants
   function getAccumulatedTime(treeNode: TModels.TreeNode, dependants: string[]): number {
      return treeNodes
         .filter(n => dependants.includes(n._id))
         .reduce((time, node) => time + node.time, treeNode.time)
   }

   // Returns accumulated/average difficulty of the node dependants
   function getAverageDifficulty(treeNode: TModels.TreeNode, dependants: string[]): number {
      const difficulty = treeNodes
         .filter(n => dependants.includes(n._id))
         .reduce((difficulty, node) => difficulty + Number(node.difficulty), Number(treeNode.difficulty))
      return floor(difficulty / dependants.length)
   }

   // *** implementation starts *** //

   const links: {
      [nodeId: string]: {
         parents: string[]
         children: string[]
      }
   } = {}

   const levels: {
      level: number
      id: string
   }[] = []

   // List all the children of the node
   const edges = treeEdges.map(treeEdge => {
      const edge = treeEdgeToFlowEdge(treeEdge)
      // Each node must have source (except the goal block)
      // Each node must have an edge to source (except the goal block)
      if (links.hasOwnProperty(edge.source)) {
         links[edge.source].children.push(edge.target)
      } else {
         links[edge.source] = {
            children: [edge.target],
            parents: treeEdges
               .filter(te => te.target === edge.source)
               .map(te => te.source)
         }
      }
      return edge
   })

   const nodes = treeNodes.map(treeNode => {
      const children = Object.hasOwn(links, treeNode._id)
         ? links[treeNode._id].children
         : []

      const parents = Object.hasOwn(links, treeNode._id)
         ? links[treeNode._id].parents
         : treeEdges
            .filter(te => te.target === treeNode._id)
            .map(te => te.source)

      // Determine amount of nodes per each tree level
      // Used for further calculation of the nodes position and sorting
      const level = nodeTreeLevel(treeNode)
      levels.push({
         level,
         id: treeNode._id
      })

      const dependants = getDependants(treeNode._id)

      const accumulated = {
         cost: getAccumulatedCost(treeNode, dependants),
         time: getAccumulatedTime(treeNode, dependants),
         difficulty: getAverageDifficulty(treeNode, dependants)
      }

      return treeNodeToFlowNode(treeNode, {parents, children, level, dependants, accumulated})
   })

   // Obtain new block positions
   const newPositions = orderByLevel(nodes, levels)

   // Merge newly calculated tree positions with the existing array
   const merged = nodes.map((n, i) => ({...n, position: newPositions[i]}))

   return [merged, edges]
}

/**
 * updateNodePositionIterator
 * @description React-flow iterator that replaces block positions and returns a new array of nodes
 */
export const updateNodePositionIterator = (nodes: Node[]): Node[] => {
   return nodes.map(node => ({
      ...node,
      position: {
         x: alignPosition(node.position.x, 100),
         y: alignPosition(node.position.y, 100)
      }
   }))
}

/**
 * updateNodeDataIterator
 * @description react-flow iterator that replaces data object inside the block and returns a new array of nodes
 * @param nodes
 * @param data
 */
export const updateNodeDataIterator = (nodes: Node[], data: Partial<ViewerBlockDataProps>): Node[] => {
   return nodes.map((_node) => {
      _node.data = {
         ..._node.data,
         ...data
      }
      return _node
   })
}