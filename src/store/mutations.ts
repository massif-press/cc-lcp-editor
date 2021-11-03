import JSZip, { JSZipObject } from 'jszip'
import Vue from 'vue'

const readZipJSON = async function (zip: JSZip, filename: string): Promise<any> {
  const file: JSZipObject | null = zip.file(filename)
  if (!file) return null
  const text = await file.async('text')
  return JSON.parse(text)
}

async function getZipData(zip: JSZip, filename: string): Promise<any> {
  let readResult
  try {
    readResult = await readZipJSON(zip, filename)
  } catch (e) {
    console.error(`Error reading file ${filename} from package, skipping. Error follows:`)
    console.trace(e)
    readResult = null
  }
  return readResult || []
}

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
