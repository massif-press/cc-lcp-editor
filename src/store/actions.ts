export default {
  setLcp({ commit }: any, lcp: any): void {
    commit('SET_LCP', lcp);
  },
  loadLcp({ commit }: any, file: any): void {
    commit('LOAD_LCP', file);
  },
  clearLcp({ commit }: any): void {
    commit('CLEAR_LCP');
  },
  newLcp({ commit }: any): void {
    commit('NEW_LCP');
  },
};
