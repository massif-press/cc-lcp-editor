<template>
  <div>
    <v-row justify="space-around" align="center" class="mb-3">
      <v-col cols="5">
        <v-file-input
          v-model="lcpFile"
          variant="outlined"
          color="primary"
          label="Load LCP"
          accept=".lcp,.zip"
          show-size
          hide-details
          :loading="loading"
          @change="loadLcp($event)"
        />
      </v-col>
      <v-col v-if="loaded" cols="5">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn large block color="primary" v-bind="props"
              >Create New LCP</v-btn
            >
          </template>
          <v-card
            ><v-card-text>
              <v-row
                ><v-col cols="auto"
                  ><v-icon size="100">mdi-alert</v-icon></v-col
                >
                <v-col
                  >You have an LCP currently loaded. Creating a new LCP will
                  <b>delete</b> all currently loaded data. Are you sure you want
                  to proceed?</v-col
                ></v-row
              >
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-btn>Cancel</v-btn>
              <v-spacer />
              <v-btn @click="createNew">Proceed</v-btn></v-card-actions
            ></v-card
          >
        </v-menu>
      </v-col>
      <v-col v-else cols="5">
        <v-btn large block color="primary" @click="createNew"
          >Create New LCP</v-btn
        >
      </v-col>
    </v-row>

    <v-card v-if="!loaded" :key="`off_${loaded}`" color="grey darken-2">
      <v-card-text class="text--disabled text-center"
        >No LCP loaded</v-card-text
      >
    </v-card>

    <v-card v-else :key="`on_${loaded}`">
      <v-toolbar
        density="compact"
        color="pink darken-3"
        dark
        :title="lcp.lcp_manifest.name"
      />
      <v-card-text>
        <v-alert variant="outlined" color="secondary">
          <v-row align="center">
            <v-col><v-divider /></v-col>
            <v-col cols="auto"><div class="text-h6">Manifest</div></v-col>
            <v-col><v-divider /></v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-row density="compact" justify="space-around">
                <v-col cols="3">
                  <v-text-field v-model="lcp.lcp_manifest.name" label="Name" />
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="lcp.lcp_manifest.author"
                    label="Author"
                  />
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    v-model="lcp.lcp_manifest.item_prefix"
                    label="Item ID Prefix"
                  />
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    v-model="lcp.lcp_manifest.version"
                    label="LCP Version"
                  />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="lcp.lcp_manifest.website"
                    label="Website URL"
                  />
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="lcp.lcp_manifest.image_url"
                    label="Preview Image URL"
                  />
                </v-col>
                <v-col cols="4">
                  <v-btn large block color="primary darken-3" :to="`/editor/dependencies`" style="margin-top : 0.75rem">
                    Manage Dependencies <span class="item-count" >({{ catLength("dependencies") }})</span >
                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="lcp.lcp_manifest.description"
                    auto-grow
                    rows="3"
                    label="Description"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col v-show="!!lcp.lcp_manifest.image_url" cols="auto">
              Image Preview
              <v-img
                :src="lcp.lcp_manifest.image_url"
                max-width="300"
                contain
              />
            </v-col>
          </v-row>
        </v-alert>
        <v-row align="center" class="pt-2">
          <v-col><v-divider /></v-col>
          <v-col cols="auto"><div class="text-h6">Content</div></v-col>
          <v-col><v-divider /></v-col>
        </v-row>
        <v-row justify="space-around">
          <v-col cols="10">
            <v-btn
              x-large
              block
              color="primary darken-3"
              to="/editor/manufacturers"
            >
              Manufacturers & Licenses
            </v-btn>
            <br />
            <div class="text-center mt-n4">
              {{ manuCount }} Manufacturers ({{
                catLength('manufacturers')
              }}
              new) with {{ catLength('frames') }} Licenses, containing
              {{ catLength('weapons') }} Weapons,
              {{ catLength('systems') }} Systems and
              {{ catLength('mods') }} Weapon Mods
            </div>
          </v-col>
        </v-row>

        <v-row justify="space-around">
          <v-col v-for="(t, i) in categories" :key="`player_btn_${i}`" cols="3">
            <v-btn large block color="primary darken-3" :to="`/editor/${t}`">
              {{ t.replace('_', ' ') }}
              <span v-show="t !== 'tables'" class="item-count"
                >({{ catLength(t) }})</span
              >
            </v-btn>
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <v-alert density="compact" color="warning" icon="mdi-alert" class="mb-3">
          GM-sided LCP support (including NPCs and Eidolons) will be coming alongside the COMP/CON V3 update release. Stay tuned!
        </v-alert>
        <!--
        <v-alert density="compact" color="error" icon="mdi-alert" class="mb-3">
          The editors below are only compatible with the forthcoming GM tools
          update. They are <b>unfinished</b> and
          <b>SHOULD NOT</b>
          be used! They will not read existing NPC LCPs or write new ones. 
        </v-alert>
        <v-row justify="space-around">
          <v-col v-for="(t, i) in gmCategories" :key="`gm_btn_${i}`" cols="4">
            <v-btn large block color="primary darken-3" :to="`/editor/${t}`">
              {{ t.replace('_', ' ') }}
              <span class="item-count">({{ catLength(t) }})</span>
            </v-btn>
          </v-col>
        </v-row>
        -->
      </v-card-text>
      <v-row align="center" class="pt-2">
        <v-col><v-divider /></v-col>
        <v-col cols="auto"><div class="text-h6">Utilities</div></v-col>
        <v-col><v-divider /></v-col>
      </v-row>
      <v-row align="center" justify="space-around">
        <v-col cols="auto"
          ><v-btn color="primary" :disabled="!lcp.lcp_manifest.item_prefix"
            >Standardize IDs
            <v-dialog v-model="idDialog" activator="parent" width="50vw">
              <v-card>
                <v-card-title>ID Standardization Tool</v-card-title>
                <v-divider />
                <v-card-text>
                  This tool will attempt to bring all item IDs into the Massif
                  style (<code>prefix_item_name</code>). This is not necessary,
                  but useful for human readability and future compatibility (eg.
                  from a preview LCP to an official release)
                </v-card-text>
                <v-card-text class="text-center">
                  <v-btn color="primary" @click="generateIds()"
                    >Generate IDs</v-btn
                  >
                  <div v-show="idOutput">
                    <div class="text-caption text-left" v-text="`output`" />
                    <v-textarea
                      v-model="idOutput"
                      auto-grow
                      rows="2"
                      readonly
                    />
                  </div>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                  <v-btn color="secondary" @click="idDialog = false"
                    >Close</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-btn>
          <div
            v-show="!lcp.lcp_manifest.item_prefix"
            class="text-center text-caption text-warning"
          >
            REQUIRES ID PREFIX
          </div>
        </v-col>
      </v-row>
      <div class="pa-4 mt-6">
        <v-alert
          v-if="errors.length > 0"
          color="warning"
          class="ma-2"
          icon="mdi-alert"
        >
          <p v-html="errors" />
        </v-alert>
        <v-alert
          v-if="warnings.length > 0"
          color="orange"
          variant="outlined"
          class="ma-2"
          icon="mdi-alert"
        >
          <p v-html="warnings" />
        </v-alert>
        <v-btn
          size="x-large"
          variant="elevated"
          block
          :color="errors.length ? '' : 'success'"
          :disabled="errors.length > 0"
          @click="exportLCP"
          >Export LCP</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import _ from 'lodash';
import PromisifyFileReader from 'promisify-file-reader';
import JSZip from 'jszip';
import { exportPrep } from './utilities/cleanup';
import { saveAs } from 'file-saver';
import { tags } from '@massif/lancer-data';
import { massif_lcps } from '@/assets/enums';

export default {
  name: 'Home',
  data: () => ({
    lcpFile: undefined,
    loading: false,
    categories: [
      'actions',
      'backgrounds',
      'pilot_gear',
      'reserves',
      'skills',
      'statuses',
      'tags',
      'talents',
    ],
    gmCategories: [
      'npc_classes',
      'npc_templates',
      'eidolon_shells',
      'sitreps',
      'environments',
    ],
    idDialog: false,
    idOutput: '',
  }),
  computed: {
    store() {
      return useStore();
    },
    loaded(): boolean {
      return this.store.getters.loaded;
    },
    lcp(): any {
      return this.store.getters.lcp;
    },
    manuCount(): number {
      if (!this.lcp.manufacturers && !this.lcp.frames) return 0;
      const m =
        this.lcp.manufacturers && this.lcp.manufacturers.length
          ? this.lcp.manufacturers.map((x: any) => x.id)
          : [];
      const f = this.lcp.frames
        ? _.uniq(this.lcp.frames.map((x: any) => x.source))
        : [];
      return _.uniq(m.concat(f)).length;
    },
    missingManifest(): boolean {
      return true;
    },
    flatLcp(): any[] {
      let flat: any[] = [];
      for (const key in this.lcp) {
        if (Array.isArray(this.lcp[key])) flat = [...flat, ...this.lcp[key]];
      }
      return flat;
    },
    dupedIds(): string[] {
      const ids = this.flatLcp.filter((x) => !!x.id).map((y) => y.id);
      const uniq = ids
        .map((id: string) => {
          return {
            count: 1,
            id,
          };
        })
        .reduce((result: any, b: any) => {
          result[b.id] = (result[b.id] || 0) + b.count;

          return result;
        }, {});
      return Object.keys(uniq).filter((a) => uniq[a] > 1);
    },
    missingIds(): { type: string; name: string }[] {
      let missing: any[] = [];
      for (const key in this.lcp) {
        if (key.toLowerCase() === 'statuses') continue;
        if (key.toLowerCase() === 'dependencies') continue;
        if (Array.isArray(this.lcp[key]))
          missing = [
            ...missing,
            ...this.lcp[key]
              .filter((x: any) => !x.id)
              .map((y: any) => ({ type: key, name: y.name })),
          ];
      }
      return missing;
    },
    errors(): string {
      let out = '';
      this.dupedIds.forEach((e) => {
        const dItems = this.flatLcp.filter((x) => x.id === e);
        out += `Duplicate ID:&emsp;<b>${e}</b>&emsp;(${dItems
          .map((x) => x.name)
          .join(', ')})<br>`;
      });

      this.missingIds.forEach((e) => {
        out += `Missing ID:&emsp;<b>${e.type} / ${
          e.name || 'MISSING NAME'
        }</b><br>`;
      });

      if (out.length)
        out = `Errors preventing export have been detected. These can be corrected automatically with the "Standardize IDs" utility above<br>${out}`;

      if (!this.lcp.lcp_manifest.name) out += 'Missing LCP name<br>';
      if (!this.lcp.lcp_manifest.author) out += 'Missing LCP author<br>';
      if (!this.lcp.lcp_manifest.item_prefix)
        out += 'Missing LCP Item ID prefix<br>';
      if (!this.lcp.lcp_manifest.version) out += 'Missing LCP version<br>';

      return out;
    },
    warnings(): string {
      let out = '';
      const localTags =
        this.lcp && this.lcp.tags ? this.lcp.tags.map((x: any) => x.id) : [];
      const knownIds = [...tags.map((x: any) => x.id), ...localTags];

      const usedIds = this.flatLcp
        .filter((x) => !!x.tags)
        .flatMap((x) => x.tags)
        .map((x) => x.id);

      const missingTagIds = usedIds.filter((x) => !knownIds.includes(x));
      if (missingTagIds.length) {
        out = `The following tag IDs have been detected in the LCP but cannot be resolved. This will cause failures in COMP/CON if the tags cannot be found:<br>${missingTagIds.join(
          '<br>'
        )}`;
      }

      return out;
    },
  },
  methods: {
    catLength(type: string): number {
      if (this.lcp[type]) return this.lcp[type].length;
      return 0;
    },
    async loadLcp(file: HTMLInputElement) {
      this.loading = true;

      if (!file) return;
      if (!this.lcpFile) return;

      const fileData = await PromisifyFileReader.readAsBinaryString(
        this.lcpFile[0]
      );

      try {
        this.store.dispatch('loadLcp', fileData).then(() => {
          this.loading = false;
        });
      } catch (e: any) {
        console.error(e);
        this.loading = false;
      }
    },
    clearLcp() {
      this.store.dispatch('clearLcp');
    },
    createNew() {
      this.store.dispatch('clearLcp');
      this.store.dispatch('newLcp');
    },
    exportLCP() {
      const filename = `${this.lcp.lcp_manifest.name
        .toLowerCase()
        .replaceAll(' ', '-')}_${this.lcp.lcp_manifest.version}.lcp`;
      this.prepWeapons();
      this.prepBackgrounds();
      this.prepDependencies();
      const zip = new JSZip();
      Object.keys(this.lcp).forEach((key) => {
        if (key.toLowerCase() != "dependencies") zip.file(`${key}.json`, exportPrep(this.lcp[key]));
      });
      zip.generateAsync({ type: 'blob' }).then(function (blob) {
        saveAs(blob, filename);
      });
    },
    prepWeapons() {
      if (!this.lcp.weapons) return;
      //collapse single-profile weapons for clean export
      this.lcp.weapons.forEach((w: any) => {
        if (w.profiles && w.profiles.length === 1) {
          for (const key in w.profiles[0]) {
            if (key === "name" || key === "effect") continue;
            if (w.profiles[0][key]) {w[key] = w.profiles[0][key];}
          }
          delete w.profiles;
        }
      });
    },
    prepBackgrounds() {
      if (!this.lcp.backgrounds) return;
      // remove skill additional info from each skill
      this.lcp.backgrounds.forEach((b: any) => {
        b.skills = b.skills.map(s => (s && s.id) ? s.id : s);
      });
    },
    prepDependencies() {
      if (!this.lcp.dependencies) return;
      // remove skill additional info from each skill
      this.lcp.dependencies.forEach((d: any) => {
        var mlcp = massif_lcps.find((x) => x["name"] == d.name);
        if (mlcp){
          d.version = mlcp.version;
          d.link = mlcp.link;
        }
      });
      this.lcp.lcp_manifest.dependencies = JSON.parse(JSON.stringify(this.lcp.dependencies));
    },
    generateIds() {
      let start = Date.now();
      this.idOutput = `Starting ID generation process...\n`;
      const seenIds: string[] = [];
      const replacements: { oldId: string; newId: string }[] = [];
      let count = 0;
      for (const key in this.lcp) {
        if (!Array.isArray(this.lcp[key])) continue;
        if (key.toLowerCase() === 'manufacturers') continue;
        this.lcp[key].forEach((item: any, index: number) => {
          count++;
          let tId = '';
          if (item.name)
            tId = `${this.lcp.lcp_manifest.item_prefix}_${key
              .toLowerCase()
              .replaceAll(' ', '_')}_${item.name
              .toLowerCase()
              .replaceAll(' ', '_')}`;
          else
            tId = `${this.lcp.lcp_manifest.item_prefix}_${key
              .toLowerCase()
              .replaceAll(' ', '_')}`;
          let dupes = seenIds.filter((x) => x.includes(tId));
          if (dupes.length) tId = `${tId}_${dupes.length}`;
          seenIds.push(item.id);
          replacements.push({ oldId: item.id, newId: tId });
          this.lcp[key][index].id = tId;
        });
      }

      //iterate through all items and replace seen IDs with their generated counterparts
      let json = JSON.stringify(this.lcp);
      replacements.forEach((item) => {
        json = json.replaceAll(item.oldId, item.newId);
      });

      this.store.dispatch('setLcp', JSON.parse(json));

      this.idOutput += `...Complete!\n`;
      this.idOutput += `Processed ${count} item IDs in ${Date.now() - start}ms`;
    },
  },
};
</script>

<style scoped>
.item-count {
  font-size: 12px;
  font-weight: 100;
  margin-left: 4px;
}
</style>
