import { ILCPContent } from '@tenebrae-press/lancer-types'
import { AppState } from './shape'

export default {
  lcp: (state: AppState): ILCPContent => state.lcp,
  loaded: (state: AppState): boolean => state.loaded,
}
