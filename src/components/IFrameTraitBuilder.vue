<template>
  <v-card outlined>
    <div class="caption mb-n1 mt-n3">FRAME TRAITS</div>
    <v-card flat>
      <v-tooltip
        v-for="(trait, i) in item.traits"
        :key="`trait_chip_${item.id || item.name}-${i}`"
        top
        max-width="50vw">
        <template v-slot:activator="{ on }">
          <v-chip
            small
            close
            outlined
            class="mx-1"
            close-icon="mdi-close"
            @click="edit(trait, i)"
            @click:close="remove(i)"
            v-on="on">
            {{ trait.name }}
          </v-chip>
        </template>
        <b v-if="trait.use">{{ trait.use }}</b>
        <div v-html="trait.description" />
      </v-tooltip>

      <v-dialog v-model="dialog">
        <template v-slot:activator="{ attrs }">
          <v-btn icon v-bind="attrs" @click="newItem()"><v-icon>mdi-plus</v-icon></v-btn>
        </template>
        <v-card>
          <v-toolbar dense color="pink darken-4" class="text-h6">Edit Trait</v-toolbar>
          <v-card-text>
            <v-row justify="space-around" align="center" class="mt-2">
              <v-col>
                <v-text-field label="Name" hide-details v-model="name" />
              </v-col>
              <v-col>
                <v-select
                  v-model="use"
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
                  clearable />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <rich-text-editor title="Description" v-model="description" />
              </v-col>
            </v-row>

            <v-divider class="my-2" />
            <v-row dense align="center">
              <v-col><i-action-builder :item="this" /></v-col>
              <v-col><i-bonus-builder :item="this" /></v-col>
              <v-col><i-counter-builder :item="this" /></v-col>
              <v-col><i-deployable-builder :item="this" /></v-col>
            </v-row>
            <v-row dense align="center">
              <v-col><i-synergy-builder :item="this" /></v-col>
              <v-col><integrated-selector :item="this" /></v-col>
              <v-col><special-equipment-selector :item="this" /></v-col>
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
import {
  Duration,
  IActionData,
  IBonusData,
  ICounterData,
  IDeployableData,
  IFrameTraitData,
  ISynergyData,
} from '@tenebrae-press/lancer-types'
import Vue from 'vue'

type IFrameTraitBuilderData = {
  dialog: boolean
  name: string
  use?: Duration
  description: string
  actions: Array<IActionData>
  bonuses: Array<IBonusData>
  counters: Array<ICounterData>
  deployables: Array<IDeployableData>
  synergies: Array<ISynergyData>
  integrated: Array<string>
  special_equipment: Array<string>
  isEdit: boolean
  editIndex: number
}

export default Vue.extend({
  name: 'trait-builder',
  props: { item: { type: Object, required: true } },

  data: (): IFrameTraitBuilderData => ({
    dialog: false,
    name: '',
    use: undefined,
    description: '',
    actions: [],
    bonuses: [],
    counters: [],
    deployables: [],
    synergies: [],
    integrated: [],
    special_equipment: [],
    isEdit: false,
    editIndex: -1,
  }),
  computed: {
    confirmOK(): boolean {
      return !!this.name && !!this.description
    },
  },
  methods: {
    newItem(): void {
      this.reset()
      this.dialog = true
    },
    submit(): void {
      const e: IFrameTraitData = {
        name: this.name,
        use: this.use,
        description: this.description,
        actions: this.actions,
        bonuses: this.bonuses,
        counters: this.counters,
        deployables: this.deployables,
        synergies: this.synergies,
        integrated: this.integrated,
        special_equipment: this.special_equipment,
      }
      if (this.isEdit) {
        this.$set(this.item.traits, this.editIndex, e)
      } else {
        if (!this.item.traits) this.$set(this.item, 'traits', [])
        this.item.traits.push(e)
      }
      this.reset()
      this.dialog = false
    },
    edit(trait: IFrameTraitData, index: number): void {
      this.reset()
      this.name = trait.name
      this.use = trait.use
      this.description = trait.description
      this.actions = trait.actions ?? []
      this.bonuses = trait.bonuses ?? []
      this.counters = trait.counters ?? []
      this.deployables = trait.deployables ?? []
      this.synergies = trait.synergies ?? []
      this.integrated = trait.integrated ?? []
      this.special_equipment = []
      this.isEdit = true
      this.editIndex = index
      this.dialog = true
    },
    remove(index: number): void {
      this.item.traits.splice(index, 1)
    },
    reset(): void {
      this.name = ''
      this.use = undefined
      this.description = ''
      this.actions = []
      this.bonuses = []
      this.counters = []
      this.deployables = []
      this.synergies = []
      this.integrated = []
      this.special_equipment = []
      this.isEdit = false
      this.editIndex = -1
    },
  },
})
</script>
