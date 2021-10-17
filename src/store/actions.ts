export default {
  loadLcp({ commit }: any, file: any) {
    commit('LOAD_LCP', file)
  },
  clearLcp({ commit }: any) {
    commit('CLEAR_LCP')
  },
  newLcp({ commit }: any) {
    commit('NEW_LCP')
  },
}
