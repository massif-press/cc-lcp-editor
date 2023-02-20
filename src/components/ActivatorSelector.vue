<template>
  <div>
    <v-select
      :label="`${label}${optional ? ' (Optional)' : ''}`"
      :items="activationTypes"
      hide-details
      :clearable="optional"
      v-model="item[field]"
    />
  </div>
</template>

<script lang="ts">
import { activationTypes } from '../assets/enums';

export default {
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
    activationTypes: activationTypes,
  }),
};
</script>
