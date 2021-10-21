export default {
  loadLcp({ commit }: any, file: any): void {
    commit('LOAD_LCP', file)
  },
  clearLcp({ commit }: any): void {
    commit('CLEAR_LCP')
  },
  newLcp({ commit }: any): void {
    commit('NEW_LCP')
  },
}
