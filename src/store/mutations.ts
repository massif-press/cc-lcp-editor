import JSZip from 'jszip';
import { getZipData } from '../views/utilities/zip_reader';

export default {
  async LOAD_LCP(state: any, payload: any): Promise<void> {
    state.loaded = false;
    state.lcp = {};
    const zip = await JSZip.loadAsync(payload);
    await Promise.all(
      Object.keys(zip.files).map(async (file) => {
        const propname = zip.files[file].name.split('.')[0];
        const npcname = propname.slice(5);
        if (propname.startsWith("npcc")){
          if (!state.lcp.npc_classes) state.lcp['npc_classes'] = {};
          state.lcp.npc_classes[npcname] = await getZipData(zip, zip.files[file].name);
        } else if (propname.startsWith("npct")){
          if (!state.lcp.npc_templates) state.lcp['npc_templates'] = {};
          state.lcp.npc_templates[npcname] = await getZipData(zip, zip.files[file].name);
        } else {
          state.lcp[propname] = await getZipData(zip, zip.files[file].name);
        }
      })
    );
    if (!state.lcp.lcp_manifest) state.lcp.lcp_manifest = {};
    state.loaded = true;
  },
  SET_LCP(state: any, payload: any) {
    state.lcp = payload;
    state.loaded = true;
  },
  CLEAR_LCP(state: any): void {
    state.lcp = {};
    state.loaded = false;
  },
  NEW_LCP(state: any): void {
    state.lcp = {
      lcp_manifest: {} as any,
    };
    state.loaded = true;
  },
};
