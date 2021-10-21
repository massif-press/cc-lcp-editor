<template>
  <v-select
    label="Special Equipment"
    :items="equipment"
    item-text="name"
    item-value="id"
    outlined
    dense
    hide-details
    v-model="item.special_equipment"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'special-equipment-selector',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    equipment(): any[] {
      const lcp = this.$store.getters.lcp
      let out: any[] = []
      out = out
        .concat(lcp.pilot_gear)
        .concat(lcp.frames)
        .concat(lcp.weapons)
        .concat(lcp.systems)
        .concat(lcp.mods)
      out = out
        .filter(x => x && !!x.id)
        .map(x => ({
          id: x.id,
          name: x.name || x.id,
        }))
      return out
    },
  },
})
</script>
