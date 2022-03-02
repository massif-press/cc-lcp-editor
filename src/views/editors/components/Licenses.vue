<template>
  <div>
    <v-card v-for="(l, i) in Object.keys(licensesByFrame)" :key="`license_rank_${i}`" class="my-2">
      <v-toolbar dense class="text-h6">{{ l }}</v-toolbar>
      <v-card-text>
        <v-row
          v-for="(lvl, j) in itemsByLevel(licensesByFrame[l])"
          :key="`license_${i}_level_${j}`">
          <v-col cols="1" class="text-h5 text-center">LL{{ j }}</v-col>
          <v-col>
            <v-row>
              <v-col
                v-for="(item, k) in itemsByLevel(licensesByFrame[l])[j]"
                :key="`license_${i}_level_${j}_item_${k}`">
                <v-btn block :color="colorByType(item)" @click="openByType(item)">
                  {{ item.name }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-divider class="mt-4" />
    <v-row justify="space-between" class="mt-1">
      <v-col>
        <v-btn block large color="deep-purple darken-4" @click="newItem('frames')">
          <v-icon left>mdi-plus</v-icon>
          add new frame
        </v-btn>
      </v-col>
      <v-col>
        <v-btn block large color="deep-orange darken-4" @click="newItem('weapons')">
          <v-icon left>mdi-plus</v-icon>
          add new weapon
        </v-btn>
      </v-col>
      <v-col>
        <v-btn block large color="teal darken-4" @click="newItem('systems')">
          <v-icon left>mdi-plus</v-icon>
          add new system
        </v-btn>
      </v-col>
      <v-col>
        <v-btn block large color="cyan darken-3" @click="newItem('mods')">
          <v-icon left>mdi-plus</v-icon>
          add new mod
        </v-btn>
      </v-col>
    </v-row>
    <frame-editor
      ref="frames"
      :manufacturer="manufacturer"
      @save="saveItem('frames', $event)"
      @remove="removeItem('frames', $event)" />
    <system-editor
      ref="systems"
      :manufacturer="manufacturer"
      :licenses="licenseNames"
      @save="saveItem('systems', $event)"
      @remove="removeItem('systems', $event)" />
    <mod-editor
      ref="mods"
      :manufacturer="manufacturer"
      :licenses="licenseNames"
      @save="saveItem('mods', $event)"
      @remove="removeItem('mods', $event)" />
    <weapon-editor
      ref="weapons"
      :manufacturer="manufacturer"
      :licenses="licenseNames"
      @save="saveItem('weapons', $event)"
      @remove="removeItem('weapons', $event)" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import _ from 'lodash'
import FrameEditor from './_FrameEditor.vue'
import SystemEditor from './_SystemEditor.vue'
import ModEditor from './_ModEditor.vue'
import WeaponEditor from './_WeaponEditor.vue'
import {
  IFrameData,
  ILCPContent,
  IMechSystemData,
  IMechWeaponData,
  IWeaponModData,
} from '@tenebrae-press/lancer-types'

type ValidLCPKeys = 'weapons' | 'mods' | 'systems'
type ValidContentItems = IMechSystemData | IWeaponModData | IMechWeaponData | IFrameData

export default Vue.extend({
  name: 'license-editor',
  components: { FrameEditor, SystemEditor, ModEditor, WeaponEditor },
  props: { manufacturer: { type: Object, required: true } },
  computed: {
    lcp(): ILCPContent {
      return this.$store.getters.lcp
    },
    licensesByFrame(): _.Dictionary<Array<ValidContentItems>> {
      let ungroupedContent = this.collect('weapons')
        .concat(this.collect('systems'))
        .concat(this.collect('mods'))
      ungroupedContent = ungroupedContent.filter(x => x.source === this.manufacturer.id)
      let items = _.groupBy(ungroupedContent, 'license')

      if (this.lcp.frames && this.lcp.frames.length) {
        this.lcp.frames
          .filter(x => x.source === this.manufacturer.id)
          .forEach((frame: IFrameData) => {
            if (this.manufacturer.id === 'GMS' && frame.source === 'GMS') {
              if (!items['GMS']) this.$set(items, 'GMS', [])
              items['GMS'].push(frame)
              return
            }
            if (!items[frame.name]) this.$set(items, frame.name, [])
            items[frame.name].push(frame)
          })
      }
      return items
    },
    licenseNames(): string[] {
      return Object.keys(this.licensesByFrame)
    },
  },
  methods: {
    collect(key: ValidLCPKeys): Array<ValidContentItems & { itemType?: ValidLCPKeys }> {
      switch (key) {
        case 'weapons':
          return this.lcp.weapons?.map(x => ({ ...x, itemType: key })) ?? []
        case 'mods':
          return this.lcp.mods?.map(x => ({ ...x, itemType: key })) ?? []
        case 'systems':
          return this.lcp.systems?.map(x => ({ ...x, itemType: key })) ?? []
        default:
          return []
      }
    },
    getType(item: ValidContentItems & { itemType?: string }): string {
      if (item.itemType) return item.itemType
      return 'frames'
    },
    colorByType(item: ValidContentItems & { itemType?: string }) {
      const type = this.getType(item)
      if (type === 'weapons') return 'deep-orange darken-4'
      if (type === 'frames') return 'deep-purple darken-4'
      if (type === 'mods') return 'cyan darken-3'
      return 'teal darken-4'
    },
    itemsByLevel(arr: ValidContentItems[]) {
      return _.groupBy(arr, 'license_level')
    },
    openByType(item: ValidContentItems & { itemType?: string }) {
      this.openItem(this.getType(item), item)
    },
    newItem(type: string) {
      if (this.$refs && this.$refs[type]) {
        const r = this.$refs[type] as unknown as { reset: () => void; open: () => void }
        r.reset()
        r.open()
      }
    },
    openItem(type: string, item: ValidContentItems) {
      if (this.$refs && this.$refs[type]) {
        const r = this.$refs[type] as unknown as { edit: (item: ValidContentItems) => void }
        r.edit(item)
      }
    },
    saveItem(type: ValidLCPKeys | 'frames', item: ValidContentItems | IFrameData) {
      if (!this.lcp[type]) this.$set(this.lcp, type, [])
      const idx = ((type: ValidLCPKeys | 'frames') => {
        switch (type) {
          case 'frames':
            return this.lcp.frames?.findIndex(x => x.id === item.id)
          case 'mods':
            return this.lcp.mods?.findIndex(x => x.id === item.id)
          case 'systems':
            return this.lcp.systems?.findIndex(x => x.id === item.id)
          case 'weapons':
            return this.lcp.weapons?.findIndex(x => x.id === item.id)
          default:
            return undefined
        }
      })(type)
      if (idx === undefined) {
        this.$set(this.lcp, type, [item])
      } else if (idx < 0) {
        ;(this.lcp[type] as unknown as Array<ValidContentItems | IFrameData>)?.push(item)
      } else
        this.$set(this.lcp[type] as unknown as Array<ValidContentItems | IFrameData>, idx, item)
    },
    removeItem(type: ValidLCPKeys | 'frames', id: string) {
      const idx = ((type: ValidLCPKeys | 'frames') => {
        switch (type) {
          case 'frames':
            return this.lcp.frames?.findIndex(x => x.id === id)
          case 'mods':
            return this.lcp.mods?.findIndex(x => x.id === id)
          case 'systems':
            return this.lcp.systems?.findIndex(x => x.id === id)
          case 'weapons':
            return this.lcp.weapons?.findIndex(x => x.id === id)
          default:
            return undefined
        }
      })(type)
      if (idx && idx > -1) this.lcp[type]?.splice(idx, 1)
    },
  },
})
</script>
