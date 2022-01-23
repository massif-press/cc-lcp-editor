<template>
  <v-container>
    <div class="text-h5">Utilities</div>
    <old-converter class="my-2" @emit-toast="setToast($event)" />
    <lcp-meta-form class="my-2" @emit-toast="setToast($event)" />
    <v-snackbar v-model="toast" dark :color="toastColor">
      <span v-html="toastText" />
      <template slot="action">
        <v-btn dark text @click="toast = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import LcpMetaForm from './components/LCPMetaForm.vue'
import OldConverter from './components/OldConverter.vue'

export default Vue.extend({
  components: { OldConverter, LcpMetaForm },
  name: 'util',
  data: () => ({
    toast: false,
    toastText: '',
    toastColor: '',
  }),
  methods: {
    setToast(payload: { color: string; text: string }) {
      this.toastColor = payload.color
      this.toastText = payload.text
      this.toast = true
    },
  },
})
</script>
