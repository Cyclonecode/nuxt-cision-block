export interface CisionMedia {
  CreatedDate: string
  FileName: string
  Title: string
  Description: string
  IsMain: boolean
  MediaType: string
  Keywords: []
}
export interface CisionFile extends CisionMedia {
  Url: string
}
export interface CisionImage extends CisionMedia {
  DownloadUrl: string
  Photographer: string
  UrlTo100x100ArResized: string
  UrlTo100x100Thumbnail: string
  UrlTo200x200ArResized: string
  UrlTo200x200Thumbnail: string
  UrlTo400x400ArResized: string
  UrlTo800x800ArResized: string
}
export interface CisionCategory {
  Code: string
  Name: string
}
export interface CisionQuote {
  Author: string
  Text: string
}
export interface CisionFeedItemResponse {
  SyndicatedUrl: string
  CompanyInformation: string
  Title: string
  Intro: string
  Body: string
  Id: number
  IptcCode: string
  EncryptedId: string
  LanguageCode: string
  CountryCode: string
  LanguageVersions: []
  Categories: CisionCategory[]
  Keywords: string[]
  Images: CisionImage[]
  InformationType: string
  PublishDate: string
  LastChangeDate: string
  LogoUrl: string
  MainJobId: number
  IsRegulatory: boolean
  CanonicalUrl: string
  CisionWireUrl: string
  Complete: string
  Contact: string
  EmbeddedItems: []
  ExternalLinks: []
  QuickFacts: []
  Quotes: CisionQuote[]
  Files: CisionFile[]
  Header: string
  HtmlTitle: string
  HtmlIntro: string
  HtmlBody: string
  HtmlHeader: string
  HtmlCompanyInformation: string
  SocialMediaPitch: string
  HtmlContact: string
  RawHtmlUrl: string
  ServiceCategories: []
  SourceId: number
  SourceIsListed: boolean
  SourceName: string
  SuppressImageOnCisionWire: boolean
  Videos: []
  Tickers: []
}

export class CisionFeedItem {
  title: string
  body: string
  htmlBody: string
  intro: string
  htmlIntro: string
  image: string
  date: string
  categories: string[]
  keywords: string[]
  languageCode: string
  countryCode: string
  type: string
  isRegulatory: boolean
  encryptedId: string
  id: number

  constructor(rawItem: CisionFeedItemResponse) {
    this.title = rawItem.Title
    this.body = rawItem.Body
    this.htmlBody = rawItem.HtmlBody
    this.intro = rawItem.Intro
    this.htmlIntro = rawItem.HtmlIntro
    this.image = rawItem.Images?.[0]?.DownloadUrl
    this.date = new Date(rawItem.PublishDate).toDateString()
    this.categories = (rawItem.Categories || []).map((it: any) =>
      it.Name.toLowerCase()
    )
    this.keywords = rawItem.Keywords || []
    this.languageCode = rawItem.LanguageCode
    this.countryCode = rawItem.CountryCode
    this.type = rawItem.InformationType
    this.isRegulatory = rawItem.IsRegulatory
    this.encryptedId = rawItem.EncryptedId
    this.id = rawItem.Id
  }
  hasCategory(categories: string[]): boolean {
    for (const category of categories) {
      if (this.categories.includes(category)) {
        return true
      }
    }
    return false
  }
  toJSON() {
    return { ...this }
  }
}

export interface CisionPressReleaseResponse {
  Release: CisionFeedItemResponse
  DatePackaged: string
  Title: string
  Author: string
}

export default {
  CisionFeedItem,
}
