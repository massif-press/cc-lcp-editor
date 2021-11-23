<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <v-list nav dense>
          <v-list-item
            v-for="(s, i) in shells"
            :key="`${s.id || 'new'}_${i}`"
            :class="selected && selected.id === s.id ? 'primary darken-3' : ''"
            selectable
            @click="selected = s"
          >
            <v-list-item-content>
              <v-list-item-title>
                <span class="text-h6">{{ s.name }}</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider class="my-2" />
        <v-btn block color="secondary" @click="addNew">
          <v-icon left>mdi-plus</v-icon>
          Add New Eidolon Shell
        </v-btn>
      </v-col>
      <v-col>
        <v-container v-if="selected">
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
                <v-col cols="12">
                  <rich-text-editor title="Reported Appearances" v-model="selected.appearance" />
                </v-col>
                <v-col cols="12">
                  <rich-text-editor title="Hints" v-model="selected.hints" />
                </v-col>
                <v-col cols="12">
                  <rich-text-editor title="Rules" v-model="selected.rules" />
                </v-col>
              </v-row>
              <v-divider class="mt-3 mb-5" />
              <v-row>
                <v-col>
                  <v-card outlined>
                    <v-toolbar dense color="grey darken-3"><b>Systems</b></v-toolbar>
                    <v-card-text>
                      <v-row>
                        <v-col v-for="(item, i) in selected.features" :key="`base_feature_${i}`">
                          <v-btn block :color="colorByType(item)" @click="openByType(item)">
                            {{ item.name }}
                          </v-btn>
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
                          <v-btn
                            block
                            large
                            color="deep-orange darken-4"
                            @click="newFeature('weapons')"
                          >
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
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card outlined>
                    <v-toolbar dense color="grey darken-3"><b>Shards</b></v-toolbar>
                    <v-card-text>
                      <v-row dense align="center">
                        <v-col class="text-h6">New Shards</v-col>
                        <v-col cols="1">
                          <v-text-field
                            v-model="selected.shard_count[0]"
                            type="number"
                            dense
                            hide-details
                            outlined
                            label="T1"
                          />
                        </v-col>
                        <v-col cols="1">
                          <v-text-field
                            v-model="selected.shard_count[1]"
                            type="number"
                            dense
                            hide-details
                            outlined
                            label="T2"
                          />
                        </v-col>
                        <v-col cols="1">
                          <v-text-field
                            v-model="selected.shard_count[2]"
                            type="number"
                            dense
                            hide-details
                            outlined
                            label="T3"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <rich-text-editor title="Shard Rules" v-model="selected.shard_rules" />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          v-for="(item, i) in selected.shard_features"
                          :key="`optional_feature_${i}`"
                        >
                          <v-btn block :color="colorByType(item)" @click="openByType(item)">
                            {{ item.name }}
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-btn
                            block
                            large
                            color="pink darken-4"
                            @click="newShardFeature('traits')"
                          >
                            <v-icon left>mdi-plus</v-icon>
                            add new trait
                          </v-btn>
                        </v-col>
                        <v-col>
                          <v-btn
                            block
                            large
                            color="deep-orange darken-4"
                            @click="newShardFeature('weapons')"
                          >
                            <v-icon left>mdi-plus</v-icon>
                            add new weapon
                          </v-btn>
                        </v-col>
                        <v-col>
                          <v-btn
                            block
                            large
                            color="teal darken-4"
                            @click="newShardFeature('systems')"
                          >
                            <v-icon left>mdi-plus</v-icon>
                            add new system
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <div style="min-height: 50px" />
        </v-container>
        <div v-else>
          <v-row style="height: 50vh" justify="center" align="center">
            <v-col cols="auto" class="text-h2 text--disabled">Select a Shell</v-col>
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
    shells() {
      if (!this.$store.getters.lcp.eidolon_shells)
        this.$set(this.$store.getters.lcp, 'eidolon_shells', [])
      return this.$store.getters.lcp.eidolon_shells
    },
  },
  data: () => ({
    selected: null as any,
    addAsShard: false,
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
    addNew() {
      if (!this.lcp.eidolon_shells) {
        this.$set(this.lcp, 'eidolon_shells', [])
      }
      this.lcp.eidolon_shells.push({
        id: 'new',
        name: 'New Shell',
        appearance: '',
        hints: '',
        rules: '',
        features: [],
        shard_count: [0, 0, 0],
        shard_rules: '',
        shard_features: [],
      })
    },
    newFeature(type: string) {
      this.addAsShard = false
      if (this.$refs && this.$refs[type]) {
        const r = this.$refs[type] as any
        r.reset()
        r.open()
      }
    },
    newShardFeature(type: string) {
      this.addAsShard = true
      if (this.$refs && this.$refs[type]) {
        const r = this.$refs[type] as any
        r.reset()
        r.open()
      }
    },
    saveItem(item: any) {
      const key = this.addAsShard ? 'shard_features' : 'features'
      const idx = this.selected[key].findIndex((x: any) => x.id === item.id)
      if (idx < 0) {
        this.selected[key].push(item)
      } else this.$set(this.selected[key], idx, item)
    },
    removeItem(id: string) {
      const key = this.addAsShard ? 'shard_features' : 'features'
      const idx = this.selected[key].findIndex((x: any) => x.id === id)
      if (idx > -1) this.selected[key].splice(idx, 1)
    },
    exportJSON() {
      const blob = new Blob([JSON.stringify(this.lcp.eidolon_shells)])
      const elem = window.document.createElement('a')
      elem.href = window.URL.createObjectURL(blob)
      elem.download = 'eidolon_shells.json'
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
        this.$set(this.lcp, 'eidolon_shells', JSON.parse(e?.target?.result?.toString() || ''))
      reader.readAsText(file)
    },
  },
})
</script>
