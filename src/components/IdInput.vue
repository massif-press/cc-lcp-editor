<template>
  <v-text-field
    label="ID"
    hide-details
    v-model="val"
    prepend-icon="mdi-dice-6"
    @click:prepend="uuid"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import uuid from 'uuid/v4'

export default Vue.extend({
  name: 'id-entry',
  props: ['value'],
  computed: {
    val: {
      get() {
        const self = this as any
        return self.value
      },
      set(val) {
        const self = this as any
        self.$emit('input', val)
      },
    },
  },
  methods: {
    uuid(): void {
      this.$set(this, 'val', uuid())
    },
  },
})
</script>
