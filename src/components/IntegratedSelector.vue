<template>
  <v-select
    label="Integrated Equipment"
    :items="equipment"
    item-text="name"
    item-value="id"
    outlined
    dense
    hide-details
    v-model="item.integrated"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'integrated-selector',
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
      out = out.concat(lcp.weapons).concat(lcp.systems)
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
