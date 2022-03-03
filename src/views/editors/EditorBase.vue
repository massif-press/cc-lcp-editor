<template>
  <v-container>
    <div class="overline">Quick Navigation</div>
    <v-row no-gutters justify="space-around" align="center">
      <v-col v-for="(item, i) in lcpContentKey(itemKey)" :key="`btn${String(i)}`" cols="auto">
        <v-btn text @click="$vuetify.goTo(`#item_${i}`)">
          {{ item.name }}
        </v-btn>
      </v-col>
    </v-row>
    <v-divider class="my-3" />
    <v-row>
      <v-col cols="12" v-for="(item, i) in lcpContentKey(itemKey)" :key="`item_${String(i)}`">
        <v-card :id="`item_${String(i)}`">
          <slot :item="item" />
          <v-card-actions>
            <v-spacer />
            <v-btn @click="duplicateItem(item)">Duplicate</v-btn>
            <v-btn color="error darken-2" @click="deleteItem(item)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="my-3" />
    <div class="px-8">
      <v-btn color="primary darken-2" block x-large @click="addNew">
        <v-icon large>mdi-plus</v-icon>
        Add New
      </v-btn>
    </div>
    <v-divider class="my-3" />
    <v-alert
      :icon="errors.length ? 'mdi-alert' : 'mdi-check'"
      prominent
      :color="errors.length ? 'error darken-2' : 'success darken-2'"
      class="text-center">
      <code class="error-msg">
        <span v-html="errors.length ? errors.join('<br>') : 'No errors detected!'" />
      </code>
    </v-alert>
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
import Vue from 'vue'
import { synergyLocations, activationTypes } from '@/assets/enums'
import { ILCPContent, LCPContentKeys } from '@tenebrae-press/lancer-types'

function getDuplicateProperties(arr: Record<string, unknown>[], prop: string) {
  let sorted = arr.map(x => x[prop]).sort()
  let results = []
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i + 1] == sorted[i]) {
      results.push(sorted[i])
    }
  }
  return results
}

function getEmptyProperties(arr: Array<Record<string, unknown>>, prop: string) {
  return arr.filter(x => !x[prop] || !(x[prop] as []).length)
}

export default Vue.extend({
  name: 'editor-base',
  props: {
    itemKey: {
      type: String as () => LCPContentKeys,
    },
    checkDupes: { type: Array as () => Array<string> },
    checkEmpty: { type: Array as () => Array<string> },
  },
  data: () => ({
    synergyLocations: synergyLocations,
    activationTypes: activationTypes,
  }),
  computed: {
    loaded(): boolean {
      return this.$store.getters.loaded
    },
    lcp(): ILCPContent {
      return this.$store.getters.lcp
    },
    errors(): string[] {
      const arr: string[] = []
      if (!this.lcp[this.itemKey] || !this.lcp[this.itemKey]?.length) return arr

      let content: Array<Record<string, unknown>> = this.lcp[this.itemKey] ?? []

      this.checkDupes.forEach((prop: string) => {
        getDuplicateProperties(content, prop).forEach(p => {
          arr.push(`Duplicate ${prop} detected:   ${p}`)
        })
      })
      this.checkEmpty.forEach((prop: string) => {
        getEmptyProperties(content, prop).forEach(p => {
          arr.push(`Item with missing ${prop} field (${p.id || p.name || '--'})`)
        })
      })
      return arr
    },
  },
  methods: {
    lcpContentKey(key: LCPContentKeys): Array<{ id?: string; name?: string }> {
      return this.lcp[key] ?? []
    },
    addNew() {
      if (!this.lcp[this.itemKey]) {
        this.$set(this.lcp, this.itemKey, [])
      }

      ;(this.lcp[this.itemKey] as unknown as unknown[]).push({} as unknown)
    },
    duplicateItem(item: { id?: string }) {
      ;(this.lcp[this.itemKey] as unknown as unknown[]).push(JSON.parse(JSON.stringify(item)))
    },
    deleteItem(item: { id?: string }) {
      ;(this.lcp[this.itemKey] as unknown as Array<{ id: string }>).splice(
        (this.lcp[this.itemKey] as unknown as Array<{ id: string }>).findIndex(
          x => x.id === item.id
        ),
        1
      )
    },
    exportJson() {
      const blob = new Blob([JSON.stringify(this.lcp[this.itemKey])])
      const elem = window.document.createElement('a')
      elem.href = window.URL.createObjectURL(blob)
      elem.download = `${this.itemKey}.json`
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
        this.$set(this.lcp, this.itemKey, JSON.parse(e?.target?.result?.toString() || ''))
      reader.readAsText(file)
    },
  },
})
</script>

<style scoped>
.error-msg {
  font-size: 18px !important;
}
</style>
