import '@mdi/font/css/materialdesignicons.css'
import { MystiaLightTheme } from '~/styles/themes/Mystia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'mystiaLight',
      themes: {
        mystiaLight: MystiaLightTheme,
      },
    },
  })
  app.vueApp.use(vuetify)
})