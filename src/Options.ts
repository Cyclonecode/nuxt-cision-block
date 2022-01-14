import DisplayMode from './DisplayMode'

export default interface Options {
    showImage: boolean
    mustHaveImage: boolean
    showIntro: boolean
    showBody: boolean
    articleShowImage: boolean
    articleShowIntro: boolean
    articleShowBody: boolean
    articleShowFiles: boolean
    // showFilters: boolean
    // filterRegulatoryText: string
    // filterNonRegulatoryText: string
    // filterAllText: string
    // imageStyle: string
    itemType: string[]
    startDate?: string
    endDate?: string
    useCache: boolean
    cacheMax: number
    cacheMaxAge: number
    basePath: string
    itemCount: number
    itemsPerPage: number
    language?: string
    categories?: string[]
    keywords?: string[]
    markItem: boolean
    regulatoryText: string
    nonRegulatoryText: string
    displayMode: DisplayMode
    id?: string
}
