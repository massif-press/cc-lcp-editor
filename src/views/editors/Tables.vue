<template>
  <v-container>
    <v-card v-for="t in tables" :key="t.key" outlined class="my-5">
      <v-toolbar dense color="primary darken-2" class="text-h6">{{ t.name }}</v-toolbar>
      <div class="caption text-right">{{ t.location }}</div>
      <v-card-text>
        <v-row dense v-for="(item, i) in lcpTables(t.key)" :key="`item_${t.key}_${i}`">
          <v-col>
            <v-text-field v-model="lcpTables(t.key)[i]" dense hide-details outlined />
          </v-col>
          <v-col cols="auto">
            <v-btn icon color="error" @click="deleteItem(t.key, i)">
              <v-icon large>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="addNew(t.key)">
          <v-icon left>mdi-plus</v-icon>
          Add New
        </v-btn>
      </v-card-actions>
    </v-card>

    <div id="end" style="min-height: 100px" />
    <v-footer fixed>
      <v-btn text to="/">
        <v-icon>mdi-chevron-left</v-icon>
        back
      </v-btn>
      <v-spacer />
      <v-btn icon @click="$vuetify.goTo(0)">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <v-btn icon @click="$vuetify.goTo('#end')">
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
      <v-spacer />
      <input ref="fileUpload" type="file" accept=".json" hidden @change="importFile" />
      <v-btn outlined small class="mx-1" @click="exportJson()">Export JSON File</v-btn>
      <v-btn outlined small class="mx-1" @click="importJson()">Import JSON File</v-btn>
    </v-footer>
  </v-container>
</template>

<script lang="ts">
import { ILCPContent } from '@tenebrae-press/lancer-types'
import Vue from 'vue'

export default Vue.extend({
  name: 'table-editor',
  props: ['itemKey', 'checkDupes', 'checkEmpty'],
  data: () => ({
    tables: [
      {
        key: 'pilot_names',
        name: 'Pilot Names',
        location: 'Pilot names, rollable on the first Create New Pilot screen',
      },
      {
        key: 'pilot_callsigns',
        name: 'Pilot Callsigns',
        location: 'Pilot callsigns, rollable on the first Create New Pilot screen',
      },
      {
        key: 'mech_names',
        name: 'Mech Names',
        location: 'Mech names, rollable on the Add New Mech to Hangar screen',
      },
      {
        key: 'quirks',
        name: 'Quirks',
        location: 'Rollable Quirks table for Flash Cloned pilots',
      },
    ],
  }),
  computed: {
    loaded(): boolean {
      return this.$store.getters.loaded
    },
    lcp(): ILCPContent {
      return this.$store.getters.lcp
    },
  },
  created() {
    if (!this.lcp.tables) {
      const newTables: Record<string, Array<string>> = {}
      for (const { key } of this.tables) {
        newTables[key] = []
      }
      this.$set(this.lcp, 'tables', newTables)
    } else {
      for (const { key } of this.tables) {
        this.lcp.tables[key] = []
      }
    }
  },
  methods: {
    lcpTables(key: string): Array<string> {
      return this.lcp.tables?.[key] ?? []
    },
    addNew(key: string) {
      this.lcp.tables?.[key].push('')
    },
    deleteItem(key: string, index: number) {
      this.lcp.tables?.[key].splice(index, 1)
    },
    exportJson() {
      const blob = new Blob([JSON.stringify(this.lcp.tables)])
      const elem = window.document.createElement('a')
      elem.href = window.URL.createObjectURL(blob)
      elem.download = 'tables.json'
      document.body.appendChild(elem)
      elem.click()
      document.body.removeChild(elem)
    },
    importJson() {
      if (this.$refs.fileUpload) (this.$refs.fileUpload as HTMLElement).click()
    },
    importFile(evt: Event) {
      const file = (evt.target as HTMLInputElement).files?.item(0)
      if (!file) return
      const reader = new FileReader()

      reader.onload = e =>
        this.$set(this.lcp, 'tables', JSON.parse(e?.target?.result?.toString() || ''))
      reader.readAsText(file)
    },
  },
})
</script>
