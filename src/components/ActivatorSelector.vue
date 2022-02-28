<template>
  <v-select
    :label="`${label}${optional ? ' (Optional)' : ''}`"
    :items="activationTypes"
    item-text="desc"
    hide-details
    :clearable="optional"
    v-model="item[field]" />
</template>

<script lang="ts">
import Vue from 'vue'
import Lancer from '@tenebrae-press/lancer-types'
import { activationTypes } from '@/assets/enums'

export default Vue.extend({
  name: 'activator-selector',
  props: {
    item: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: 'Activation',
    },
    field: {
      type: String,
      required: false,
      default: 'activation',
    },
    optional: {
      type: Boolean,
    },
  },
  data: () => ({
    activationTypes: Lancer.ACTIVATION_TYPES.map(
      key => activationTypes.find(val => val.value === key)?.desc ?? key
    ),
  }),
})
</script>
