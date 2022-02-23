<template>
  <v-select
    label="Special Equipment"
    :items="equipment"
    item-text="name"
    item-value="id"
    outlined
    dense
    hide-details
    multiple
    v-model="item.special_equipment" />
</template>

<script lang="ts">
import {
  ICoreSystemData,
  IFrameData,
  IMechSystemData,
  IMechWeaponData,
  INpcWeaponData,
  IPilotArmorData,
  IPilotWeaponData,
  IWeaponModData,
} from '@tenebrae-press/lancer-types'
import Vue from 'vue'

type SpecialEquipmentArray = Array<
  | IPilotArmorData
  | IPilotWeaponData
  | IFrameData
  | IMechWeaponData
  | INpcWeaponData
  | IMechSystemData
  | ICoreSystemData
  | IWeaponModData
>

export default Vue.extend({
  name: 'special-equipment-selector',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    equipment(): SpecialEquipmentArray {
      const lcp = this.$store.getters.lcp
      let out: SpecialEquipmentArray = []
      out = out
        .concat(lcp.pilot_gear)
        .concat(lcp.frames)
        .concat(lcp.weapons)
        .concat(lcp.systems)
        .concat(lcp.mods)
      out = out
        .filter(x => x && !!x.id)
        .map(x => ({
          ...x,
          id: x.id,
          name: x.name || x.id,
        })) as SpecialEquipmentArray
      return out
    },
  },
})
</script>
