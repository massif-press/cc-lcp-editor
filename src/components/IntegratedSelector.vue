<template>
  <v-select
    label="Integrated Equipment"
    :items="equipment"
    item-text="name"
    item-value="id"
    outlined
    dense
    hide-details
    multiple
    v-model="item.integrated" />
</template>

<script lang="ts">
import { IMechSystemData, IMechWeaponData } from '@tenebrae-press/lancer-types'
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
    equipment(): Array<IMechWeaponData | IMechSystemData> {
      const lcp = this.$store.getters.lcp
      let out: Array<IMechWeaponData | IMechSystemData> = []
      out = out.concat(lcp.weapons).concat(lcp.systems)
      out = out
        .filter(x => x && !!x.id)
        .map(x => ({
          ...x,
          id: x.id,
          name: x.name || x.id,
        }))
      return out
    },
  },
})
</script>
