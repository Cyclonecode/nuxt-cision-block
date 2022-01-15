import path from 'path'
import Options from './Options'
import { ITEM_TYPE_ALL } from './ItemType'

export default function (this: any, moduleOptions: Options) {
  const defaultOptions: Options = {
    showImage: false,
    mustHaveImage: false,
    showIntro: true,
    showBody: true,
    articleShowImage: false,
    articleShowIntro: true,
    articleShowBody: true,
    articleShowFiles: true,
    itemType: ITEM_TYPE_ALL,
    startDate: undefined,
    endDate: undefined,
    useCache: true,
    cacheMax: 1000,
    cacheMaxAge: 60 * 15 * 1000,
    basePath: 'news',
    itemCount: 50,
    itemsPerPage: 0,
    language: undefined,
    categories: undefined,
    keywords: undefined,
    markItem: false,
    regulatoryText: 'Regulatory',
    nonRegulatoryText: 'Non-regulatory',
    displayMode: 1,
    id: undefined,
  }
  const options: Options = Object.assign(
    {},
    defaultOptions,
    this.options.cision,
    moduleOptions
  )
  this.extendRoutes((routes: any[], resolve: any) => {
    routes.push({
      name: 'news',
      path: `/${options.basePath}/:id`,
      component: resolve(path.resolve(__dirname, 'pages/Article.vue')),
    })
  })
  const templates = [
    'pages/Article.vue',
    'CisionBlock.js',
    'DisplayMode.js',
    'Feed.js',
    'FeedItem.js',
    'ItemType.js',
    'Options.js',
    'PressFeed.vue',
    'PressReleaseCard.vue',
  ]
  for (const template of templates) {
    this.addTemplate({
      fileName: path.join('cision-block', template),
      src: path.resolve(__dirname, template),
    })
  }
  this.addPlugin({
    src: path.resolve(__dirname, 'Plugin.js'),
    fileName: 'cision-block/Plugin.js',
    ssr: true,
    options,
  })
}
module.exports.meta = require('../package.json')
