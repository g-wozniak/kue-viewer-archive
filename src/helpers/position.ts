import {Node, XYPosition} from 'react-flow-renderer'
import {ViewerBlockDataProps} from '@intf/Blocks'
import * as _ from 'lodash'
import config from '@root/config'

/**
 * orderByLevel
 * @description helper dedicated to preparing node display as a growing, ordered tree, recalculating node positions before they're drawn
 */
export const orderByLevel = (nodes: Node<ViewerBlockDataProps>[], levels: {level: number, id: string}[]): XYPosition[] => {

   const horizonalSpaceBetweenLevels = 400
   const verticalPadding = 200

   function getVericalGap(canvasHeight: number, cardsInLevel: number): number {
      return (canvasHeight - (cardsInLevel * config.card.height)) / (cardsInLevel + 1)
   }

   function getCardXY(gap: number, posInStack: number, level: number): XYPosition {
      return {
         x: level * (config.card.width + horizonalSpaceBetweenLevels),
         y: (posInStack * gap) + (posInStack - 1) * config.card.height
      }
   }

   // Get how many items are in each level
   const levelsCount = _.countBy(levels, 'level')

   // Order this so the last item is the largest count value
   const orderedLevelsCount = _.chain(levelsCount)
      .map((count, level) => ({level, count}))
      .sortBy('count')
      .value()

   // Determine the highest stack central point
   const highestStackCards =  orderedLevelsCount[Object.keys(levelsCount).length-1].count

   // Take all cards, measure their height and add one less gap
   const canvasHeight = highestStackCards * config.card.height + verticalPadding

   // const nodesPerLevel = _.groupBy(levels, 'level')

   /*
   Object.values(nodesPerLevel).forEach(nodes => {
      nodes.forEach(({id, level}) => {

      })
   })*/

   const nodesInLevelCounter = {}
   Object.keys(levelsCount).forEach(level => (
      nodesInLevelCounter[level] = 0
   ))

   // _.orderBy(nodes, 'data.level')
   return nodes.map(node => {
      const level = node.data.level
      const cardsInLevel = levelsCount[level]
      nodesInLevelCounter[level]++
      const posInStack = nodesInLevelCounter[level]
      const gap = getVericalGap(canvasHeight, cardsInLevel)
      return getCardXY(gap, posInStack, level)
   })
}