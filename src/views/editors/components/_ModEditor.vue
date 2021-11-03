<template>
  <v-dialog v-model="dialog" fullscreen>
    <v-card>
      <v-toolbar dense color="deep-purple darken-4" class="text-h6">
        {{ manufacturer ? manufacturer.id : '' }} Weapon Mod Editor
        <v-spacer />
        <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row justify="space-around" align="end">
          <v-col>
            <v-text-field label="ID" hide-details v-model="id" />
          </v-col>
          <v-col>
            <v-text-field label="Name" hide-details v-model="name" />
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
        </v-row>
        <v-row>
          <v-col>
            <rich-text-editor title="Effect" v-model="effect" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <rich-text-editor title="Description" v-model="description" />
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

        <v-divider class="my-3" />
        <div class="text-h6">ALLOWED:</div>
        <div class="overline mt-n3 font-weight-light">Leave empty to allow all values</div>
        <v-row align="center">
          <v-col>
            <v-select
              v-model="allowed_types"
              :items="weaponType"
              dense
              outlined
              multiple
              hide-details
              label="Allowed Weapon Types"
            />
          </v-col>
          <v-col>
            <v-select
              v-model="allowed_sizes"
              :items="weaponSize"
              dense
              outlined
              multiple
              hide-details
              label="Allowed Weapon Sizes"
            />
          </v-col>
        </v-row>
        <div class="text-h6">RESTRICTED:</div>
        <div class="overline mt-n3 font-weight-light">RESTRICTED takes precedence over ALLOWED</div>
        <v-row align="center">
          <v-col>
            <v-select
              v-model="restricted_types"
              :items="weaponType"
              dense
              outlined
              multiple
              hide-details
              label="Restricted Weapon Types"
            />
          </v-col>
          <v-col>
            <v-select
              v-model="restricted_sizes"
              :items="weaponSize"
              dense
              outlined
              multiple
              hide-details
              label="Restricted Weapon Sizes"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="caption mb-2">ADDED DAMAGE</div>
            <damage-selector :item="added" />
          </v-col>
          <v-col>
            <div class="caption mb-2">ADDED RANGE</div>
            <range-selector :item="added" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="caption mb-2">ADDED TAGS</div>
            <tag-selector :item="added" />
          </v-col>
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
import RichTextEditor from '@/components/RichTextEditor.vue'
import IActionBuilder from '@/components/IActionBuilder.vue'
import IBonusBuilder from '@/components/IBonusBuilder.vue'
import ISynergyBuilder from '@/components/ISynergyBuilder.vue'
import IDeployableBuilder from '@/components/IDeployableBuilder.vue'
import ICounterBuilder from '@/components/ICounterBuilder.vue'
import IntegratedSelector from '@/components/IntegratedSelector.vue'
import SpecialEquipmentSelector from '@/components/SpecialEquipmentSelector.vue'
import TagSelector from '@/components/TagSelector.vue'
import DamageSelector from '@/components/DamageSelector.vue'
import RangeSelector from '@/components/RangeSelector.vue'

import Vue from 'vue'
export default Vue.extend({
  name: 'mod-editor',
  props: {
    manufacturer: { type: Object, required: false },
    licenses: { type: Array, required: false, default: () => [] },
  },
  components: {
    RichTextEditor,
    IActionBuilder,
    IBonusBuilder,
    ISynergyBuilder,
    IDeployableBuilder,
    ICounterBuilder,
    IntegratedSelector,
    SpecialEquipmentSelector,
    TagSelector,
    DamageSelector,
    RangeSelector,
  },
  data: () => ({
    dialog: false,
    weaponType: weaponType,
    weaponSize: weaponSize,
    id: '',
    name: '',
    license: '',
    license_level: 1,
    effect: '',
    sp: '',
    description: '',
    allowed_types: [],
    allowed_sizes: [],
    restricted_types: [],
    restricted_sizes: [],
    tags: [],
    actions: [],
    bonuses: [],
    synergies: [],
    deployables: [],
    counters: [],
    integrated: [],
    special_equipment: [],
    added: {
      damage: [],
      range: [],
      tags: [],
    },
    isEdit: false,
  }),
  computed: {
    confirmOK(): boolean {
      return !!this.id && !!this.name
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
        effect: this.effect,
        sp: this.sp,
        description: this.description,
        allowed_types: this.allowed_types,
        allowed_sizes: this.allowed_sizes,
        restricted_types: this.restricted_types,
        restricted_sizes: this.restricted_sizes,
        added_damage: this.added.damage,
        added_range: this.added.range,
        added_tags: this.added.tags,
        tags: this.tags,
        actions: this.actions,
        bonuses: this.bonuses,
        synergies: this.synergies,
        deployables: this.deployables,
        counters: this.counters,
        integrated: this.integrated,
        special_equipment: this.special_equipment,
      }
      this.$emit('save', e)
      this.reset()
      this.dialog = false
    },
    edit(mod: any): void {
      this.id = mod.id
      this.name = mod.name
      this.license = mod.license
      this.license_level = Number(mod.license_level)
      this.effect = mod.effect
      this.sp = mod.sp
      this.description = mod.description
      this.allowed_types = mod.allowed_types
      this.allowed_sizes = mod.allowed_sizes
      this.restricted_types = mod.restricted_types
      this.restricted_sizes = mod.restricted_sizes
      this.added = {
        damage: mod.added_damage,
        range: mod.added_range,
        tags: mod.added_tags,
      }
      this.tags = mod.tags
      this.actions = mod.actions
      this.bonuses = mod.bonuses
      this.synergies = mod.synergies
      this.deployables = mod.deployables
      this.counters = mod.counters
      this.integrated = mod.integrated
      this.special_equipment = mod.special_equipment
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
      this.effect = ''
      this.sp = ''
      this.description = ''
      this.allowed_types = []
      this.allowed_sizes = []
      this.restricted_types = []
      this.restricted_sizes = []
      this.added = {
        damage: [],
        range: [],
        tags: [],
      }
      this.tags = []
      this.actions = []
      this.bonuses = []
      this.synergies = []
      this.deployables = []
      this.counters = []
      this.integrated = []
      this.special_equipment = []
      this.isEdit = false
    },
  },
})
</script>
