<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <v-list nav dense>
          <v-list-item
            v-for="(c, i) in templates"
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
                <v-col>
                  <v-text-field v-model="selected.name" hide-details label="Name" dense />
                </v-col>
              </v-row>
              <v-row dense justify="space-around" align="center">
                <v-col cols="12">
                  <rich-text-editor title="Description" v-model="selected.description" />
                </v-col>
                <v-col cols="12">
                  <rich-text-editor title="Detail" v-model="selected.detail" />
                </v-col>
              </v-row>
              <v-divider class="my-4" />
              <v-row>
                <v-col cols="12">
                  <v-row no-gutters align="center">
                    <v-col cols="auto">
                      <v-simple-checkbox
                        v-model="selected.allowOptional"
                        dense
                        hide-details
                        :ripple="false"
                      />
                    </v-col>
                    <v-col>
                      <div slot="label">
                        When choosing optional systems, the
                        <b>{{ selected.name }}</b>
                        can also choose from the
                        <b>{{ selected.name }} Features</b>
                        list.
                      </div>
                    </v-col>
                  </v-row>
                  <v-row no-gutters align="center">
                    <v-col cols="auto">
                      <v-simple-checkbox
                        v-model="selected.forceOptional"
                        dense
                        hide-details
                        :ripple="false"
                      />
                    </v-col>
                    <v-col cols="auto">
                      the
                      <b>{{ selected.name }}</b>
                      chooses
                    </v-col>
                    <v-col cols="1" class="mx-2">
                      <v-text-field
                        :value="selected.optionalMin"
                        v-model="selected.optionalMin"
                        type="number"
                        outlined
                        dense
                        hide-details
                      />
                    </v-col>
                    <v-col cols="auto">to</v-col>
                    <v-col cols="1" class="mx-2">
                      <v-text-field
                        :value="selected.optionalMax"
                        v-model="selected.optionalMax"
                        type="number"
                        outlined
                        dense
                        hide-details
                      />
                    </v-col>
                    <v-col cols="auto">
                      option(s) from the
                      <b>{{ selected.name }} Features</b>
                      list
                    </v-col>
                    <v-col class="mx-2 mt-n2">
                      <v-select
                        :value="selected.optionalPerTier"
                        v-model="selected.optionalPerTier"
                        :items="[
                          { text: 'when choosing optional systems.', value: false },
                          { text: 'per Tier.', value: true },
                        ]"
                        dense
                        hide-details
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  v-show="selected.allowOptional || selected.forceOptional"
                  cols="12"
                  class="mt-n3"
                >
                  <v-textarea
                    v-model="selected.caveat"
                    dense
                    hide-details
                    rows="1"
                    outlined
                    auto-grow
                    label="Caveat (optional)"
                  />
                </v-col>
              </v-row>
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
                    <v-toolbar dense color="grey darken-3">
                      <b>{{ selected.name }} FEATURES</b>
                    </v-toolbar>
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
      :npcTemplate="selected"
      @save="saveItem('systems', $event)"
      @remove="removeItem('systems', $event)"
    />
    <npc-trait-editor
      ref="traits"
      :npcTemplate="selected"
      @save="saveItem('traits', $event)"
      @remove="removeItem('traits', $event)"
    />
    <npc-weapon-editor
      ref="weapons"
      :npcTemplate="selected"
      @save="saveItem('weapons', $event)"
      @remove="removeItem('weapons', $event)"
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
    templates() {
      if (!this.$store.getters.lcp.npc_templates)
        this.$set(this.$store.getters.lcp, 'npc_templates', [])
      return this.$store.getters.lcp.npc_templates
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
        (x: any) => x.origin.type === 'Template' && x.origin.origin_id === c.id
      )

      return isOptional
        ? fArr.filter((x: any) => x.origin.optional)
        : fArr.filter((x: any) => !x.origin.optional)
    },
    addNew() {
      if (!this.lcp.npc_templates) {
        this.$set(this.lcp, 'npc_templates', [])
      }
      this.lcp.npc_templates.push({
        id: 'new',
        name: 'New Template',
        description: '',
        detail: '',
        allowOptional: false,
        forceOptional: false,
        optionalMin: 0,
        optionalMax: 1,
        optionalPerTier: false,
        caveat: '',
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
      const blob = new Blob([JSON.stringify(this.lcp.npc_templates)])
      const elem = window.document.createElement('a')
      elem.href = window.URL.createObjectURL(blob)
      elem.download = 'npc_templates.json'
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
        this.$set(this.lcp, 'npc_templates', JSON.parse(e?.target?.result?.toString() || ''))
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
