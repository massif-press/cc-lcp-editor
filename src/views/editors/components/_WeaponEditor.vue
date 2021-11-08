<template>
  <v-dialog v-model="dialog" fullscreen>
    <v-card>
      <v-toolbar dense color="deep-purple darken-4" class="text-h6">
        {{ manufacturer ? manufacturer.id : '' }} Weapon Editor
        <v-spacer />
        <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row justify="space-around" align="end">
          <v-col>
            <id-input v-model="id" />
          </v-col>
          <v-col cols="4">
            <v-text-field label="Name" hide-details v-model="name" />
          </v-col>
          <v-col>
            <v-select label="Size" :items="weaponSizes" hide-details v-model="mount" />
          </v-col>
          <v-col>
            <v-select label="Type" :items="weaponTypes" hide-details v-model="type" />
          </v-col>
          <v-col>
            <v-combobox v-model="license" label="License" dense hide-details :items="licenses" />
          </v-col>
          <v-col>
            <v-text-field
              label="License Level"
              type="number"
              hide-details
              outlined
              dense
              v-model="license_level"
            />
          </v-col>
          <v-col>
            <v-text-field label="SP Cost" type="number" hide-details outlined dense v-model="sp" />
          </v-col>
          <v-col>
            <v-text-field
              label="Use Cost"
              type="number"
              hide-details
              outlined
              dense
              v-model="cost"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <rich-text-editor title="Description" v-model="description" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <rich-text-editor title="Effect" v-model="effect" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <rich-text-editor title="On Attack Effect" v-model="on_attack" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <rich-text-editor title="On Hit Effect" v-model="on_hit" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <rich-text-editor title="On Crit Effect" v-model="on_crit" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <damage-selector :item="this" />
          </v-col>
          <v-col>
            <range-selector :item="this" />
          </v-col>
        </v-row>

        <v-row dense justify="space-around">
          <v-col cols="auto">
            <v-switch dense hide-details label="Allow Barrage" v-model="barrage" />
          </v-col>
          <v-col cols="auto">
            <v-switch dense hide-details label="Allow Skirmish" v-model="skirmish" />
          </v-col>
        </v-row>
        <v-row dense justify="space-around">
          <v-col cols="auto">
            <v-switch dense hide-details label="Prohibit Attack Action" v-model="no_attack" />
          </v-col>
          <v-col cols="auto">
            <v-switch dense hide-details label="Prohibit Attached Mods" v-model="no_mods" />
          </v-col>
          <v-col cols="auto">
            <v-switch
              dense
              hide-details
              label="Ignore Core Bonus Effects"
              v-model="no_core_bonus"
            />
          </v-col>
          <v-col cols="auto">
            <v-switch dense hide-details label="Ignore Bonus Effects" v-model="no_bonus" />
          </v-col>
          <v-col cols="auto">
            <v-switch dense hide-details label="Ignore Synergies" v-model="no_synergy" />
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col><i-action-builder :item="this" /></v-col>
          <v-col><i-bonus-builder :item="this" /></v-col>
          <v-col><i-deployable-builder :item="this" /></v-col>
        </v-row>
        <v-row align="center">
          <v-col><i-synergy-builder :item="this" /></v-col>
          <v-col><i-counter-builder :item="this" /></v-col>
          <v-col><integrated-selector :item="this" /></v-col>
          <v-col><special-equipment-selector :item="this" /></v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <tag-selector :item="this" />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col><i-profile-builder :item="this" /></v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn text color="error" @click="dialog = false">cancel</v-btn>
        <v-spacer />
        <v-btn v-if="isEdit" color="error darken-2" @click="remove">Delete</v-btn>
        <v-btn color="success darken-2" :disabled="!confirmOK" @click="submit">
          {{ isEdit ? 'save' : 'confirm' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { weaponType, weaponSize } from '@/assets/enums'

import IProfileBuilder from '@/components/IProfileBuilder.vue'

import Vue from 'vue'
export default Vue.extend({
  name: 'weapon-editor',
  props: {
    manufacturer: { type: Object, required: false },
    licenses: { type: Array, required: false, default: () => [] },
  },
  components: {
    IProfileBuilder,
  },
  data: () => ({
    dialog: false,
    weaponTypes: weaponType,
    weaponSizes: weaponSize,
    id: '',
    name: '',
    license: '',
    license_level: 1,
    description: '',
    effect: '',
    on_attack: '',
    on_hit: '',
    on_crit: '',
    mount: 'Aux',
    type: 'Melee',
    cost: 1,
    barrage: true,
    skirmish: true,
    no_attack: false,
    no_mods: false,
    no_core_bonus: false,
    no_bonus: false,
    no_synergy: false,
    damage: [],
    range: [],
    sp: 0,
    tags: [],
    actions: [],
    bonuses: [],
    synergies: [],
    deployables: [],
    counters: [],
    integrated: [],
    special_equipment: [],
    profiles: [],
    isEdit: false,
  }),
  computed: {
    confirmOK(): boolean {
      return !!this.id && !!this.name && !!this.mount
    },
    source(): string {
      if (this.manufacturer) return this.manufacturer.id
      if (this.tags.some((x: any) => x.id === 'tg_exotic')) return 'EXOTIC'
      return ''
    },
  },
  methods: {
    open() {
      this.dialog = true
    },
    close() {
      this.dialog = false
    },
    submit(): void {
      const e = {
        id: this.id,
        name: this.name,
        source: this.source,
        license: this.license,
        license_level: Number(this.license_level),
        description: this.description,
        effect: this.effect,
        on_attack: this.on_attack,
        on_hit: this.on_hit,
        on_crit: this.on_crit,
        mount: this.mount,
        type: this.type,
        cost: this.cost,
        barrage: this.barrage,
        skirmish: this.skirmish,
        no_attack: this.no_attack,
        no_mods: this.no_mods,
        no_core_bonus: this.no_core_bonus,
        no_bonus: this.no_bonus,
        no_synergy: this.no_synergy,
        damage: this.damage,
        range: this.range,
        sp: this.sp,
        tags: this.tags,
        actions: this.actions,
        bonuses: this.bonuses,
        synergies: this.synergies,
        deployables: this.deployables,
        counters: this.counters,
        integrated: this.integrated,
        special_equipment: this.special_equipment,
        profiles: this.profiles,
      }
      this.$emit('save', e)
      this.reset()
      this.dialog = false
    },
    edit(weapon: any): void {
      this.id = weapon.id
      this.name = weapon.name
      this.license = weapon.license
      this.license_level = Number(weapon.license_level)
      this.description = weapon.description
      this.effect = weapon.effect
      this.on_attack = weapon.on_attack
      this.on_hit = weapon.on_hit
      this.on_crit = weapon.on_crit
      this.mount = weapon.mount
      this.type = weapon.type
      this.cost = weapon.cost
      this.barrage = weapon.barrage
      this.skirmish = weapon.skirmish
      this.no_attack = weapon.no_attack
      this.no_mods = weapon.no_mods
      this.no_core_bonus = weapon.no_core_bonus
      this.no_bonus = weapon.no_bonus
      this.no_synergy = weapon.no_synergy
      this.damage = weapon.damage
      this.range = weapon.range
      this.sp = weapon.sp
      this.tags = weapon.tags
      this.actions = weapon.actions
      this.bonuses = weapon.bonuses
      this.synergies = weapon.synergies
      this.deployables = weapon.deployables
      this.counters = weapon.counters
      this.integrated = weapon.integrated
      this.special_equipment = weapon.special_equipment
      this.profiles = weapon.profiles
      this.isEdit = true
      this.dialog = true
    },
    remove(): void {
      this.$emit('remove', this.id)
      this.dialog = false
    },
    reset(): void {
      this.id = ''
      this.name = ''
      this.license = ''
      this.license_level = 1
      this.description = ''
      this.effect = ''
      this.on_attack = ''
      this.on_hit = ''
      this.on_crit = ''
      this.mount = 'Aux'
      this.type = 'Melee'
      this.cost = 1
      this.barrage = true
      this.skirmish = true
      this.no_attack = false
      this.no_mods = false
      this.no_core_bonus = false
      this.no_bonus = false
      this.no_synergy = false
      this.damage = []
      this.range = []
      this.sp = 0
      this.tags = []
      this.actions = []
      this.bonuses = []
      this.synergies = []
      this.deployables = []
      this.counters = []
      this.integrated = []
      this.special_equipment = []
      this.profiles = []
      this.isEdit = false
    },
  },
})
</script>
