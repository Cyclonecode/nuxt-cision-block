import { CisionFeed, CisionFeedResponse } from '../src/Feed'
const mockFeed = require('./json/feed.json')

describe('FeedItems', () => {
  it('Test fetched feed', () => {
    const feed = new CisionFeed(mockFeed)
    expect(feed.items).toHaveLength(1)
    expect(feed.index).toBe(1)
    expect(feed.totalItems).toBe(464)
  })
  it('Test filter by category', () => {
    const feed = new CisionFeed(mockFeed)
    expect(
      feed.items[0].hasCategory(['undefined', 'Regular pressreleases'])
    ).toEqual(true)
    expect(feed.items[0].hasCategory(['undefined'])).toEqual(false)
  })
})
