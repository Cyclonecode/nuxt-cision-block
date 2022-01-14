import { CisionFeedItem, CisionFeedItemResponse } from './FeedItem'
import DisplayMode from './DisplayMode'
import ItemType from './ItemType'

export interface CisionFeedResponse {
  Releases: CisionFeedItemResponse[]
  PageIndex: number
  PageSize: number
  TotalFoundReleases: number
  TotalFoundMedias: number
  Author: string
  DatePackaged: string
  MediaFeedIdentifier: string
  ReleaseFeedIdentifier: string
  Title: string
  Medias: []
}

export class CisionFeed {
  items: CisionFeedItem[]
  index: number
  itemsPerPage: number
  totalItems: number
  totalMedias: number
  title: string
  author: string
  created: string
  mediaId: string
  releaseId: string

  constructor(data: CisionFeedResponse) {
    this.items = data.Releases.map((it) => new CisionFeedItem(it))
    this.itemsPerPage = data.PageSize
    this.index = data.PageIndex
    this.totalItems = data.TotalFoundReleases
    this.totalMedias = data.TotalFoundMedias
    this.title = data.Title
    this.author = data.Author
    this.created = new Date(data.DatePackaged).toDateString()
    this.mediaId = data.MediaFeedIdentifier
    this.releaseId = data.ReleaseFeedIdentifier
  }
  toJSON() {
    return { ...this }
  }
}

export type LanguageCode = string
export type CountryCode = string

export interface FeedOptions {
  id?: string
  index?: number
  itemCount?: number
  itemsPerPage?: number
  itemType?: ItemType[]
  startDate?: string
  endDate?: string
  displayMode?: DisplayMode
  language?: LanguageCode
  categories?: string[]
  keywords?: string[]
  mustHaveImage?: boolean
  useCache?: boolean
}

export default {
  CisionFeed,
}
