import { CisionFeed, CisionFeedResponse } from '../src/Feed'

describe('FeedItems', () => {
  const rawFeed: CisionFeedResponse = {
    PageIndex: 1,
    PageSize: 1,
    TotalFoundMedias: 0,
    TotalFoundReleases: 1,
    Author: 'mock',
    Title: 'mock',
    DatePackaged: new Date().toDateString(),
    ReleaseFeedIdentifier: 'foobar',
    MediaFeedIdentifier: 'foobar',
    Medias: [],
    Releases: [
      {
        SocialMediaPitch: '',
        SyndicatedUrl: '',
        CompanyInformation: '',
        Title: '',
        Intro: '',
        Body: '',
        Id: 1,
        IptcCode: '',
        EncryptedId: '',
        LanguageCode: '',
        CountryCode: '',
        LanguageVersions: [],
        Categories: [
          {
            Name: 'foo',
            Code: 'foo',
          },
          {
            Name: 'bar',
            Code: 'bar',
          },
        ],
        Keywords: [],
        Images: [],
        InformationType: 'PRM',
        PublishDate: '',
        LastChangeDate: '',
        LogoUrl: '',
        MainJobId: 1,
        IsRegulatory: false,
        CanonicalUrl: '',
        CisionWireUrl: '',
        Complete: '',
        Contact: '',
        EmbeddedItems: [],
        ExternalLinks: [],
        QuickFacts: [],
        Quotes: [],
        Files: [],
        Header: '',
        HtmlTitle: '',
        HtmlIntro: '',
        HtmlBody: '',
        HtmlHeader: '',
        HtmlCompanyInformation: '',
        HtmlContact: '',
        RawHtmlUrl: '',
        ServiceCategories: [],
        SourceId: 1,
        SourceIsListed: true,
        SourceName: '',
        SuppressImageOnCisionWire: false,
        Videos: [],
        Tickers: [],
      },
    ],
  }
  it('Test fetched feed', () => {
    const feed = new CisionFeed(rawFeed)
    expect(feed.items).toHaveLength(1)
    expect(feed.index).toBe(1)
    expect(feed.totalItems).toBe(1)
  })
  it('Test filter by category', () => {
    const feed = new CisionFeed(rawFeed)
    expect(feed.items[0].hasCategory(['undefined', 'foo'])).toEqual(true)
    expect(feed.items[0].hasCategory(['undefined'])).toEqual(false)
  })
})
