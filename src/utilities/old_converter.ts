import JSZip from 'jszip'
import { getZipData } from '@/utilities/zip_reader'
import { saveAs } from 'file-saver'

const etypes = ['npc_classes', 'npc_templates']
const ftypes = ['optional_features', 'base_features']

const convert = async (payload: any): Promise<any> => {
  const lcp = {} as any
  const zip = await JSZip.loadAsync(payload)
  await Promise.all(
    Object.keys(zip.files).map(async file => {
      const propname = zip.files[file].name.split('.')[0]
      lcp[propname] = await getZipData(zip, zip.files[file].name)
    })
  )

  for (const i in etypes) {
    if (lcp[etypes[i]]) {
      lcp[etypes[i]].forEach((c: any) => {
        for (const j in ftypes) {
          c[ftypes[j]].forEach((id: string) => {
            const match = lcp.npc_features.find((x: any) => x.id === id)
            if (!match) {
              console.error('ERR! Cannot find NPC Feature matching ID', id)
              return
            }
            match.origin = {
              type: Number(i) === 0 ? 'Class' : 'Template',
              name: c.name,
              optional: Number(j) === 0,
              origin_id: c.id,
            }
            let delIdx = -1
            match.tags.forEach((t: any, i: number) => {
              if (t.id === 'tg_recharge') {
                match.recharge = t.val
                delIdx = i
              }
              else if (t.id === 'tg_protocol') {
                match.type = "Protocol"
                delIdx = i
              } else if (t.id === 'tg_reaction') {
                match.type = "Reaction"
                delIdx = i
              }
              else if (t.val && !Array.isArray(t.val))
                t.val = [t.val, t.val, t.val]
            });
            if (delIdx > -1) match.tags.splice(delIdx, 1)
          });
          delete c[ftypes[j]]
          delete c.power
        }
      });
    }
  }

  exportLCP(lcp)

  return 'Conversion complete'
}

const exportLCP = (lcp: any) => {
  const filename = `${lcp.lcp_manifest.name.toLowerCase().replaceAll(' ', '-')}_${lcp.lcp_manifest.version
    }.lcp`
  const zip = new JSZip()
  Object.keys(lcp).forEach(key => {
    zip.file(`${key}.json`, JSON.stringify(lcp[key]))
  })
  zip.generateAsync({ type: 'blob' }).then(function (blob) {
    saveAs(blob, filename)
  })
}

export {
  convert
}