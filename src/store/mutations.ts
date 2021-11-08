import JSZip from 'jszip'
import { getZipData } from '@/utilities/zip_reader'
import Vue from 'vue'

export default {
  async LOAD_LCP(state: any, payload: any): Promise<void> {
    state.loaded = false
    Vue.set(state, 'lcp', {})
    const zip = await JSZip.loadAsync(payload)
    await Promise.all(
      Object.keys(zip.files).map(async file => {
        const propname = zip.files[file].name.split('.')[0]
        Vue.set(state.lcp, propname, await getZipData(zip, zip.files[file].name))
      })
    )
    if (!state.lcp.lcp_manifest) state.lcp.lcp_manifest = {
      name: 'New LCP',
      version: '0.0.1',
    }
    state.loaded = true
    console.info(state)
  },
  CLEAR_LCP(state: any): void {
    Vue.set(state, 'lcp', {})
    state.loaded = false
  },
  NEW_LCP(state: any): void {
    Vue.set(state, 'lcp',
      {
        lcp_manifest: {
          name: 'New LCP',
          version: '0.0.1',
        },
      }
    )
    state.loaded = true
  },
}
