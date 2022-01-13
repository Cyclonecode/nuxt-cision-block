import { CisionFeedItem, CisionFeedItemResponse } from './FeedItem'

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
  // languageCode: string;
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

type LanguageCode = string
type CountryCode = string

export interface FeedOptions {
  index?: number
  count?: number
  language?: LanguageCode
  regulatory?: boolean
  categories?: string[]
  keywords?: string[]
  hasImage?: boolean
}

export default {
  CisionFeed,
}
