<template>
  <v-select
    label="Integrated Equipment"
    :items="equipment"
    item-title="name"
    item-value="id"
    hide-details
    multiple
    v-model="item.integrated"
  />
</template>

<script lang="ts">
import { useStore } from 'vuex';

export default {
  name: 'integrated-selector',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    equipment(): any[] {
      const lcp = useStore().getters.lcp;
      let out: any[] = [];
      out = out.concat(lcp.weapons).concat(lcp.systems);
      out = out
        .filter((x) => x && !!x.id)
        .map((x) => ({
          id: x.id,
          name: x.name || x.id,
        }));
      return out;
    },
  },
};
</script>
