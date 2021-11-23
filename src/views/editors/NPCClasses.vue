<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <v-list nav dense>
          <v-list-item
            v-for="(c, i) in classes"
            :key="`${c.id || 'new'}_${i}`"
            :class="selected && selected.id === c.id ? 'primary darken-3' : ''"
            selectable
            @click="selected = c"
          >
            <v-list-item-content class="mt-n2">
              <v-list-item-title>
                <span class="text-h6 mr-1">{{ c.name }}</span>
              </v-list-item-title>
              <v-list-item-action-text class="mt-n2">
                {{ getFeatures(c).length }} base features /
                {{ getFeatures(c, true).length }} optional
              </v-list-item-action-text>
            </v-list-item-content>
          </v-list-item>
          <!-- <v-list-item @click="selected = 'generic'">
            <v-list-item-content class="mt-n2">
              <v-list-item-title>
                <span class="text-h6 mr-1">Generic Features</span>
              </v-list-item-title>
              <v-list-item-action-text class="mt-n2">
                TODO base features / TODO optional
              </v-list-item-action-text>
            </v-list-item-content>
          </v-list-item> -->
        </v-list>
        <v-divider class="my-2" />
        <v-btn block color="secondary" @click="addNew">
          <v-icon left>mdi-plus</v-icon>
          Add New NPC Class
        </v-btn>
      </v-col>
      <v-col>
        <v-container v-if="selected && selected === 'generic'">todo</v-container>

        <v-container v-else-if="selected">
          <v-card outlined>
            <v-toolbar dense color="primary" class="white--text text-h6">
              {{ selected.name }}
            </v-toolbar>
            <v-card-text>
              <v-row dense justify="space-around" align="end">
                <v-col cols="3">
                  <id-input v-model="selected.id" />
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="selected.name" hide-details label="Name" dense />
                </v-col>
                <v-col cols="3">
                  <v-select
                    label="Role"
                    outlined
                    :items="roles"
                    v-model="selected.role"
                    dense
                    hide-details
                  />
                </v-col>
              </v-row>
              <v-row dense justify="space-around" align="center">
                <v-col cols="12">
                  <v-textarea
                    label="Short Description"
                    dense
                    outlined
                    hide-details
                    rows="2"
                    v-model="selected.info.terse"
                  />
                </v-col>
                <v-col cols="12">
                  <rich-text-editor title="Flavor" v-model="selected.info.flavor" />
                </v-col>
                <v-col cols="12">
                  <rich-text-editor title="Tactics" v-model="selected.info.tactics" />
                </v-col>
              </v-row>
              <v-divider class="mt-3 mb-5" />
              <v-row>
                <v-col
                  v-show="key !== 'size'"
                  v-for="key in Object.keys(selected.stats)"
                  :key="`stat_${key}`"
                  cols="2"
                  class="pa-1"
                >
                  <tiered-stat-input v-model="selected.stats[key]" :title="key" />
                </v-col>
                <v-col class="pa-1"><tiered-size-input v-model="selected.stats.size" /></v-col>
              </v-row>
              <v-divider class="mb-3 mt-5" />
              <v-row>
                <v-col>
                  <v-card outlined>
                    <v-toolbar dense color="grey darken-3"><b>BASE FEATURES</b></v-toolbar>
                    <v-card-text>
                      <v-row>
                        <v-col
                          v-for="(item, i) in getFeatures(selected)"
                          :key="`base_feature_${i}`"
                        >
                          <v-btn block :color="colorByType(item)" @click="openByType(item)">
                            {{ item.name }}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card outlined>
                    <v-toolbar dense color="grey darken-3"><b>OPTIONAL FEATURES</b></v-toolbar>
                    <v-card-text>
                      <v-row>
                        <v-col
                          v-for="(item, i) in getFeatures(selected, true)"
                          :key="`optional_feature_${i}`"
                        >
                          <v-btn block :color="colorByType(item)" @click="openByType(item)">
                            {{ item.name }}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn block large color="pink darken-4" @click="newFeature('traits')">
                    <v-icon left>mdi-plus</v-icon>
                    add new trait
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block large color="deep-orange darken-4" @click="newFeature('weapons')">
                    <v-icon left>mdi-plus</v-icon>
                    add new weapon
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block large color="teal darken-4" @click="newFeature('systems')">
                    <v-icon left>mdi-plus</v-icon>
                    add new system
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <div style="min-height: 50px" />
        </v-container>
        <div v-else>
          <v-row style="height: 50vh" justify="center" align="center">
            <v-col cols="auto" class="text-h2 text--disabled">Select a Class</v-col>
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
      <v-btn outlined small class="mx-1" @click="exportJson()">Export JSON File</v-btn>
      <v-btn outlined small class="mx-1" @click="importJson()">Import JSON File</v-btn>
    </v-footer>
    <div style="height: 50px" />
    <npc-system-editor
      ref="systems"
      :npcClass="selected"
      @save="saveItem($event)"
      @remove="removeItem($event)"
    />
    <npc-trait-editor
      ref="traits"
      :npcClass="selected"
      @save="saveItem($event)"
      @remove="removeItem($event)"
    />
    <npc-weapon-editor
      ref="weapons"
      :npcClass="selected"
      @save="saveItem($event)"
      @remove="removeItem($event)"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { npcRole } from '@/assets/enums'
import NpcSystemEditor from './components/_NpcSystemEditor.vue'
import NpcTraitEditor from './components/_NpcTraitEditor.vue'
import NpcWeaponEditor from './components/_NpcWeaponEditor.vue'

export default Vue.extend({
  name: 'npc-class-editor',
  components: { NpcSystemEditor, NpcTraitEditor, NpcWeaponEditor },
  computed: {
    lcp(): any {
      return this.$store.getters.lcp
    },
    classes() {
      if (!this.$store.getters.lcp.npc_classes)
        this.$set(this.$store.getters.lcp, 'npc_classes', [])
      return this.$store.getters.lcp.npc_classes
    },
  },
  data: () => ({
    roles: npcRole,
    selected: null as any,
  }),
  methods: {
    colorByType(item: any) {
      if (item.type === 'Weapon') return 'deep-orange darken-4'
      if (item.type === 'Trait') return 'pink darken-4'
      return 'teal darken-4'
    },
    openByType(item: any) {
      const type =
        item.type === 'Weapon' ? 'weapons' : item.type === 'System' ? 'systems' : 'traits'
      if (this.$refs && this.$refs[type]) {
        const r = this.$refs[type] as any
        r.edit(item)
      }
    },
    getFeatures(c: any, isOptional?: boolean) {
      if (!this.lcp.npc_features) return []
      if (c === 'generic') {
        return this.lcp.npc_features.filter((x: any) => x.origin.type === 'Generic')
      }

      const fArr = this.lcp.npc_features.filter(
        (x: any) => x.origin.type === 'Class' && x.origin.origin_id === c.id
      )

      return isOptional
        ? fArr.filter((x: any) => x.origin.optional)
        : fArr.filter((x: any) => !x.origin.optional)
    },
    addNew() {
      if (!this.lcp.npc_classes) {
        this.$set(this.lcp, 'npc_classes', [])
      }
      this.lcp.npc_classes.push({
        id: 'new',
        name: 'New Class',
        info: {
          flavor: '',
          tactics: '',
          terse: '',
        },
        stats: this.generateStatObject(),
        tables: [],
        clocks: [],
      })
    },
    newFeature(type: string) {
      if (this.$refs && this.$refs[type]) {
        const r = this.$refs[type] as any
        r.reset()
        r.open()
      }
    },
    saveItem(item: any) {
      if (!this.lcp.npc_features) this.$set(this.lcp, 'npc_features', [])
      const idx = this.lcp.npc_features.findIndex((x: any) => x.id === item.id)
      if (idx < 0) {
        this.lcp.npc_features.push(item)
      } else this.$set(this.lcp.npc_features, idx, item)
    },
    removeItem(id: string) {
      const idx = this.lcp.npc_features.findIndex((x: any) => x.id === id)
      if (idx > -1) this.lcp.npc_features.splice(idx, 1)
    },
    exportJSON() {
      const blob = new Blob([JSON.stringify(this.lcp.npc_classes)])
      const elem = window.document.createElement('a')
      elem.href = window.URL.createObjectURL(blob)
      elem.download = 'npc_classes.json'
      document.body.appendChild(elem)
      elem.click()
      document.body.removeChild(elem)
    },
    importJSON() {
      if (this.$refs.fileUpload) (this.$refs.fileUpload as HTMLElement).click()
    },
    importFile(evt: any) {
      const file = evt.target.files[0]
      const reader = new FileReader()

      reader.onload = e =>
        this.$set(this.lcp, 'npc_classes', JSON.parse(e?.target?.result?.toString() || ''))
      reader.readAsText(file)
    },
    generateStatObject() {
      return {
        armor: [0, 0, 0],
        hp: [0, 0, 0],
        evade: [0, 0, 0],
        edef: [0, 0, 0],
        heatcap: [0, 0, 0],
        speed: [0, 0, 0],
        sensor: [0, 0, 0],
        save: [0, 0, 0],
        hull: [0, 0, 0],
        agility: [0, 0, 0],
        systems: [0, 0, 0],
        engineering: [0, 0, 0],
        size: [[1], [1], [1]],
        activations: [0, 0, 0],
      }
    },
  },
})
</script>
