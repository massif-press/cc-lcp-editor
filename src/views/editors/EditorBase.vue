<template>
  <v-container>
    <div>
      <div class="overline">Quick Navigation</div>
      <v-btn
        v-for="(item, i) in lcp[itemKey]"
        :key="`btn${i}`"
        @click="$vuetify.goTo(`#item_${i}`)"
      >
        {{ item.name }}
      </v-btn>
    </div>
    <v-divider class="my-3" />
    <v-row>
      <v-col cols="12" v-for="(item, i) in lcp[itemKey]" :key="`item_${i}`">
        <v-card :id="`item_${i}`">
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
      class="text-center"
    >
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

function getDuplicateProperties(arr: any[], prop: string) {
  let sorted = arr.map(x => x[prop]).sort()
  let results = []
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i + 1] == sorted[i]) {
      results.push(sorted[i])
    }
  }
  return results
}

function getEmptyProperties(arr: any[], prop: string) {
  return arr.filter(x => !x[prop] || !x[prop].length)
}

export default Vue.extend({
  name: 'editor-base',
  props: ['itemKey', 'checkDupes', 'checkEmpty'],
  data: () => ({
    synergyLocations: synergyLocations,
    activationTypes: activationTypes,
  }),
  computed: {
    loaded() {
      return this.$store.getters.loaded
    },
    lcp() {
      return this.$store.getters.lcp
    },
    errors() {
      const arr: string[] = []
      if (!this.lcp[this.itemKey] || !this.lcp[this.itemKey].length) return arr

      this.checkDupes.forEach(prop => {
        getDuplicateProperties(this.lcp[this.itemKey], prop).forEach(p => {
          arr.push(`Duplicate ${prop} detected:   ${p}`)
        })
      })
      this.checkEmpty.forEach(prop => {
        getEmptyProperties(this.lcp[this.itemKey], prop).forEach(p => {
          arr.push(`Item with missing ${prop} field (${p.id || p.name || '--'})`)
        })
      })
      return arr
    },
  },
  methods: {
    addNew() {
      if (!this.lcp[this.itemKey]) this.$set(this.lcp, this.itemKey, [])
      this.lcp[this.itemKey].push({})
    },
    duplicateItem(item) {
      this.lcp[this.itemKey].push(JSON.parse(JSON.stringify(item)))
    },
    deleteItem(item) {
      this.lcp[this.itemKey].splice(
        this.lcp[this.itemKey].findIndex(x => x.id === item.id),
        1
      )
    },
    exportJson() {
      const blob = new Blob([JSON.stringify(this.lcp[this.itemKey])])
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, 'actions.json')
      } else {
        const elem = window.document.createElement('a')
        elem.href = window.URL.createObjectURL(blob)
        elem.download = 'actions.json'
        document.body.appendChild(elem)
        elem.click()
        document.body.removeChild(elem)
      }
    },
    importJson() {
      this.$refs.fileUpload.click()
    },
    importFile(evt) {
      const file = evt.target.files[0]
      const reader = new FileReader()

      reader.onload = e => console.log(this.$set(this.lcp, 'actions', JSON.parse(e.target.result)))
      reader.readAsText(file)
    },
  },
})
</script>

<style scoped>
.error-msg {
  font-size: 18px !important;
}
#rte >>> .tiptap-vuetify-editor__content {
  max-height: 200px;
}
</style>
