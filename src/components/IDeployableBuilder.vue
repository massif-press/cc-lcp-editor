<template>
  <v-card outlined>
    <div class="caption mb-n1 mt-n3">DEPLOYABLES</div>
    <v-card flat>
      <v-tooltip
        v-for="(deployable, i) in item.deployables"
        :key="`deployable_chip_${item.id}-${i}`"
        top>
        <template v-slot:activator="{ on }">
          <v-chip
            small
            close
            outlined
            class="mx-1"
            close-icon="mdi-close"
            @click="edit(deployable, i)"
            @click:close="remove(i)"
            v-on="on">
            {{ deployable.name }} ({{ deployable.type }})
          </v-chip>
        </template>
        <div>
          Activation: {{ deployable.activation }} // Deactivation:
          {{ deployable.deactivation || '--' }} // Recall: {{ deployable.recall || '--' }} //
          Redeploy: {{ deployable.redeploy || '--' }}
        </div>
        <div v-html="deployable.detail" />
        <v-divider />
        <div v-if="deployable.cost">
          Costs {{ deployable.cost }} Uses, {{ deployable.instances }} Instances
        </div>
        <div v-if="deployable.pilot">
          Available to Pilot:
          <b class="warning--text">true</b>
        </div>
        <div>
          <v-divider class="my-1" />
          <v-chip
            outlined
            small
            class="mx-1"
            v-html="`${deployable.armor ? `  Armor: ${deployable.armor}` : ''}`" />
          <v-chip
            outlined
            small
            class="mx-1"
            v-html="`${deployable.hp ? `  HP: ${deployable.hp}` : ''}`" />
          <v-chip
            outlined
            small
            class="mx-1"
            v-html="`${deployable.evasion ? `  Evasion: ${deployable.evasion}` : ''}`" />
          <v-chip
            outlined
            small
            class="mx-1"
            v-html="`${deployable.edef ? `  EDef: ${deployable.edef}` : ''}`" />
          <v-chip
            outlined
            small
            class="mx-1"
            v-html="`${deployable.heatcap ? `  Heatcap: ${deployable.heatcap}` : ''}`" />
          <v-chip
            outlined
            small
            class="mx-1"
            v-html="`${deployable.repcap ? `  Repcap: ${deployable.repcap}` : ''}`" />
          <v-chip
            outlined
            small
            class="mx-1"
            v-html="`${deployable.sensor_range ? `  Sensors: ${deployable.sensor_range}` : ''}`" />
          <v-chip
            outlined
            small
            class="mx-1"
            v-html="`${deployable.tech_attack ? `  Tech Atk: ${deployable.tech_attack}` : ''}`" />
          <v-chip
            outlined
            small
            class="mx-1"
            v-html="`${deployable.save ? `  Save: ${deployable.save}` : ''}`" />
          <v-chip
            outlined
            small
            class="mx-1"
            v-html="`${deployable.speed ? `  Speed: ${deployable.speed}` : ''}`" />
          <v-chip
            outlined
            small
            class="mx-1"
            v-html="`${deployable.size ? `  Size: ${deployable.size}` : ''}`" />
        </div>
        <div v-if="deployable.tags">
          <v-divider />
          <v-chip small v-for="t in deployable.tags" :key="t.id">{{ t }}</v-chip>
        </div>
      </v-tooltip>

      <v-dialog v-model="dialog">
        <template v-slot:activator="{ attrs }">
          <v-btn icon v-bind="attrs" @click="newItem()"><v-icon>mdi-plus</v-icon></v-btn>
        </template>
        <v-card>
          <v-toolbar dense color="pink darken-4" class="text-h6">Add Deployable</v-toolbar>
          <v-card-text>
            <v-row justify="space-around" align="center" class="mt-2">
              <v-col>
                <v-text-field label="Name" hide-details v-model="name" />
              </v-col>
              <v-col>
                <v-text-field label="Deployable Type" hide-details v-model="type" />
              </v-col>
              <v-col>
                <v-select label="Size" :items="[0.5, 1, 2, 3, 4]" hide-details v-model="size" />
              </v-col>
              <v-col v-if="!npc">
                <i-synergy-builder :item="this" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <rich-text-editor title="Detail" v-model="detail" npc />
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col><tag-selector :item="item" /></v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <activator-selector :item="this" label="Activation" />
              </v-col>
              <v-col>
                <activator-selector
                  :item="this"
                  label="Deactivation"
                  field="deactivation"
                  optional />
              </v-col>
              <v-col>
                <activator-selector :item="this" label="Recall" field="recall" optional />
              </v-col>
              <v-col>
                <activator-selector :item="this" label="Redeploy" field="redeploy" optional />
              </v-col>
            </v-row>
            <v-row dense align="center" justify="space-around" class="my-4">
              <v-col>
                <v-text-field
                  v-model="instances"
                  type="number"
                  label="Instances"
                  dense
                  clearable
                  outlined
                  hide-details />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="cost"
                  type="number"
                  label="Use Cost"
                  dense
                  clearable
                  outlined
                  hide-details />
              </v-col>
              <v-col v-show="!npc" class="mt-n4">
                <v-switch v-model="pilot" label="Pilot" dense hide-details />
              </v-col>
              <v-col v-show="!npc" class="mt-n4">
                <v-switch v-model="mech" label="Mech" dense hide-details />
              </v-col>
            </v-row>
            <v-row dense align="center" justify="space-around" class="my-2">
              <v-col v-for="k in stats" :key="`dep_stat_${k}`" cols="2">
                <tiered-stat-input v-if="npc" v-model="$data[k]" :title="k.replaceAll('_', ' ')" />
                <v-text-field
                  v-else
                  v-model="$data[k]"
                  type="number"
                  :label="k.replaceAll('_', ' ')"
                  dense
                  clearable
                  outlined
                  hide-details />
              </v-col>
            </v-row>
            <v-divider class="my-4" />
            <v-row dense align="center">
              <v-col><i-action-builder :item="this" npc /></v-col>
              <v-col><i-bonus-builder :item="this" npc /></v-col>
              <v-col><i-counter-builder :item="this" /></v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-btn text color="error" @click="dialog = false">cancel</v-btn>
            <v-spacer />
            <v-btn color="success darken-2" :disabled="!confirmOK" @click="submit">
              {{ isEdit ? 'save' : 'confirm' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { activationTypes } from '@/assets/enums'
import Lancer, {
  ActivationType,
  IActionData,
  IBonusData,
  ICounterData,
  IDeployableData,
  ISynergyData,
} from '@tenebrae-press/lancer-types'
import Vue from 'vue'
const stats = [
  'armor',
  'hp',
  'evasion',
  'edef',
  'heatcap',
  'repcap',
  'sensor_range',
  'tech_attack',
  'save',
  'speed',
]

type DeployableBuilderData = {
  stats: typeof stats
  dialog: boolean
  name: string
  type: string
  detail: string
  size: number
  activation: string
  deactivation: string
  recall: string
  redeploy: string
  instances: number
  cost: number
  armor?: number
  hp?: number
  evasion?: number
  edef?: number
  heatcap?: number
  repcap?: number
  sensor_range?: number
  tech_attack?: number
  save?: number
  speed?: number
  pilot: boolean
  mech: boolean
  actions: Array<IActionData>
  bonuses: Array<IBonusData>
  synergies: Array<ISynergyData>
  counters: Array<ICounterData>
  isEdit: boolean
  editIndex: number
}

export default Vue.extend({
  name: 'deployable-builder',
  props: { item: { type: Object, required: true }, npc: { type: Boolean } },

  data: (): DeployableBuilderData => ({
    stats: stats,
    dialog: false,
    name: '',
    type: '',
    detail: '',
    size: 1,
    activation: '',
    deactivation: '',
    recall: '',
    redeploy: '',
    instances: 1,
    cost: 1,
    pilot: false,
    mech: false,
    actions: [],
    bonuses: [],
    synergies: [],
    counters: [],
    isEdit: false,
    editIndex: -1,
  }),
  computed: {
    confirmOK(): boolean {
      return !!this.name && !!this.type && !!this.detail && !!this.size
    },
  },
  methods: {
    sanitizeActivation(desc: string): ActivationType {
      return (
        (activationTypes.find(type => type.desc === desc)?.value as ActivationType) ??
        Lancer.ACTIVATION_TYPES[0]
      )
    },
    newItem(): void {
      this.reset()
      this.dialog = true
    },
    submit(): void {
      const e: IDeployableData = {
        name: this.name,
        type: this.type,
        detail: this.detail,
        size: this.size,
        activation: this.sanitizeActivation(this.activation),
        deactivation: this.sanitizeActivation(this.deactivation),
        recall: this.sanitizeActivation(this.recall),
        redeploy: this.sanitizeActivation(this.redeploy),
        instances: this.instances,
        cost: this.cost,
        armor: this.armor,
        hp: this.hp,
        evasion: this.evasion,
        edef: this.edef,
        heatcap: this.heatcap,
        repcap: this.repcap,
        sensor_range: this.sensor_range,
        tech_attack: this.tech_attack,
        save: this.save,
        speed: this.speed,
        pilot: this.pilot,
        mech: this.mech,
        actions: this.actions,
        bonuses: this.bonuses,
        synergies: this.synergies,
        counters: this.counters,
      }
      if (this.isEdit) {
        this.$set(this.item.deployables, this.editIndex, e)
      } else {
        if (!this.item.deployables) this.$set(this.item, 'deployables', [])
        this.item.deployables.push(e)
      }
      this.reset()
      this.dialog = false
    },
    edit(deployable: DeployableBuilderData, index: number): void {
      this.reset()
      this.name = deployable.name || ''
      this.type = deployable.type || ''
      this.detail = deployable.detail || ''
      this.size = deployable.size || 1
      this.activation = deployable.activation || ''
      this.deactivation = deployable.deactivation || ''
      this.recall = deployable.recall || ''
      this.redeploy = deployable.redeploy || ''
      this.instances = deployable.instances || 1
      this.cost = deployable.cost || 1
      this.armor = deployable.armor || 0
      this.hp = deployable.hp
      this.evasion = deployable.evasion
      this.edef = deployable.edef
      this.heatcap = deployable.heatcap
      this.repcap = deployable.repcap
      this.sensor_range = deployable.sensor_range
      this.tech_attack = deployable.tech_attack
      this.save = deployable.save
      this.speed = deployable.speed
      this.pilot = deployable.pilot || false
      this.mech = deployable.mech || false
      this.actions = deployable.actions || []
      this.bonuses = deployable.bonuses || []
      this.synergies = deployable.synergies || []
      this.counters = deployable.counters || []
      this.isEdit = true
      this.editIndex = index
      this.dialog = true
    },
    remove(index: number): void {
      this.item.deployables.splice(index, 1)
    },
    reset(): void {
      this.name = ''
      this.type = ''
      this.detail = ''
      this.size = 1
      this.activation = ''
      this.deactivation = ''
      this.recall = ''
      this.redeploy = ''
      this.instances = 1
      this.cost = 1
      this.armor = undefined
      this.hp = undefined
      this.evasion = undefined
      this.edef = undefined
      this.heatcap = undefined
      this.repcap = undefined
      this.sensor_range = undefined
      this.tech_attack = undefined
      this.save = undefined
      this.speed = undefined
      this.pilot = false
      this.mech = false
      this.actions = []
      this.bonuses = []
      this.synergies = []
      this.counters = []
    },
  },
})
</script>
