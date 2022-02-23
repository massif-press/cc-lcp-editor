import { ActionContext } from 'vuex'
import { AppState } from './shape'

export default {
  loadLcp({ commit }: ActionContext<AppState, AppState>, file: Blob): void {
    commit('LOAD_LCP', file)
  },
  clearLcp({ commit }: ActionContext<AppState, AppState>): void {
    commit('CLEAR_LCP')
  },
  newLcp({ commit }: ActionContext<AppState, AppState>): void {
    commit('NEW_LCP')
  },
}
