import JSZip, { JSZipObject } from 'jszip'

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

export {
  readZipJSON,
  getZipData
}