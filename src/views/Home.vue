<template>
  <v-container>
    <v-row justify="space-around" align="center" class="mb-3">
      <v-col cols="5">
        <v-file-input
          v-model="lcpFile"
          filled
          color="primary"
          label="Load LCP"
          show-size
          hide-details
          @click:clear="clearLcp()"
          @change="loadLcp($event)"
        />
      </v-col>
      <v-col cols="5">
        <v-btn large block color="primary" @click="createNew">Create New LCP</v-btn>
      </v-col>
    </v-row>

    <v-card v-if="!loaded" :key="loaded" color="grey darken-2">
      <v-card-text class="text--disabled text-center">No LCP loaded</v-card-text>
    </v-card>

    <v-card v-else :key="loaded">
      <v-toolbar dense color="pink darken-3" dark>
        <span class="text-h4">{{ lcp.lcp_manifest.name }}</span>
      </v-toolbar>
      <v-card-text>
        <v-alert outlined text color="primary">
          <div class="text-h5">LCP Manifest</div>
          <v-row dense justify="space-around">
            <v-col cols="3"><v-text-field v-model="lcp.lcp_manifest.name" label="Name" /></v-col>
            <v-col cols="3">
              <v-text-field v-model="lcp.lcp_manifest.author" label="Author" />
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="lcp.lcp_manifest.item_prefix" label="Item ID Prefix" />
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="lcp.lcp_manifest.version" label="LCP Version" />
            </v-col>
            <v-col cols="5">
              <v-text-field v-model="lcp.lcp_manifest.website" label="Website URL" />
            </v-col>
            <v-col cols="5">
              <v-text-field v-model="lcp.lcp_manifest.image_url" label="Preview Image URL" />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="lcp.lcp_manifest.description"
                outlined
                auto-grow
                rows="3"
                label="Description"
              />
            </v-col>
          </v-row>
        </v-alert>
        <div class="text-h6 mb-2">LCP Contents:</div>
        <v-row justify="space-around">
          <v-col cols="10">
            <v-btn x-large block>Manufacturers & Licenses</v-btn>
            <br />
            <div class="text-center mt-n4">
              {{ manuCount }} Manufacturers ({{ catLength('manufacturers') }} new) with
              {{ catLength('frames') }} Licenses, containing {{ catLength('weapons') }} Weapons,
              {{ catLength('systems') }} Systems and {{ catLength('mods') }} Weapon Mods
            </div>
          </v-col>
        </v-row>

        <v-row justify="space-around">
          <v-col v-for="(t, i) in categories" :key="`player_btn_${i}`" cols="2">
            <v-btn large block :to="`editor/${t}`">
              {{ t.replace('_', ' ') }}
              <span class="item-count">({{ catLength(t) }})</span>
            </v-btn>
          </v-col>
        </v-row>

        <v-row justify="space-around">
          <v-col v-for="(t, i) in gmCategories" :key="`gm_btn_${i}`" cols="2">
            <v-btn large block :to="`editor/${t}`" disabled>
              {{ t.replace('_', ' ') }}
              <span class="item-count">({{ catLength(t) }})</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider class="my-2" />
      <v-card-actions>
        <v-spacer />
        <v-btn color="success">Export LCP</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import _ from 'lodash'
import PromisifyFileReader from 'promisify-file-reader'

export default Vue.extend({
  name: 'Home',
  data: () => ({
    lcpFile: null,
    error: '',
    loading: false,
    categories: [
      'actions',
      'backgrounds',
      'pilot_gear',
      'reserves',
      'skills',
      'statuses',
      'tables',
      'tags',
      'talents',
      'sitreps',
      'environments',
    ],
    gmCategories: ['npc_classes', 'npc_templates', 'eidolon_shells'],
  }),
  computed: {
    loaded(): boolean {
      return this.$store.getters.loaded
    },
    lcp(): any {
      return this.$store.getters.lcp
    },
    manuCount(): number {
      if (!this.lcp.manufacturers && !this.lcp.frames) return 0
      const m = this.lcp.manufacturers?.length || 0
      const f = this.lcp.frames ? _.uniq(this.lcp.frames.map((x: any) => x.source)).length : 0
      return m + f
    },
  },
  methods: {
    catLength(type: string) {
      if (this.lcp[type]) return this.lcp[type].length
      return 0
    },

    async loadLcp(file: HTMLInputElement) {
      const ext = file.name.split('.').pop()
      if (ext !== 'lcp' && ext !== 'zip') {
        this.error = 'This file is not in the correct format (.zip or .lcp)'
      }

      this.loading = true
      this.error = ''

      if (!file) return

      const fileData = await PromisifyFileReader.readAsBinaryString(file)
      try {
        this.$store.dispatch('loadLcp', fileData).then(() => {
          this.loading = false
        })
      } catch (e: any) {
        this.error = e.message
        this.loading = false
      }
    },
    clearLcp() {
      this.$store.dispatch('clearLcp')
    },
    createNew() {
      this.$store.dispatch('newLcp')
    },
  },
})
</script>

<style scoped>
.item-count {
  font-size: 12px;
  font-weight: 100;
  margin-left: 4px;
}
</style>
