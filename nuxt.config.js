
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: ['~/plugins/vuelidate'],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',

    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyAmw_1oTJWLFokCphphTM1NBa_iweARCqk",
          authDomain: "bitkingdomclaim.firebaseapp.com",
          databaseURL: "https://bitkingdomclaim.firebaseio.com",
          projectId: "bitkingdomclaim",
          storageBucket: "bitkingdomclaim.appspot.com",
          messagingSenderId: "843211353535",
          appId: "1:843211353535:web:6fbe6d1e1d5ab5ca93c50a"
        },
        services: {
          realtimeDb: true // Just as example. Can be any other service.
        }
      }
    ]

  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    vendor: ['vuelidate']
  }
}
