// vuetify.config.ts
import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'
import { MystiaLightTheme } from './src/styles/themes/vuetify/Mystia'

export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: 'mystiaLight',
    themes: {
      mystiaLight: MystiaLightTheme,
    },
  },
})