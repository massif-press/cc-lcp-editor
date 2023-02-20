<template>
  <v-select
    label="Synergy Locations"
    multiple
    clearable
    small-chips
    outlined
    deletable-chips
    hide-details
    :items="synergyLocations"
    v-model="item.synergy_locations"
  />
</template>

<script lang="ts">
import { synergyLocations } from '../assets/enums';

export default {
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
};
</script>
