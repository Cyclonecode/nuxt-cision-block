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
      basePath: 'press',
      id: 'A275C0BF733048FFAE9126ACA64DD08F',
      useCache: true,
      cacheMax: 1000,
      articleShowImage: true,
      articleShowIntro: true,
      articleShowBody: true,
      articleShowFiles: true,
      showImage: true,
      showIntro: true,
      showBody: true,
      displayMode: 1,
      itemsPerPage: 5,
      itemCount: 25,
    }],
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
