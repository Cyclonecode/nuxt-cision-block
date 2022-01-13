import path from 'path'

export default function (this: any, moduleOptions: any) {
  const options = Object.assign({}, this.options.cision, moduleOptions)
  this.options.router = {
    ...this.options.router,
    extendRoutes(routes: any[], resolve: any) {
      routes.push({
        name: 'foo',
        path: `/${options.basePath}/:id`,
        component: resolve(
          './node_modules/nuxt-cision-block-module/lib/pages/Article.vue'
        ),
      })
    },
  }
  this.addTemplate({
    fileName: 'Feed.js',
    src: path.resolve(__dirname, 'Feed.js'),
  })
  this.addTemplate({
    fileName: 'FeedItem.js',
    src: path.resolve(__dirname, 'FeedItem.js'),
  })
  this.addTemplate({
    fileName: 'PressFeed.vue',
    src: path.resolve(__dirname, 'PressFeed.vue'),
  })
  this.addTemplate({
    fileName: 'PressReleaseCard.vue',
    src: path.resolve(__dirname, 'PressReleaseCard.vue'),
  })
  this.addTemplate({
    fileName: 'cision.js',
    src: path.resolve(__dirname, 'cision.js'),
  })
  this.addPlugin({
    src: path.resolve(__dirname, 'Plugin.js'),
    ssr: true,
    options,
  })
}
module.exports.meta = require('../package.json')
