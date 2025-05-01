export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  app: {
      pageTransition: {name: 'page', mode: 'out-in'},
      layoutTransition: {name: 'page', mode: 'out-in'}
  },
  devtools: { enabled: true, timeline: { enabled: true } },

  // global css
  css: ['~/styles/global.css'],
  
  // structure out the code
  srcDir: 'src/',

  experimental: {
    asyncContext: true
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'vuetify-nuxt-module',
    '@nuxt/content',
    'nuxt-monaco-editor'
  ],

  vuetify: {
    moduleOptions: {
    },
    vuetifyOptions: './vuetify.config.ts'
  },

  nitro: {
    experimental: {
      openAPI: true,
      websocket: true,
    },
    prerender: {
      concurrency: 12,
    },
  }
})