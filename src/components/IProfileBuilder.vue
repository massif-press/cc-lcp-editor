<template>
  <v-card outlined>
    <div class="ml-1 mt-n2">WEAPON PROFILES</div>
    <v-container>
      <v-card v-for="(profile, i) in item.profiles" :key="`profile_card_${i}`" class="pa-2 my-1">
        <v-toolbar dense class="text-h6">
          {{ profile.name || '---' }}
          <v-spacer />
          {{ i === 0 ? 'Default' : '' }} Weapon Profile
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col>
              <div v-show="profile.effect" class="caption">EFFECT</div>
              <div v-show="profile.effect" v-html="profile.effect" />
              <div v-for="(d, i) in profile.damage" :key="`damage_${i}`">
                {{ d.val }} {{ d.type }} Damage
              </div>
              <div v-for="(r, j) in profile.range" :key="`range_${j}`">
                {{ r.val }} {{ r.type }}
              </div>
            </v-col>
            <v-col>
              <div v-show="profile.on_attack" class="caption">ON ATTACK</div>
              <div v-show="profile.on_attack" v-html="profile.on_attack" />
              <div v-show="profile.on_hit" class="caption">ON HIT</div>
              <div v-show="profile.on_hit" v-html="profile.on_hit" />
              <div v-show="profile.on_crit" class="caption">ON CRIT</div>
              <div v-show="profile.on_crit" v-html="profile.on_crit" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn color="error" @click="remove(i)">Delete</v-btn>
          <v-spacer />
          <v-btn color="primary" @click="edit(profile, i)">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>

    <v-btn block color="primary darken-3" @click="open">
      <v-icon>mdi-plus</v-icon>
      Add Weapon Profile
    </v-btn>

    <v-dialog v-model="dialog">
      <v-card>
        <v-toolbar dense color="pink darken-4" class="text-h6">Edit Weapon Profile</v-toolbar>
        <v-card-text>
          <v-row justify="space-around" align="end">
            <v-col>
              <v-text-field label="Name" hide-details v-model="name" />
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
  </v-card>
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
import DamageSelector from '@/components/DamageSelector.vue'
import RangeSelector from '@/components/RangeSelector.vue'

import Vue from 'vue'
export default Vue.extend({
  name: 'weapon-profile-editor',
  props: {
    item: { type: Object, required: true },
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
    DamageSelector,
    RangeSelector,
  },
  data: () => ({
    dialog: false,
    weaponTypes: weaponType,
    weaponSizes: weaponSize,
    name: '',
    description: '',
    effect: '',
    on_attack: '',
    on_hit: '',
    on_crit: '',
    cost: 1,
    damage: [],
    range: [],
    actions: [],
    bonuses: [],
    synergies: [],
    deployables: [],
    counters: [],
    integrated: [],
    special_equipment: [],
    isEdit: false,
    editIndex: -1,
  }),
  computed: {
    confirmOK(): boolean {
      return !!this.name
    },
  },
  methods: {
    open() {
      this.reset()
      this.dialog = true
    },
    close() {
      this.reset()
      this.dialog = false
    },
    submit(): void {
      const e = {
        name: this.name,
        description: this.description,
        effect: this.effect,
        on_attack: this.on_attack,
        on_hit: this.on_hit,
        on_crit: this.on_crit,
        cost: this.cost,
        damage: this.damage,
        range: this.range,
        actions: this.actions,
        bonuses: this.bonuses,
        synergies: this.synergies,
        deployables: this.deployables,
        counters: this.counters,
        integrated: this.integrated,
        special_equipment: this.special_equipment,
      }
      if (!this.item.profiles) this.$set(this.item, 'profiles', [])
      if (this.isEdit && this.editIndex > -1) {
        this.$set(this.item.profiles, this.editIndex, e)
      } else this.item.profiles.push(e)
      this.reset()
      this.dialog = false
    },
    edit(weapon: any, index: number): void {
      this.name = weapon.name
      this.description = weapon.description
      this.effect = weapon.effect
      this.on_attack = weapon.on_attack
      this.on_hit = weapon.on_hit
      this.on_crit = weapon.on_crit
      this.cost = weapon.cost
      this.damage = weapon.damage
      this.range = weapon.range
      this.actions = weapon.actions
      this.bonuses = weapon.bonuses
      this.synergies = weapon.synergies
      this.deployables = weapon.deployables
      this.counters = weapon.counters
      this.integrated = weapon.integrated
      this.special_equipment = weapon.special_equipment
      this.isEdit = true
      this.editIndex = index
      this.dialog = true
    },
    remove(index: number): void {
      this.dialog = false
      this.item.profiles.splice(index, 1)
    },
    reset(): void {
      this.name = ''
      this.description = ''
      this.effect = ''
      this.on_attack = ''
      this.on_hit = ''
      this.on_crit = ''
      this.cost = 1
      this.damage = []
      this.range = []
      this.actions = []
      this.bonuses = []
      this.synergies = []
      this.deployables = []
      this.counters = []
      this.integrated = []
      this.special_equipment = []
      this.isEdit = false
      this.editIndex = -1
    },
  },
})
</script>
