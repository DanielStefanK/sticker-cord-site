require('dotenv').config()
const colors = require('vuetify/es5/util/colors').default

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: 'Sticker Cord',
    title: 'Sticker Cord',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Looking for new and exiting discord sticker and reactions? Look no further! This is the right place to find awesome sticker already in the right size and origanized'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/auth'],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    defaultAssets: {
      // TODO: dont load fron cdn
      icons: 'fa'
    }
  },
  auth: {
    strategies: {
      local: {
        _scheme: 'local',
        endpoints: {
          login: {
            url: `${process.env.SERVER_URL}auth/login`,
            method: 'post',
            propertyName: 'token'
          },
          logout: false,
          user: {
            url: `${process.env.SERVER_URL}auth/me`,
            method: 'get',
            propertyName: 'data'
          }
        }
        // tokenRequired: true,
        // tokenType: 'bearer'
        // autoFetchUser: true
      },
      discord: {
        _scheme: 'local',
        endpoints: {
          login: {
            url: `${process.env.SERVER_URL}discord/auth/login`,
            method: 'post',
            propertyName: 'token'
          },
          logout: false,
          user: {
            url: `${process.env.SERVER_URL}discord/auth/me`,
            method: 'get',
            propertyName: 'user'
          }
        }
        // tokenRequired: true,
        // tokenType: 'bearer'
        // autoFetchUser: true
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
