<template>
  <v-container>
    <div class="text-h5">Utilities</div>
    <v-card>
      <v-toolbar dense>Old-format NPC Converter</v-toolbar>
      <v-card-text>
        <p>
          Load an LCP containing old (pre-2.3x) data. This tool will attempt to convert only the NPC
          data into the new (2.3x+) format and then will save a new LCP. It is
          <b>strongly recommended</b>
          this new package is loaded into the editor and double-checked for consistency.
        </p>
        <v-file-input
          v-model="converterFile"
          color="primary"
          label="Load Old LCP"
          accept=".lcp,.zip"
          show-size
          hide-details
          outlined
          clearable
          :loading="loading"
          @change="loadConverter($event)"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import PromisifyFileReader from 'promisify-file-reader'
import * as converter from '@/utilities/old_converter'

export default Vue.extend({
  name: 'util',
  data: () => ({
    loading: false,
    converterFile: null,
  }),
  methods: {
    async loadConverter(file: HTMLInputElement): Promise<void> {
      if (!file) return
      this.loading = true
      const fileData = await PromisifyFileReader.readAsBinaryString(file)
      try {
        await converter.convert(fileData).then(() => console.log('all done'))
        this.loading = false
      } catch (e: any) {
        console.error(e)
        this.loading = false
      }
    },
  },
})
</script>
