// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  
  // enable devtools
    devtools: {
        enabled: true,
        timeline: {
            enabled: true
        }
    },

    css: ['~/styles/global.css'],

  // structure out the code
  srcDir: 'src/',

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image'
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    plugins: [
      vuetify({ autoImport: true })
    ]
  },
})