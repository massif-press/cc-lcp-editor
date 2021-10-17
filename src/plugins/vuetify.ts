import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'
import 'vuetify/dist/vuetify.min.css'

const vuetify = new Vuetify()

Vue.use(Vuetify)
Vue.use(TiptapVuetifyPlugin, {
  vuetify, // same as "vuetify: vuetify"
  iconsGroup: 'mdi',
})

export default new Vuetify({
  // theme: {
  //   themes: {
  //     dark: {
  //       primary: '#3f51b5',
  //       secondary: '#b0bec5',
  //       accent: '#8c9eff',
  //       error: '#b71c1c',
  //     },
  //   }
  // }
})
