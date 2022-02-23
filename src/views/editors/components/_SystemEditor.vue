<template>
  <v-dialog v-model="dialog" fullscreen>
    <v-card>
      <v-toolbar dense color="deep-purple darken-4" class="text-h6">
        {{ manufacturer ? manufacturer.id : '' }} System Editor
        <v-spacer />
        <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row justify="space-around" align="end">
          <v-col>
            <id-input v-model="id" />
          </v-col>
          <v-col>
            <v-text-field label="Name" hide-details v-model="name" />
          </v-col>
          <v-col>
            <v-select label="Type" :items="systemTypes" hide-details v-model="type" />
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
              v-model="license_level" />
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
import {
  IActionData,
  IBonusData,
  ICounterData,
  IDeployableData,
  ISynergyData,
  ITagData,
  SystemType,
  SYSTEM_TYPES,
} from '@tenebrae-press/lancer-types'

import Vue from 'vue'

type SystemEditorData = {
  dialog: boolean
  systemTypes: Array<SystemType>
  id: string
  name: string
  license: string
  license_level: number
  effect: string
  type: 'System'
  sp: string
  description: string
  tags: Array<ITagData>
  actions: Array<IActionData>
  bonuses: Array<IBonusData>
  synergies: Array<ISynergyData>
  deployables: Array<IDeployableData>
  counters: Array<ICounterData>
  integrated: Array<string>
  special_equipment: Array<string>
  isEdit: boolean
}

export default Vue.extend({
  name: 'system-editor',
  props: {
    manufacturer: { type: Object, required: false },
    licenses: { type: Array, required: false, default: () => [] },
  },

  data: (): SystemEditorData => ({
    dialog: false,
    systemTypes: SYSTEM_TYPES,
    id: '',
    name: '',
    license: '',
    license_level: 1,
    effect: '',
    type: 'System',
    sp: '',
    description: '',
    tags: [],
    actions: [],
    bonuses: [],
    synergies: [],
    deployables: [],
    counters: [],
    integrated: [],
    special_equipment: [],
    isEdit: false,
  }),
  computed: {
    confirmOK(): boolean {
      return !!this.id && !!this.name
    },
    source(): string {
      if (this.manufacturer) return this.manufacturer.id
      if (this.tags.some(x => x.id === 'tg_exotic')) return 'EXOTIC'
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
        type: this.type,
        sp: this.sp,
        description: this.description,
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
    edit(system: SystemEditorData): void {
      this.id = system.id
      this.name = system.name
      this.license = system.license
      this.license_level = Number(system.license_level)
      this.effect = system.effect
      this.type = system.type
      this.sp = system.sp
      this.description = system.description
      this.tags = system.tags
      this.actions = system.actions
      this.bonuses = system.bonuses
      this.synergies = system.synergies
      this.deployables = system.deployables
      this.counters = system.counters
      this.integrated = system.integrated
      this.special_equipment = system.special_equipment
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
      this.type = 'System'
      this.sp = ''
      this.description = ''
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
