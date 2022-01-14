const axios = require('axios')
const LRUCache = require('lru-cache')
const md5 = require('md5')
import {
  CisionFeedItem,
  CisionFeedItemResponse,
  CisionPressReleaseResponse,
} from './FeedItem'
import { CisionFeed, CisionFeedResponse, FeedOptions } from './Feed'
import PressFeed from './PressFeed.vue'
import DisplayMode from './DisplayMode'
// const meta = require('./package.json')

const CisionBlock: any = {
  data() {
    return {
      installed: false,
    }
  },
  install(Vue: any, args: any = {}) {
    if (this.installed) {
      return
    }
    this.installed = true

    this.client = axios.create({
      baseURL: 'https://publish.ne.cision.com/papi/',
      timeout: args.timeout || 10000,
      // headers: {
      //   get: {
      //     'User-Agent': 'nuxt-cision-block/' + meta.version,
      //   }
      // }
    })

    this.cache = new LRUCache({
      max: args.cacheMax || 0, // 1000
      maxAge: !args.useCache ? -1 : parseInt(args.cacheMaxAge || (1000 * 60 * 15), 10),
    })

    Vue.component(args.componentName || 'PressFeed', PressFeed)

    const cision = {
      options: {},
      fetch: (id: string): Promise<CisionFeedItem> => {
        const key = md5(
          JSON.stringify({
            id,
          })
        )
        let data = this.options.useCache ? this.cache.get(key) : null
        if (data) {
          return data
        }
        return this.client
          .get(`Release/${id}`)
          .then((response: { data: CisionPressReleaseResponse }) => {
            data = new CisionFeedItem(response.data.Release)
            if (this.options.useCache) {
              this.cache.set(key, data)
            }
            return data
          })
          .catch((error: any) => {
            console.log('Failed to fetch article %s', id, error)
          })
      },
      fetchFeed: (options: FeedOptions): Promise<CisionFeed> => {
        options = Object.assign(
          {},
          this.options,
          JSON.parse(JSON.stringify(options))
        )
        const key = md5(
          JSON.stringify({
            id: this.id,
            ...options,
          })
        )
        let data = options.useCache ? this.cache.get(key) : null
        if (data) {
          return data
        }
        return this.client
          .get(`NewsFeed/${options.id}`, {
            params: {
              DetailLevel: 'detail',
              PageIndex: options.index || 1,
              PageSize: options.itemCount || 50,
              Format: 'json',
              Regulatory:
                options.displayMode === DisplayMode.DISPLAY_REGULATORY
                  ? true
                  : options.displayMode === DisplayMode.DISPLAY_NON_REGULATORY
                  ? false
                  : undefined,
              Tags: options.keywords?.join(','),
              StartDate: options.startDate,
              EndDate: options.endDate,
              SearchTerm: undefined,
            },
          })
          .then((response: { data: CisionFeedResponse }) => {
            // Filter on information type
            if (options.itemType?.length) {
              response.data.Releases = response.data.Releases.filter(
                (it: CisionFeedItemResponse) =>
                  (options.itemType || []).map(it => it.toUpperCase()).includes(it.InformationType.toUpperCase())
              )
            }
            // Filter on language code
            if (!!options.language) {
              response.data.Releases = response.data.Releases.filter(
                (it: CisionFeedItemResponse) =>
                  it.LanguageCode?.toUpperCase() ===
                  options.language?.toUpperCase()
              )
            }
            // Filter out items without image
            if (!!options.mustHaveImage) {
              response.data.Releases = response.data.Releases.filter(
                (it: CisionFeedItemResponse) => it.Images.length
              )
            }
            // Filter on category
            if (!!options.categories?.length) {
              response.data.Releases = response.data.Releases.filter(
                (it: CisionFeedItemResponse) => {
                  for (const catName of options.categories || []) {
                    if (
                      it.Categories.find(
                        (category) => category.Name.toLowerCase() === catName.toLowerCase()
                      )
                    ) {
                      return true
                    }
                  }
                }
              )
            }
            data = new CisionFeed(response.data)
            if (options.useCache) {
              this.cache.set(key, data)
            }
            return data
          })
          .catch((error: any) => {
            console.log('Failed to fetch feed', error)
            return {
              items: [],
            }
          })
      },
    }

    this.options = {
      ...args,
    }
    cision.options = {
      ...args,
    }

    const name = args.name || 'cision'
    Vue.prototype['$' + name] = cision
    Vue[name] = cision
  },
}

export default CisionBlock
