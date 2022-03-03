<template>
  <v-select
    label="Synergy Locations"
    multiple
    dense
    clearable
    small-chips
    outlined
    deletable-chips
    hide-details
    :items="synergyLocations.map(x => x.value)"
    v-model="item.synergy_locations" />
</template>

<script lang="ts">
import Vue from 'vue'
import { synergyLocations } from '@/assets/enums'

export default Vue.extend({
  name: 'synergy-selector',
  props: {
    item: {
      type: Object,
      required: true,
    },
    npc: { type: Boolean },
  },
  data: () => ({
    synergyLocations: synergyLocations,
  }),
})
</script>
