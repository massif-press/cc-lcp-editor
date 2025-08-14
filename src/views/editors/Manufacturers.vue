<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-list nav lines="two">
          <v-list-item
            v-for="(m, i) in allManufacturers"
            :key="`${m.id}_${i}`"
            :class="selected && selected.id === m.id ? 'primary darken-3' : ''"
            selectable
            :title="m.name"
            @click="selected = m">
            <template v-slot:subtitle="{ subtitle }">
              {{ itemsByMID(m.id, 'core_bonuses').length }} core bonuses,
              {{ itemsByMID(m.id, 'frames').length }} frames with
              {{ itemsByMID(m.id, 'weapons').length }} weapons,
              {{ itemsByMID(m.id, 'systems').length }} systems,
              {{ itemsByMID(m.id, 'mods').length }} mods
            </template>
          </v-list-item>
          <v-divider />
          <v-list-item
            :class="selected && selected === 'none' ? 'primary darken-3' : ''"
            selectable
            title="No Source"
            @click="selected = 'none'">
            <template v-slot:subtitle="{ subtitle }">
              {{ itemsByMID('', 'weapons').length }} weapons,
              {{ itemsByMID('', 'systems').length }} systems,
              {{ itemsByMID('', 'mods').length }} mods
            </template>
          </v-list-item>
        </v-list>
        <v-divider class="my-2" />
        <v-btn block color="secondary" @click="addNew">
          <v-icon left>mdi-plus</v-icon>
        </v-btn>
        <div style="min-height: 20px" />
      </v-col>
      <v-col>
        <v-container v-if="selected === 'none'">
          <sourceless-equipment />
          <sourceless-equipment exotic />
        </v-container>

        <v-container v-else-if="selected" :key="idSwapOutput">
          <v-expansion-panels v-model="panels" focusable accordion multiple>
            <v-expansion-panel>
              <v-expansion-panel-title>Manufacturer Information</v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-alert outlined color="primary" class="mt-2">
                  <v-row density="compact" justify="space-around" align="center">
                    <v-col cols="3">
                      <v-text-field
                        v-model="selected.id"
                        hide-details
                        label="ID"
                        readonly />
                    </v-col>
                    <v-col cols="2">
                    <v-btn v-if="!isCore(selected.id)" color="surface">Change ID
                      <v-dialog v-model="idSwapDialog" activator="parent" width="50vw">
                        <v-card>
                          <v-card-title>ID Replacement Tool</v-card-title>
                          <v-divider />
                          <v-card-text>
                            This tool will attempt to replace all instances of the previous manufacturer ID with the new one, 
                            allowing you to change the shortened version of how the manufacturer appears in COMP/CON. 
                            <br/><br/>Unlike the generic "Replace ID" tool, this directly modifies items that are under the given manufacturer in the LCP, as well as the manufacturer itself, and is therefore entirely safe to use.
                          </v-card-text>
                          <v-card-text class="text-center">
                            <v-text-field color="primary" label="Old ID" v-model="selected.id" readonly></v-text-field>
                            <v-text-field color="primary" label="New ID" v-model="newID"></v-text-field>
                            <v-btn color="primary" @click="replaceID()"
                              >Replace IDs</v-btn
                            >
                            <div v-show="idSwapOutput">
                              <div class="text-caption text-left" v-text="`output`" />
                              <v-textarea
                                v-model="idSwapOutput"
                                auto-grow
                                rows="2"
                                readonly
                              />
                            </div>
                          </v-card-text>
                          <v-divider />
                          <v-card-actions>
                            <v-btn color="secondary" @click="idSwapDialog = false"
                              >Close</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-btn>
                  </v-col>
                    <v-col cols="7">
                      <v-text-field
                        v-model="selected.name"
                        hide-details
                        label="Name"
                        :readonly="isCore(selected.id)" />
                    </v-col>
                  </v-row>
                  <v-row density="compact" justify="space-around" align="center">
                    <v-col>
                      <v-text-field
                        v-model="selected.logo_url"
                        label="SVG Logo URL"
                        hide-details
                        :readonly="isCore(selected.id)" />
                      <v-img :src="selected.logo_url" max-height="222" max-width="450" contain />
                    </v-col>
                    <v-col>
                      <color-selector
                        v-model="selected.light"
                        title="Light Color"
                        :disabled="isCore(selected.id)" />
                    </v-col>
                    <v-col>
                      <color-selector
                        v-model="selected.dark"
                        title="Dark Color"
                        :disabled="isCore(selected.id)" />
                    </v-col>
                    <v-col cols="12">
                      <rich-text-editor
                        title="Flavor Quote"
                        v-model="selected.quote"
                        :readonly="isCore(selected.id)" />
                    </v-col>
                    <v-col cols="12">
                      <rich-text-editor
                        title="Description"
                        v-model="selected.description"
                        :readonly="isCore(selected.id)" />
                    </v-col>
                  </v-row>
                </v-alert>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title>Core Bonuses</v-expansion-panel-title>
              <v-expansion-panel-text>
                <core-bonus-editor :manufacturer="selected" />
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title>Licenses and Equipment</v-expansion-panel-title>
              <v-expansion-panel-text>
                <license-editor :manufacturer="selected" />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <div class="text-right">
            <v-menu width="30em">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-if="!isCore(selected.id)"
                  size="small"
                  color="error"
                  class="my-5"
                  v-bind="props">
                  DELETE MANUFACTURER
                </v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <v-row>
                    <v-col cols="auto"><v-icon size="100">mdi-alert</v-icon></v-col>
                    <v-col>
                      Deleting this manufacturer will also delete any associated Core Bonuses,
                      Licenses, Frames, Weapons, Systems, and Mods. Are you sure you want to
                      proceed?
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                  <v-btn>Cancel</v-btn>
                  <v-spacer />
                  <v-btn @click="deleteManufacturer()">Proceed</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </div>
        </v-container>
        <div v-else>
          <v-row style="height: 50vh" justify="center" align="center">
            <v-col cols="auto" class="text-h2 text--disabled">Select a Manufacturer</v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <br/>
    <v-alert
      v-show="hasImportedError"
      :icon="'mdi-alert'"
      prominent
      :color="'error darken-2'"
      class="text-center"
    >
      <code class="error-msg">
        <span
          v-html="'Importing JSON file failed, check console for errors!'"
        />
      </code>
    </v-alert>
    <v-footer app>
      <v-btn to="/">
        <v-icon>mdi-chevron-left</v-icon>
        Back
      </v-btn>
      <v-spacer />
      <input ref="fileUpload" type="file" accept=".json" hidden @change="importFile" />
      <v-menu bottom open-on-hover offset-y>
        <template v-slot:activator="{ props }">
          <v-btn outlined small class="mx-1" v-bind="props">Export JSON File</v-btn>
        </template>
        <v-list density="compact">
          <v-list-item @click="exportJSON('manufacturers')">
            <v-list-item-title>Export Manufacturers</v-list-item-title>
          </v-list-item>
          <v-list-item @click="exportJSON('frames')">
            <v-list-item-title>Export Frames</v-list-item-title>
          </v-list-item>
          <v-list-item @click="exportJSON('core_bonuses')">
            <v-list-item-title>Export Core Bonuses</v-list-item-title>
          </v-list-item>
          <v-list-item @click="exportJSON('weapons')">
            <v-list-item-title>Export Weapons</v-list-item-title>
          </v-list-item>
          <v-list-item @click="exportJSON('systems')">
            <v-list-item-title>Export Systems</v-list-item-title>
          </v-list-item>
          <v-list-item @click="exportJSON('mods')">
            <v-list-item-title>Export Mods</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu bottom open-on-hover offset-y>
        <template v-slot:activator="{ props }">
          <v-btn outlined small class="mx-1" v-bind="props">Import JSON File</v-btn>
        </template>
        <v-list density="compact">
          <v-list-item @click="importJSON('manufacturers')">
            <v-list-item-title>Import Manufacturers</v-list-item-title>
          </v-list-item>
          <v-list-item @click="importJSON('frames')">
            <v-list-item-title>Import Frames</v-list-item-title>
          </v-list-item>
          <v-list-item @click="importJSON('core_bonuses')">
            <v-list-item-title>Import Core Bonuses</v-list-item-title>
          </v-list-item>
          <v-list-item @click="importJSON('weapons')">
            <v-list-item-title>Import Weapons</v-list-item-title>
          </v-list-item>
          <v-list-item @click="importJSON('systems')">
            <v-list-item-title>Import Systems</v-list-item-title>
          </v-list-item>
          <v-list-item @click="importJSON('mods')">
            <v-list-item-title>Import Mods</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-footer>
  </div>
</template>

<script lang="ts">
import _, { property } from 'lodash';
import { manufacturers } from '@massif/lancer-data';
import { useStore } from 'vuex';

import { exportPrep } from '../utilities/cleanup';

import ColorSelector from '../../components/ColorSelector.vue';
import CoreBonusEditor from './components/CoreBonus.vue';
import LicenseEditor from './components/Licenses.vue';
import SourcelessEquipment from './components/SourcelessEquipment.vue';

export default {
  name: 'manufacturer-editor',
  components: {
    CoreBonusEditor,
    LicenseEditor,
    SourcelessEquipment,
    ColorSelector,
  },
  data: () => ({
    panels: [0, 1, 2],
    core_manufacturers: manufacturers,
    selected: null as any,
    importKey: '',
    hasImportedError : false,
    idSwapDialog: false,
    idSwapOutput: '',
    newID: '',
  }),
  computed: {
    store() {
      return useStore();
    },
    lcp(): any {
      return this.store.getters.lcp;
    },
    allManufacturers(): any[] {
      const local = this.lcp.manufacturers ? this.lcp.manufacturers : [];
      return [
        ...new Map(
          local.concat(this.core_manufacturers).map((item: any) => [item.id, item])
        ).values(),
      ];
    },
    liteColorRaw: {
      get() {
        return this.selected.light;
      },
      set(v: any) {
        this.selected.light = v['hex'];
      },
    },
    darkColorRaw: {
      get() {
        return this.selected.dark;
      },
      set(v: any) {
        this.selected.dark = v['hex'];
      },
    },
  },
  methods: {
    addNew() {
      if (!this.lcp.manufacturers) {
        this.lcp.manufacturers = [];
      }
      this.lcp.manufacturers.push({
        id: `new_manufacturer_${this.lcp.manufacturers.length}`,
        name: 'New Manufacturer',
        light: '#ff0000',
        dark: '#ff0000',
      });
    },
    itemsByMID(id: string, type: string) {
      if (!this.lcp[type]) return [];
      if (!id)
        return this.lcp[type].filter(
          (x: any) => !!x.source && (x.source === id || x.source.toLowerCase() === 'exotic')
        );
      return this.lcp[type].filter((x: any) => x.source === id);
    },
    isCore(id: string) {
      return this.core_manufacturers.map((x: any) => x.id).some((y: string) => y === id);
    },
    deleteManufacturer() {
      for (const key in this.lcp) {
        if (!Array.isArray(this.lcp[key])) continue;
        this.lcp[key].forEach((item: any, index: number) => {
          if (!item.source) return;
          if (item.source.toLowerCase() === this.selected.id.toLowerCase()) {
            this.lcp[key].splice(index, 1);
          }
        });
      }
      this.lcp.manufacturers.splice(
        this.lcp.manufacturers.findIndex((x: any) => x.id === this.selected.id),
        1
      );
      this.selected = null;
    },
    exportJSON(itemKey: string) {
      const blob = new Blob([exportPrep(this.lcp[itemKey])]);
      const elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = `${itemKey}.json`;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    },
    importJSON(itemKey: string) {
      this.importKey = itemKey;
      if (this.$refs.fileUpload) (this.$refs.fileUpload as HTMLElement).click();
    },
    importFile(evt: any) {
      const file = evt.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          this.lcp[this.importKey] = JSON.parse(e?.target?.result?.toString() || '');
        } catch (e : any) {
          this.hasImportedError = true;
          console.error(e);
        }
      }
      reader.readAsText(file);
    },
    replaceID() {
      /* makes a bold assumption that the only time this manufacturer is ever referenced 
         is in its own ID, and the source fields of all other top level items
         should be safe - since manufacturers should only ever be referenced via `source` fields
      */
      let start = Date.now();
      let count = 1;
      this.idSwapOutput = `Starting ID replacement process\n`;
      if (!this.newID || this.newID === ""){
        this.idSwapOutput += `Missing ID to replace with, replacement cancelled`;
        return;
      } else if (this.newID === this.selected.id) {
        this.idSwapOutput += `New ID is the same as old ID, replacement cancelled`;
        return;
      }

      this.idSwapOutput += `Replacing all instances of "${this.selected.id} with "${this.newID}"`;
  
      //iterate through all items and replace seen IDs with their generated counterparts
      for (const key in this.lcp) {
        if (!Array.isArray(this.lcp[key])) continue;
        this.lcp[key].forEach((item: any, index: number) => {
          if (!item.source) return;
          if (item.source.toLowerCase() === this.selected.id.toLowerCase()) {
            item.source = this.newID;
            count++;
          }
        });
      }
      for (var item of this.lcp.manufacturers) {
        if (item.id === this.selected.id) item.id = this.newID;
      }
      this.selected.id = this.newID;
      this.idSwapOutput += `...Complete!\n`;
      this.idSwapOutput += `Replacement took ${Date.now() - start}ms (${count} replacements made)`;
      
    },
  },
};
</script>
