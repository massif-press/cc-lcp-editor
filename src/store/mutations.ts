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
  async LOAD_LCP(state: any, payload: any) {
    state.loaded = false
    const zip = await JSZip.loadAsync(payload)
    Object.keys(zip.files).forEach(async file => {
      const propname = zip.files[file].name.split('.')[0]
      Vue.set(state.lcp, propname, await getZipData(zip, zip.files[file].name))
    });
    state.loaded = true
    console.log(state)
  },
  CLEAR_LCP(state: any) {
    state.lcp = {}
    state.loaded = false
  }
}