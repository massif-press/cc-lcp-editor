<template>
  <v-select
    label="Activation"
    :items="activationTypes"
    item-text="desc"
    hide-details
    v-model="item.activation"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { activationTypes } from '@/assets/enums'

export default Vue.extend({
  name: 'activator-selector',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    activationTypes: activationTypes,
  }),
})
</script>
