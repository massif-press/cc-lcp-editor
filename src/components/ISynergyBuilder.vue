<template>
  <v-card outlined>
    <div class="caption mb-n1 mt-n3">SYNERGIES</div>
    <v-card flat>
      <v-tooltip v-for="(synergy, i) in item.synergies" :key="`synergy_chip_${item.id}-${i}`" top>
        <template v-slot:activator="{ on }">
          <v-chip
            small
            close
            outlined
            class="mx-1"
            close-icon="mdi-close"
            @click="edit(synergy, i)"
            @click:close="remove(i)"
            v-on="on">
            {{ synergy.locations.join(', ') }}
          </v-chip>
        </template>
        <div v-html="synergy.detail" />
      </v-tooltip>
      <v-dialog v-model="dialog">
        <template v-slot:activator="{ attrs }">
          <v-btn icon v-bind="attrs" @click="newItem()"><v-icon>mdi-plus</v-icon></v-btn>
        </template>
        <v-card>
          <v-toolbar dense color="pink darken-4" class="text-h6">Add Synergy</v-toolbar>
          <v-card-text>
            <v-row justify="space-around" align="center" class="mt-2">
              <v-col cols="12">
                <v-select
                  label="Synergy Locations"
                  :items="npc ? npcSynergies : synergies"
                  item-value="value"
                  item-text="desc"
                  multiple
                  outlined
                  hide-details
                  v-model="locations" />
              </v-col>
              <v-col cols="12">
                <rich-text-editor title="Detail" v-model="detail" />
              </v-col>
            </v-row>
            <div v-show="!npc">
              <v-divider class="mb-2 mt-3" />
              <div class="caption">Restrict to:</div>
              <v-row dense align="center">
                <v-col cols="4">
                  <v-select
                    v-model="wt"
                    :items="weaponType"
                    dense
                    outlined
                    multiple
                    hide-details
                    label="Weapon Types" />
                </v-col>
                <v-col cols="4">
                  <v-select
                    v-model="ws"
                    :items="weaponSize"
                    dense
                    outlined
                    multiple
                    hide-details
                    label="Weapon Sizes" />
                </v-col>
                <v-col cols="4">
                  <v-select
                    v-model="st"
                    :items="systemType"
                    dense
                    outlined
                    multiple
                    hide-details
                    label="System Types" />
                </v-col>
              </v-row>
            </div>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-btn text color="error" @click="dialog = false">cancel</v-btn>
            <v-spacer />
            <v-btn
              color="success darken-2"
              :disabled="!locations.length || !detail"
              @click="submit">
              {{ isEdit ? 'save' : 'confirm' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { synergyLocations, npcSynergyLocations } from '@/assets/enums'
import RichTextEditor from './RichTextEditor.vue'

import Vue from 'vue'
import Lancer, {
  ISynergyData,
  SystemType,
  WeaponSize,
  WeaponType,
} from '@tenebrae-press/lancer-types'

type SynergyBuilderData = {
  synergies: Array<{
    value: string
    desc: string
  }>
  npcSynergies: Array<{
    value: string
    desc: string
  }>
  weaponType: Array<WeaponType>
  weaponSize: Array<WeaponSize>
  systemType: Array<SystemType>
  detail: string
  locations: Array<string>
  editIndex: number
  dialog: boolean
  isEdit: boolean
  wt: Array<WeaponType>
  ws: Array<WeaponSize>
  st: Array<SystemType>
}

export default Vue.extend({
  name: 'synergy-builder',
  components: { RichTextEditor },
  props: { item: { type: Object, required: true }, npc: { type: Boolean } },
  data: (): SynergyBuilderData => ({
    synergies: synergyLocations,
    npcSynergies: npcSynergyLocations,
    weaponType: Lancer.WEAPON_TYPES,
    weaponSize: Lancer.WEAPON_SIZES,
    systemType: Lancer.SYSTEM_TYPES,
    dialog: false,
    locations: [],
    detail: '',
    wt: [],
    ws: [],
    st: [],
    isEdit: false,
    editIndex: -1,
  }),
  methods: {
    newItem(): void {
      this.reset()
      this.dialog = true
    },
    submit() {
      const e: ISynergyData = {
        locations: this.locations,
        detail: this.detail,
        weapon_types: this.wt,
        weapon_sizes: this.ws,
        system_types: this.st,
      }
      if (this.isEdit) {
        this.$set(this.item.synergies, this.editIndex, e)
      } else {
        if (!this.item.synergies) this.$set(this.item, 'synergies', [])
        this.item.synergies.push(e)
      }
      this.reset()
      this.dialog = false
    },
    edit(synergy: SynergyBuilderData, index: number): void {
      this.reset()
      this.locations = synergy.locations
      this.detail = synergy.detail
      this.wt = synergy.wt
      this.ws = synergy.ws
      this.st = synergy.st
      this.isEdit = true
      this.editIndex = index
      this.dialog = true
    },
    remove(index: number) {
      this.item.synergies.splice(index, 1)
    },
    descById(id: string) {
      return this.synergies.find(x => x.value === id)?.desc || 'err'
    },
    reset() {
      this.locations = []
      this.detail = ''
      this.wt = []
      this.ws = []
      this.st = []
    },
  },
})
</script>
