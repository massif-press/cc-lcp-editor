import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import { ILCPContent } from '@tenebrae-press/lancer-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lcp: {
      lcp_manifest: {
        name: 'New LCP',
        item_prefix: '',
        author: '',
        version: '0.0.1',
      },
    } as ILCPContent,
    loaded: false,
  },
  mutations,
  getters,
  actions,
})
