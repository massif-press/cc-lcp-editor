<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <v-list nav dense>
          <v-list-item
            v-for="(m, i) in allManufacturers"
            :key="`${m.id}_${i}`"
            :class="
              selected && selected !== 'none' && selected.id === m.id ? 'primary darken-3' : ''
            "
            selectable
            @click="selected = m">
            <v-list-item-content class="mt-n2">
              <v-list-item-title>
                <span class="text-h6 mr-1">{{ m.id }}</span>
                {{ m.name }}
              </v-list-item-title>
              <v-list-item-action-text class="mt-n2">
                {{ itemsByMID(m.id, 'core_bonuses').length }} core bonuses
                <br />
                {{ itemsByMID(m.id, 'frames').length }} frames with
                {{ itemsByMID(m.id, 'weapons').length }} weapons,
                {{ itemsByMID(m.id, 'systems').length }} systems,
                {{ itemsByMID(m.id, 'mods').length }} mods
              </v-list-item-action-text>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <v-list-item
            :class="selected && selected === 'none' ? 'primary darken-3' : ''"
            selectable
            @click="selected = 'none'">
            <v-list-item-content class="mt-n2">
              <v-list-item-title>
                <span class="text-h6 mr-1">No Source</span>
              </v-list-item-title>
              <v-list-item-action-text class="mt-n2">
                {{ itemsByMID('', 'weapons').length }} weapons,
                {{ itemsByMID('', 'systems').length }} systems,
                {{ itemsByMID('', 'mods').length }} mods
              </v-list-item-action-text>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider class="my-2" />
        <v-btn block color="secondary" @click="addNew">
          <v-icon left>mdi-plus</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-container v-if="selected === 'none'">
          <p class="text-center grey darken-4 pa-2">
            The following equipment does not include a
            <code>Source</code>
            field. This is used to add integrated equipment that does not appear anywhere besides
            the parent frame or equipment, and is not normally independently selectable by a player.
          </p>
          <sourceless-equipment />
        </v-container>
        <v-container v-else-if="selected">
          <v-expansion-panels v-model="panels" focusable accordion>
            <v-expansion-panel>
              <v-expansion-panel-header>Manufacturer Information</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-alert outlined text color="primary" class="mt-2">
                  <v-row dense justify="space-around">
                    <v-col cols="3">
                      <v-text-field
                        v-model="selected.id"
                        hide-details
                        label="ID"
                        :readonly="isCore(selected.id)" />
                    </v-col>
                    <v-col cols="9">
                      <v-text-field
                        v-model="selected.name"
                        hide-details
                        label="Name"
                        :readonly="isCore(selected.id)" />
                    </v-col>
                  </v-row>
                  <v-row dense justify="space-around" align="center">
                    <v-col>
                      <v-text-field
                        v-model="selected.logo_url"
                        persistent-hint
                        hint="SVG"
                        label="Logo URL"
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
                      <rich-text-editor title="Flavor Quote" v-model="selected.quote" />
                    </v-col>
                    <v-col cols="12">
                      <rich-text-editor title="Description" v-model="selected.description" />
                    </v-col>
                  </v-row>
                </v-alert>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Core Bonuses</v-expansion-panel-header>
              <v-expansion-panel-content>
                <core-bonus-editor :manufacturer="selected" />
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Licenses and Equipment</v-expansion-panel-header>
              <v-expansion-panel-content>
                <license-editor :manufacturer="selected" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <div style="min-height: 50px" />
        </v-container>
        <div v-else>
          <v-row style="height: 50vh" justify="center" align="center">
            <v-col cols="auto" class="text-h2 text--disabled">Select a Manufacturer</v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-footer fixed>
      <v-btn text to="/">
        <v-icon>mdi-chevron-left</v-icon>
        back
      </v-btn>
      <v-spacer />
      <input ref="fileUpload" type="file" accept=".json" hidden @change="importFile" />
      <v-menu bottom open-on-hover offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn outlined small class="mx-1" v-bind="attrs" v-on="on">Export JSON File</v-btn>
        </template>
        <v-list dense>
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
        <template v-slot:activator="{ on, attrs }">
          <v-btn outlined small class="mx-1" v-bind="attrs" v-on="on">Import JSON File</v-btn>
        </template>
        <v-list dense>
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
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { manufacturers } from 'lancer-data'

import ColorSelector from '@/components/ColorSelector.vue'
import CoreBonusEditor from './components/CoreBonus.vue'
import LicenseEditor from './components/Licenses.vue'
import SourcelessEquipment from './components/SourcelessEquipment.vue'
import {
  ICoreBonusData,
  IFrameData,
  IManufacturerData,
  IMechSystemData,
  IMechWeaponData,
} from '@tenebrae-press/lancer-types'
import { ILCPContent } from '@tenebrae-press/lancer-types/src/lcp'

const typedManufacturers = manufacturers as unknown as Array<IManufacturerData>

type ManufacturerEditorData = {
  panels: number
  core_manufacturers: Array<IManufacturerData>
  selected?: IManufacturerData | 'none' | null
  importKey: string
}

export default Vue.extend({
  name: 'manufacturer-editor',
  components: {
    CoreBonusEditor,
    LicenseEditor,
    SourcelessEquipment,
    ColorSelector,
  },
  data: (): ManufacturerEditorData => ({
    panels: 0,
    core_manufacturers: typedManufacturers,
    selected: null,
    importKey: '',
  }),
  computed: {
    lcp(): ILCPContent {
      return this.$store.getters.lcp
    },
    allManufacturers(): Array<IManufacturerData> {
      const local: Array<IManufacturerData> = this.lcp.manufacturers ? this.lcp.manufacturers : []
      return [
        ...new Map(local.concat(this.core_manufacturers).map(item => [item.id, item])).values(),
      ]
    },
    liteColorRaw: {
      get() {
        return this.selected !== 'none' ? this.selected?.light : undefined
      },
      set(v: { hex: string }) {
        if (this.selected && this.selected !== 'none') {
          this.selected.light = v['hex']
        }
      },
    },
    darkColorRaw: {
      get() {
        return this.selected !== 'none' ? this.selected?.dark : undefined
      },
      set(v: { hex: string }) {
        if (this.selected && this.selected !== 'none') {
          this.selected.dark = v['hex']
        }
      },
    },
  },
  methods: {
    addNew() {
      if (!this.lcp.manufacturers) {
        this.$set(this.lcp, 'manufacturers', [])
      }
      this.lcp.manufacturers?.push({
        id: 'new',
        name: 'New Manufacturer',
        light: '#ff0000',
        dark: '#ff0000',
        description: '',
        quote: '',
      })
    },
    itemsByMID(
      id: string,
      type: 'core_bonuses' | 'frames' | 'weapons' | 'systems' | 'mods'
    ): Array<IMechWeaponData | IFrameData | ICoreBonusData | IMechSystemData> {
      if (!this.lcp[type]) {
        return []
      } else {
        switch (type) {
          case 'core_bonuses':
            return this.lcp.core_bonuses?.filter(x => x.source === id) ?? []
          case 'frames':
            return this.lcp.frames?.filter(x => x.source === id) ?? []
          case 'weapons':
            return this.lcp.weapons?.filter(x => x.source === id) ?? []
          case 'systems':
            return this.lcp.systems?.filter(x => x.source === id) ?? []
          case 'mods':
            return this.lcp.mods?.filter(x => x.source === id) ?? []
        }
      }
    },
    isCore(id: string) {
      return this.core_manufacturers.map(x => x.id).some((y: string) => y === id)
    },
    exportJSON(itemKey: keyof ILCPContent) {
      const blob = new Blob([JSON.stringify(this.lcp[itemKey])])
      const elem = window.document.createElement('a')
      elem.href = window.URL.createObjectURL(blob)
      elem.download = `${itemKey}.json`
      document.body.appendChild(elem)
      elem.click()
      document.body.removeChild(elem)
    },
    importJSON(itemKey: string) {
      this.importKey = itemKey
      if (this.$refs.fileUpload) (this.$refs.fileUpload as HTMLElement).click()
    },
    importFile(evt: Event) {
      const file = (evt.target as HTMLInputElement).files?.item(0)
      if (!file) return
      const reader = new FileReader()

      reader.onload = e =>
        this.$set(this.lcp, this.importKey, JSON.parse(e?.target?.result?.toString() || ''))
      reader.readAsText(file)
    },
  },
})
</script>
