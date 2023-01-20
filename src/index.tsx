import * as React from 'react'
import {createRoot} from 'react-dom/client'

import {
   BFFResolvedResponse,
   BFFResponse,
   common_CardLayouts,
   common_CardTypes,
   common_CardWidgets,
   common_Difficulties,
   PathwayDummyModel,
   PathwayFromBackendPayload,
   PathwayPopulatedDummyModel,
   PathwaySyncFromBackendPayload, PathwaySyncRollbackFromBackendPayload,
   TemplateDummyModel,
   TreeRevisionDummyModel
} from '@kue-space/common'

import './styles/local.scss'
import {Viewer} from '@root/viewer'

const mockedResolvedApiResponse = (payload: BFFResponse<any> = {}): BFFResolvedResponse<any> => {
   return {
      status: 200,
      headers: {},
      statusText: 'ok',
      method: 'POST',
      responseType: 'json',
      timeout: 3000,
      baseURL: 'localhost:3000',
      data: payload,
      url: 'http://localhost:3000/api/endpoint/url'
   }
}

const publishedRevisionId = 'cc0c-98ea'

const dummyTemplate = new TemplateDummyModel({published: true, revisions: 2}, {
   version: {
      major: 7,
      comment: 'Added a few interesting pathways',
      revision: publishedRevisionId,
      published: new Date().toISOString()
   },
   tree: [
      new TreeRevisionDummyModel().toJSON(),
      new TreeRevisionDummyModel({
         revision: publishedRevisionId,
         label: 'decent cards and content',
         comment: 'Updated content and extra section',
         nodes: [
            {
               _id: 'goal',
               cardType: common_CardTypes.Goal,
               label: 'Pathway goal',
               description: 'Become full stack software engineer ready to work on the commercial projects',
               time: 1,
               cost: 0,
               difficulty: common_Difficulties.None,
               layout: common_CardLayouts.TwoEqualColumns,
               position: {
                  x: 100,
                  y: 300
               },
               widgets: [
                  {
                     id: 'fff000',
                     widget: common_CardWidgets.Text,
                     slot: 1,
                     props: {
                        caption: 'Pathway goal',
                        text: 'Become full stack software engineer ready to work on the commercial projects'
                     }
                  },
                  {
                     id: 'fff001',
                     widget: common_CardWidgets.Text,
                     slot: 2,
                     props: {
                        caption: 'A few words from me',
                        text: 'A few words from the author'
                     }
                  },
                  {
                     id: 'fff002',
                     widget: common_CardWidgets.Text,
                     slot: 3,
                     props: {
                        caption: 'A few words from me',
                        text: 'A few words from the author'
                     }
                  }
               ],
               updated: '2022-05-16T19:35:34.644Z',
               created: '2022-05-16T19:35:34.644Z'
            },
            {
               _id: '1',
               cardType: common_CardTypes.Category,
               label: 'Programming techniques',
               description: 'Learn programming languages',
               position: {
                  x: 300,
                  y: 280
               },
               time: 120,
               cost: 19.99,
               difficulty: common_Difficulties.Moderate,
               layout: common_CardLayouts.Single,
               widgets: [
                  {
                     id: 'fee001',
                     widget: common_CardWidgets.Text,
                     slot: 1,
                     props: {
                        caption: 'A few words from me',
                        text: 'A few words from the author'
                     }
                  },
                  {
                     id: 'fcc002',
                     widget: common_CardWidgets.Text,
                     slot: 3,
                     props: {
                        caption: 'A few words from me',
                        text: 'A few words from the author'
                     }
                  }
               ],
               updated: '2022-05-16T19:35:34.644Z',
               created: '2022-05-16T19:35:34.644Z'
            },
            {
               _id: '2',
               cardType: common_CardTypes.Task,
               label: 'Introduction to programming',
               customCardType: 'Video',
               description: 'Watch the video about introduction to computer science and programming',
               position: {
                  x: 820,
                  y: -80
               },
               time: 320,
               cost: 199.19,
               difficulty: common_Difficulties.VeryEasy,
               layout: common_CardLayouts.Single,
               widgets: [
                  {
                     id: 'fca088',
                     widget: common_CardWidgets.Text,
                     slot: 1,
                     props: {
                        caption: 'A few words from me',
                        text: 'A few words from the author'
                     }
                  }
               ],
               updated: '2022-05-16T19:35:34.644Z',
               created: '2022-05-16T19:35:34.644Z'
            },
            {
               _id: '3',
               cardType: common_CardTypes.Skill,
               label: 'JavaScript',
               position: {
                  x: 820,
                  y: 420
               },
               time: 12,
               cost: 19.99,
               difficulty: common_Difficulties.Hard,
               description: 'Learn JavaScript language',
               layout: common_CardLayouts.TwoColumns,
               widgets: [
                  {
                     id: 'fcb111',
                     widget: common_CardWidgets.Text,
                     slot: 1,
                     props: {
                        caption: 'A few words from me',
                        text: 'A few words from the author'
                     }
                  }
               ],
               updated: '2022-05-16T19:35:34.644Z',
               created: '2022-05-16T19:35:34.644Z'
            },
            {
               _id: '4',
               cardType: common_CardTypes.Task,
               customCardType: 'Udemy course',
               label: 'The online course',
               description: 'Watch Max Schwarzmuller course of JavaScript fundamentals',
               time: 600,
               cost: 49,
               difficulty: common_Difficulties.Moderate,
               layout: common_CardLayouts.TwoEqualColumns,
               position: {
                  x: 1260,
                  y: 660
               },
               widgets: [
                  {
                     id: 'fca0ff',
                     widget: common_CardWidgets.Text,
                     slot: 1,
                     props: {
                        caption: 'A few words from me',
                        text: 'A few words from the author'
                     }
                  }
               ],
               updated: '2022-05-16T19:35:34.644Z',
               created: '2022-05-16T19:35:34.644Z'
            }
         ],
         edges: [
            {
               _id: 'goal-1',
               source: 'goal',
               target: '1'
            },
            {
               _id: 'goal-9',
               source: 'goal',
               target: '9'
            },
            {
               _id: '1-2',
               source: '1',
               target: '2'
            },
            {
               _id: '1-3',
               source: '1',
               target: '3'
            },
            {
               _id: '3-4',
               source: '3',
               target: '4'
            }
         ]
      }).toJSON()
   ]
})

const dummyPathway = new PathwayDummyModel({
   _template: dummyTemplate.getId(),
   version: 2,
   progress: ['goal', '1']
})

const dummyPathwayPopulated = new PathwayPopulatedDummyModel({
   _template: dummyTemplate.toJSON(),
   version: dummyPathway.getVersion(),
   progress: dummyPathway.getProgress()
})

const root = createRoot(document.getElementById('my-kue') as HTMLElement)

root.render(<Viewer
   pathwayId={dummyPathwayPopulated.getId()}
   returnUrl="http://localhost:3000"
   bffRequests={{
      onPullPathway: ({pathwayId}) => {
         return new Promise((resolve, reject) => {
            setTimeout(() => {
               console.log(`Obtaining pathway details for ${pathwayId}`)
               resolve(mockedResolvedApiResponse(new PathwayFromBackendPayload(dummyPathwayPopulated, [{
                  version: 1,
                  created: new Date().toISOString()
               }]).getPayload()))
            }, 700)
         })
      },
      onExplorePathway: ({pathwayId, cardId}) => {
         return new Promise((resolve, reject) => {
            setTimeout(() => {
               console.log(`Saving pathway progress for ${pathwayId}. Revealing ${cardId}`)
               resolve(mockedResolvedApiResponse())
            }, 700)
         })
      },
      onResetPathway: ({pathwayId}) => {
         return new Promise((resolve, reject) => {
            setTimeout(() => {
               console.log(`Resetting pathway progress for ${pathwayId}`)
               resolve(mockedResolvedApiResponse())
            }, 700)
         })
      },
      onSaveNodesPathway: ({pathwayId, nodes}) => {
         return new Promise((resolve, reject) => {
            setTimeout(() => {
               console.log(`Saving nodes position for ${pathwayId}`)
               console.log(nodes)
               resolve(mockedResolvedApiResponse())
            }, 700)
         })
      },
      onSyncPathway: ({pathwayId}) => {
         return new Promise((resolve, reject) => {
            setTimeout(() => {
               console.log(`Synchronising ${pathwayId} with the latest template version`)
               resolve(mockedResolvedApiResponse(
                  new PathwaySyncFromBackendPayload(
                     new PathwayDummyModel({
                        _template: dummyTemplate.getId(),
                        version: 7,
                        progress: dummyPathwayPopulated.getProgress(),
                        notes: dummyPathwayPopulated.getCardNotes(),
                        nodes: dummyTemplate.getPublishedRevision()?.nodes,
                        edges: dummyTemplate.getPublishedRevision()?.edges,
                        modified: new Date().toISOString()
                     })
                  ).getPayload()
               ))
            }, 700)
         })
      },
      onSyncRollbackPathway: ({pathwayId}) => {
         return new Promise((resolve, reject) => {
            setTimeout(() => {
               console.log(`Rolling back the synchronisation for ${pathwayId} to the previous state`)
               resolve(mockedResolvedApiResponse(
                  new PathwaySyncRollbackFromBackendPayload(dummyPathway.toSyncedUpdate()).getPayload()
               ))
            }, 700)
         })
      }
   }}
/>)

