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

const cache = new LRUCache({
  maxAge: 60000,
  // max: 1000,
})

const Cision: any = {
  data() {
    return {
      installed: false,
    }
  },
  install(Vue: any, args: any = {}) {
    if (this.installed) {
      return
    }
    this.id = args.id
    if (!this.id) {
      // How do we handle this
    }
    this.installed = true
    this.useCache = args.useCache || false
    this.params = args
    this.client = axios.create({
      baseURL: 'https://publish.ne.cision.com/papi/',
      timeout: args.timeout || 10000,
    })

    Vue.component(args.componentName || 'PressFeed', PressFeed)

    const cision = {
      fetch: (id: string): Promise<CisionFeedItem> => {
        const key = md5(
          JSON.stringify({
            id,
          })
        )
        let data = this.useCache ? cache.get(key) : null
        if (data) {
          console.log('returned from cache')
          return data
        }
        return this.client
          .get(`Release/${id}`)
          .then((response: { data: CisionPressReleaseResponse }) => {
            data = new CisionFeedItem(response.data.Release)
            if (this.useCache) {
              cache.set(key, data)
            }
            return data
          })
          .catch((error: any) => {
            console.log('failed to fetch article %s', id)
          })
      },
      fetchFeed: (options: FeedOptions): Promise<CisionFeed> => {
        const key = md5(
          JSON.stringify({
            id: this.id,
            ...options,
          })
        )
        let data = this.useCache ? cache.get(key) : null
        if (data) {
          console.log('returned from cache')
          return data
        }
        return this.client
          .get(`NewsFeed/${this.id}`, {
            params: {
              DetailLevel: 'detail',
              PageIndex: options.index || 1,
              PageSize: options.count || 50,
              Format: 'json',
              Regulatory: options.regulatory || null,
            },
          })
          .then((response: { data: CisionFeedResponse }) => {
            if (!!options.language) {
              response.data.Releases = response.data.Releases.filter(
                (it: CisionFeedItemResponse) =>
                  it.LanguageCode?.toUpperCase() ===
                  options.language?.toUpperCase()
              )
            }
            if (!!options.hasImage) {
              response.data.Releases = response.data.Releases.filter(
                (it: CisionFeedItemResponse) => it.Images.length
              )
            }
            if (!!options.categories) {
              response.data.Releases = response.data.Releases.filter(
                (it: CisionFeedItemResponse) => {
                  for (const catName of options.categories || []) {
                    if (
                      it.Categories.find(
                        (category) => category.Name === catName
                      )
                    ) {
                      return true
                    }
                  }
                }
              )
            }
            console.log(
              'PageSize: %s, PageIndex: %s, TotalItems: %s',
              response.data.PageSize,
              response.data.PageIndex,
              response.data.TotalFoundReleases
            )
            data = new CisionFeed(response.data)
            if (this.useCache) {
              cache.set(key, data)
            }
            return data
          })
          .catch((error: any) => {
            console.log(error)
            return {
              items: [],
            }
          })
      },
    }

    const name = args.name || 'cision'
    // @ts-ignore
    cision.options = {
      ...args,
    }

    Vue.prototype['$' + name] = cision
    Vue[name] = cision
  },
}

export default Cision
