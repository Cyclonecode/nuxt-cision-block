export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'cision-block-module-nuxt-demo',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['nuxt-cision-block', {
      basePath: process.env.BASE_PATH || 'news',
      id: process.env.FEED_ID || 'A275C0BF733048FFAE9126ACA64DD08F',
      useCache: process.env.USE_CACHE === 'true' ? true : (process.env.USE_CACHE === 'false' ? false : true),
      cacheMax: parseInt(process.env.CACHE_MAX) || 1000,
      articleShowImage: process.env.SHOW_ARTICLE_IMAGE === 'true' ? true : (process.env.SHOW_ARTICLE_IMAGE === 'false' ? false : true),
      articleShowIntro: process.env.SHOW_ARTICLE_INTRO === 'true' ? true : (process.env.SHOW_ARTICLE_INTRO === 'false' ? false : true),
      articleShowBody: process.env.SHOW_ARTICLE_BODY === 'true' ? true : (process.env.SHOW_ARTICLE_BODY === 'false' ? false : true),
      articleShowFiles: process.env.SHOW_ARTICLE_FILES === 'true' ? true : (process.env.SHOW_ARTICLE_FILES === 'false' ? false : true),
      showImage: process.env.SHOW_IMAGE === 'true' ? true : (process.env.SHOW_IMAGE === 'false' ? false : true),
      showIntro: process.env.SHOW_INTRO === 'true' ? true : (process.env.SHOW_INTRO === 'false' ? false : true),
      showBody: process.env.SHOW_BODY === 'true' ? true : (process.env.SHOW_BODY === 'false' ? false : false),
      displayMode: parseInt(process.env.DISPLAY_MODE) || 1,
      itemsPerPage: process.env.ITEMS_PER_PAGE !== 'undefined' ? parseInt(process.env.ITEMS_PER_PAGE) : 5,
      itemCount: parseInt(process.env.ITEM_COUNT) || 25,
      itemType: (process.env.ITEM_TYPE || 'KMK,RDV,PRM,RPT,INB,NBR').split(',').filter(it => !!it),
      mustHaveImage: process.env.MUST_HAVE_IMAGE === 'true' ? true : (process.env.MUST_HAVE_IMAGE === 'false' ? false : false),
      startDate: process.env.START_DATE,
      endDate: process.env.END_DATE,
      language: process.env.LANGUAGE,
      categories: (process.env.CATEGORIES || '').split(',').filter(it => !!it),
      keywords: (process.env.KEYWORDS || '').split(',').filter(it => !!it),
      markItem: process.env.MARK_ITEM === 'true' ? true : (process.env.MARK_ITEM === 'false' ? false : true),
      regulatoryText: process.env.REGULATORY_TEXT,
      nonRegulatoryText: process.env.NON_REGULATORY_TEXT,
    }],
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
