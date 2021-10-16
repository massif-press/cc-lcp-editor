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
      <v-col cols="5"><v-btn large block color="primary">Create New LCP</v-btn></v-col>
    </v-row>

    <v-card v-if="!loaded" :key="mKey" color="grey darken-2">
      <v-card-text class="text--disabled text-center">No LCP loaded</v-card-text>
    </v-card>

    <v-card v-else :key="mKey">
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
          <v-col cols="auto">
            <v-btn large to="editor/actions">
              Actions
              <span class="item-count">({{ catLength('actions') }})</span>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn large>
              Backgrounds
              <span class="item-count">({{ catLength('backgrounds') }})</span>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn large>
              Environments
              <span class="item-count">({{ catLength('environments') }})</span>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn large>
              Pilot Gear
              <span class="item-count">({{ catLength('pilot_gear') }})</span>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn large>
              Reserves
              <span class="item-count">({{ catLength('reserves') }})</span>
            </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn large>
              Skills
              <span class="item-count">({{ catLength('skills') }})</span>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn large>
              Statuses
              <span class="item-count">({{ catLength('statuses') }})</span>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn large>
              Tables
              <span class="item-count">({{ catLength('tables') }})</span>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn large>
              Tags
              <span class="item-count">({{ catLength('tags') }})</span>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn large>
              Talents
              <span class="item-count">({{ catLength('talents') }})</span>
            </v-btn>
          </v-col>
        </v-row>

        <v-row justify="space-around">
          <v-col cols="10">
            <v-btn x-large block>Manufacturers & Licenses</v-btn>
            <br />
            <div class="text-center mt-n4">
              {{ manuCount }} Manufacturers ({{ catLength('manufacturers') }} new) //
              {{ catLength('frames') }} Licenses, containing {{ catLength('weapons') }} Weapons,
              {{ catLength('systems') }} Systems and {{ catLength('mods') }} Weapon Mods
            </div>
          </v-col>
        </v-row>
        <v-row justify="space-around">
          <v-col cols="auto">
            <v-btn large>
              NPC Classes
              <span class="item-count">(0 Classes / 0 Features)</span>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn large>
              NPC Templates
              <span class="item-count">({{ catLength('backgrounds') }})</span>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn large>
              SITREPs
              <span class="item-count">({{ catLength('backgrounds') }})</span>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn large>
              Environments
              <span class="item-count">({{ catLength('backgrounds') }})</span>
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
import PromisifyFileReader from 'promisify-file-reader'
import _ from 'lodash'

export default Vue.extend({
  name: 'Home',
  data: () => ({
    lcpFile: null,
    error: '',
    loading: false,
  }),
  computed: {
    loaded() {
      return this.$store.getters.loaded
    },
    lcp() {
      return this.$store.getters.lcp
    },
    mKey() {
      if (this.lcp.lcp_manifest) return this.lcp.lcp_manifest.name
      return ''
    },
    manuCount() {
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
      } catch (e) {
        this.error = e.message
        this.loading = false
      }
    },
    clearLcp() {
      this.$store.dispatch('clearLcp')
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
