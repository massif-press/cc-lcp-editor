<template>
  <v-dialog v-model="dialog" fullscreen>
    <v-card>
      <v-toolbar dense color="deep-purple darken-4" class="text-h6">
        {{ manufacturer.id }} Frame Editor
        <v-spacer />
        <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row justify="space-around" align="end">
          <v-col cols="3">
            <v-text-field label="ID" hide-details v-model="id" />
          </v-col>
          <v-col cols="7">
            <v-text-field label="Name" hide-details v-model="name" />
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="License Level"
              type="number"
              hide-details
              outlined
              dense
              v-model="license_level"
            />
          </v-col>
          <v-col cols="3">
            <v-combobox
              v-model="mechtype"
              label="Mech Type"
              dense
              hide-details
              multiple
              clearable
              :items="mechTypes"
            />
          </v-col>
          <v-col cols="7">
            <v-text-field label="Image URL" hide-details v-model="image_url" />
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="Mech Banner Y Position"
              type="number"
              hide-details
              outlined
              dense
              v-model="y_pos"
            />
          </v-col>
          <v-col cols="4">
            Image Preview
            <v-img 
              :src="image_url"
              max-height="300"
              contain
            />
          </v-col>
          <v-col cols="8">
            Banner Preview
            <div style="height: 72px">
              <div style="display: flex; min-height: 100%; position: relative; min-width: 100%">
              <v-img 
                :src="image_url"
                max-height="100%"
                :position="'top '+y_pos+'% left 0px'"
                style="position:absolute; top: 0; right: 0; z-index: 9"
              />
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card outlined>
              <div class="caption mb-n1 mt-n3">MOUNTS</div>
              <v-card flat>
                <v-chip
                  v-for="(m, i) in mounts"
                  :key="`mount-${i}`"
                  close
                  class="mx-1"
                  close-icon="mdi-close"
                  @click:close="mounts.splice(i, 1)"
                >
                  {{ m }}
                </v-chip>
                <v-menu>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
                  </template>
                  <v-card>
                    <v-toolbar dense color="pink darken-4" class="text-h6">Add Mount</v-toolbar>
                    <v-card-text>
                      <v-row justify="space-around" align="center">
                        <v-col v-for="mt in mountTypes" :key="mt">
                          <v-btn large color="primary" @click="mounts.push(mt)">
                            <v-icon left>mdi-plus</v-icon>
                            {{ mt }}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-menu>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <rich-text-editor title="Description" v-model="description" />
          </v-col>
        </v-row>
        <v-divider class="my-2" />
        <v-row align="center" class="my-2">
          <v-col cols="2">
            <v-text-field
              v-model="stats.structure"
              type="number"
              label="Structure"
              dense
              outlined
              hide-details
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="stats.stress"
              type="number"
              label="Stress"
              dense
              outlined
              hide-details
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="stats.armor"
              type="number"
              label="Armor"
              dense
              outlined
              hide-details
            />
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="stats.hp" type="number" label="HP" dense outlined hide-details />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="stats.evasion"
              type="number"
              label="Evasion"
              dense
              outlined
              hide-details
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="stats.edef"
              type="number"
              label="E-Defense"
              dense
              outlined
              hide-details
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="stats.heatcap"
              type="number"
              label="Heat Capacity"
              dense
              outlined
              hide-details
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="stats.repcap"
              type="number"
              label="Repair Capacity"
              dense
              outlined
              hide-details
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="stats.sensor_range"
              type="number"
              label="Sensor Range"
              dense
              outlined
              hide-details
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="stats.tech_attack"
              type="number"
              label="Tech Attack"
              dense
              outlined
              hide-details
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="stats.save"
              type="number"
              label="Save"
              dense
              outlined
              hide-details
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="stats.speed"
              type="number"
              label="Speed"
              dense
              outlined
              hide-details
            />
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="stats.sp" type="number" label="SP" dense outlined hide-details />
          </v-col>
          <v-col cols="2" class="ml-auto">
            <v-select
              v-model="stats.size"
              :items="[0.5, 1, 2, 3, 4]"
              label="Size"
              dense
              outlined
              hide-details
            />
          </v-col>
        </v-row>
        <v-divider class="mb-5" />
        <v-row>
          <v-col><i-frame-trait-builder :item="this" /></v-col>
        </v-row>
        <v-divider class="my-4" />
        <v-card class="pa-2" outlined>
          <v-toolbar class="text-h5">CORE SYSTEM</v-toolbar>
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field label="Name" hide-details v-model="core_system.name" />
              </v-col>
              <v-col cols="12">
                <rich-text-editor title="Description" v-model="core_system.description" />
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col><i-counter-builder :item="core_system" /></v-col>
              <v-col><i-deployable-builder :item="core_system" /></v-col>
              <v-col><integrated-selector :item="core_system" /></v-col>
              <v-col><special-equipment-selector :item="core_system" /></v-col>
            </v-row>
            <v-row align="center">
              <v-col><tag-selector :item="core_system" /></v-col>
            </v-row>
            <v-divider class="my-5" />
            <v-card outlined class="ma-2">
              <v-toolbar dense class="text-h6" color="black">ACTIVE</v-toolbar>
              <v-card-text>
                <v-row align="end">
                  <v-col>
                    <v-text-field
                      label="Active Name"
                      hide-details
                      v-model="core_system.active_name"
                    />
                  </v-col>
                  <v-col>
                    <v-select
                      v-model="core_system.use"
                      :items="[
                        'Turn',
                        'Next Turn',
                        'Round',
                        'Next Round',
                        'Scene',
                        'Encounter',
                        'Mission',
                      ]"
                      label="Use"
                      dense
                      outlined
                      hide-details
                      clearable
                    />
                  </v-col>
                  <v-col>
                    <activator-selector :item="core_system" />
                  </v-col>
                  <v-col>
                    <activator-selector
                      field="deactivation"
                      label="Deactivation"
                      optional
                      :item="core_system"
                    />
                  </v-col>
                  <v-col cols="12">
                    <rich-text-editor title="Active Effect" v-model="core_system.active_effect" />
                  </v-col>
                </v-row>
                <v-row dense align="center" class="mt-4">
                  <v-col><i-action-builder :item="active" /></v-col>
                  <v-col><i-bonus-builder :item="active" /></v-col>
                  <v-col><i-synergy-builder :item="active" /></v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card outlined class="ma-2">
              <v-toolbar dense class="text-h6" color="black">
                PASSIVE
                <span class="caption pl-2">(Optional)</span>
              </v-toolbar>
              <v-card-text>
                <v-row align="end">
                  <v-col>
                    <v-text-field
                      label="Passive Name"
                      hide-details
                      v-model="core_system.passive_name"
                    />
                  </v-col>
                  <v-col cols="12">
                    <rich-text-editor title="Passive Effect" v-model="core_system.passive_effect" />
                  </v-col>
                </v-row>
                <v-row dense align="center" class="mt-4">
                  <v-col><i-action-builder :item="passive" /></v-col>
                  <v-col><i-bonus-builder :item="passive" /></v-col>
                  <v-col><i-synergy-builder :item="passive" /></v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
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
import { mechType, mountType } from '@/assets/enums'
import RichTextEditor from '@/components/RichTextEditor.vue'
import ActivatorSelector from '@/components/ActivatorSelector.vue'
import IFrameTraitBuilder from '@/components/IFrameTraitBuilder.vue'
import IActionBuilder from '@/components/IActionBuilder.vue'
import IBonusBuilder from '@/components/IBonusBuilder.vue'
import ISynergyBuilder from '@/components/ISynergyBuilder.vue'
import IDeployableBuilder from '@/components/IDeployableBuilder.vue'
import ICounterBuilder from '@/components/ICounterBuilder.vue'
import IntegratedSelector from '@/components/IntegratedSelector.vue'
import SpecialEquipmentSelector from '@/components/SpecialEquipmentSelector.vue'
import TagSelector from '@/components/TagSelector.vue'

import Vue from 'vue'
export default Vue.extend({
  name: 'frame-editor',
  props: { manufacturer: { type: Object, required: true } },
  components: {
    RichTextEditor,
    IFrameTraitBuilder,
    ActivatorSelector,
    IActionBuilder,
    IBonusBuilder,
    ISynergyBuilder,
    IDeployableBuilder,
    ICounterBuilder,
    IntegratedSelector,
    SpecialEquipmentSelector,
    TagSelector,
  },
  data: () => ({
    dialog: false,
    mechTypes: mechType,
    mountTypes: mountType,
    id: '',
    license_level: 2,
    name: '',
    mechtype: [],
    description: '',
    mounts: [],
    stats: {
      size: 1,
      structure: 4,
      stress: 4,
      armor: 0,
      hp: 10,
      evasion: 6,
      edef: 6,
      heatcap: 6,
      repcap: 6,
      sensor_range: 10,
      tech_attack: 0,
      save: 20,
      speed: 4,
      sp: 6,
    },
    traits: [],
    core_system: {
      name: '',
      active_name: '',
      active_effect: '',
      activation: '',
      description: '',
      deactivation: '',
      use: '',
      active_actions: [],
      active_bonuses: [],
      active_synergies: [],
      passive_name: '',
      passive_effect: '',
      passive_actions: [],
      passive_bonuses: [],
      passive_synergies: [],
      deployables: [],
      counters: [],
      integrated: [],
      special_equipment: [],
      tags: [],
    },
    active: { actions: [], bonuses: [], synergies: [] },
    passive: { actions: [], bonuses: [], synergies: [] },
    image_url: '',
    y_pos: 0,
    isEdit: false,
  }),
  computed: {
    confirmOK(): boolean {
      return !!this.id && !!this.name
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
      const cs = JSON.parse(JSON.stringify(this.core_system))
      cs.active_actions = this.active.actions
      cs.active_bonuses = this.active.bonuses
      cs.active_synergies = this.active.synergies
      cs.passive_actions = this.passive.actions
      cs.passive_bonuses = this.passive.bonuses
      cs.passive_synergies = this.passive.synergies
      const e = {
        id: this.id,
        source: this.manufacturer.id,
        license_level: Number(this.license_level),
        name: this.name,
        mechtype: this.mechtype,
        description: this.description,
        mounts: this.mounts,
        stats: this.stats,
        traits: this.traits,
        core_system: cs,
        image_url: this.image_url,
        y_pos: this.y_pos,
      }
      this.$emit('save', e)
      this.reset()
      this.dialog = false
    },
    edit(frame: any): void {
      this.id = frame.id
      this.license_level = Number(frame.license_level)
      this.name = frame.name
      this.mechtype = frame.mechtype
      this.description = frame.description
      this.mounts = frame.mounts
      this.stats = frame.stats
      this.traits = frame.traits
      this.core_system = frame.core_system
      this.active = {
        actions: frame.core_system.active_actions,
        bonuses: frame.core_system.active_bonuses,
        synergies: frame.core_system.active_synergies,
      }
      this.passive = {
        actions: frame.core_system.passive_actions,
        bonuses: frame.core_system.passive_bonuses,
        synergies: frame.core_system.passive_synergies,
      }
      this.image_url = frame.image_url
      this.y_pos = frame.y_pos
      this.isEdit = true
      this.dialog = true
    },
    remove(): void {
      this.$emit('remove', this.id)
      this.dialog = false
    },
    reset(): void {
      this.id = ''
      this.license_level = 1
      this.name = ''
      this.mechtype = []
      this.description = ''
      this.mounts = []
      this.stats = {
        size: 1,
        structure: 4,
        stress: 4,
        armor: 0,
        hp: 10,
        evasion: 6,
        edef: 6,
        heatcap: 6,
        repcap: 6,
        sensor_range: 10,
        tech_attack: 0,
        save: 20,
        speed: 4,
        sp: 6,
      }
      this.traits = []
      this.core_system = {
        name: '',
        active_name: '',
        active_effect: '',
        activation: '',
        description: '',
        deactivation: '',
        use: '',
        active_actions: [],
        active_bonuses: [],
        active_synergies: [],
        passive_name: '',
        passive_effect: '',
        passive_actions: [],
        passive_bonuses: [],
        passive_synergies: [],
        deployables: [],
        counters: [],
        integrated: [],
        special_equipment: [],
        tags: [],
      }
      this.active = { actions: [], bonuses: [], synergies: [] }
      this.passive = { actions: [], bonuses: [], synergies: [] }
      this.image_url = ''
      this.y_pos = 0
      this.isEdit = false
    },
  },
})
</script>
