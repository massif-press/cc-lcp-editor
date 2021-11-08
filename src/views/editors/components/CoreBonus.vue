<template>
  <v-container>
    <v-card
      v-for="(cb, i) in core_bonuses"
      :key="`cb_card_${manufacturer.id}-${i}`"
      class="my-2"
      outlined
    >
      <v-toolbar dense class="text-h6">{{ cb.name }}</v-toolbar>
      <v-card-text>
        <div v-html="cb.description" />
        <div v-html="cb.effect" />
        <v-card outlined v-if="cb.mounted_effect" class="text-center pa-2 mt-2">
          {{ cb.mounted_effect }}
        </v-card>
      </v-card-text>
      <v-divider class="my-2" />
      <v-card-actions>
        <v-btn @click="edit(cb)">edit</v-btn>
        <v-spacer />
        <v-btn @click="remove(cb)" color="red">delete</v-btn>
      </v-card-actions>
    </v-card>
    <v-row justify="end" class="mt-1">
      <v-col cols="auto">
        <v-btn color="secondary" @click="addNew()">
          <v-icon left>mdi-plus</v-icon>
          add new core bonus
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog">
      <v-card>
        <v-toolbar dense color="pink darken-4" class="text-h6">Core Bonus</v-toolbar>
        <v-card-text>
          <v-row justify="space-around" align="center">
            <v-col cols="4">
              <id-input v-model="id" />
            </v-col>
            <v-col>
              <v-text-field label="Name" hide-details v-model="name" />
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
              <v-textarea
                v-model="mounted_effect"
                label="Mounted Effect (Optional)"
                dense
                outlined
                hide-details
                rows="2"
                auto-grow
              />
            </v-col>
          </v-row>

          <v-divider class="my-4" />
          <v-row dense align="center">
            <v-col><i-action-builder :item="this" /></v-col>
            <v-col><i-bonus-builder :item="this" /></v-col>
            <v-col><i-deployable-builder :item="this" /></v-col>
            <v-col><i-counter-builder :item="this" /></v-col>
          </v-row>
          <v-row dense align="center">
            <v-col><integrated-selector :item="this" /></v-col>
            <v-col><special-equipment-selector :item="this" /></v-col>
            <v-col>
              <i-synergy-builder :item="this" />
            </v-col>
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
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'core-bonus-editor',
  props: { manufacturer: { type: Object, required: true } },

  data: () => ({
    dialog: false,
    id: '',
    name: '',
    effect: '',
    description: '',
    mounted_effect: '',
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
      return !!this.id && !!this.name && !!this.effect && !!this.description
    },
    lcp(): any {
      return this.$store.getters.lcp
    },
    core_bonuses(): any[] {
      if (!this.lcp.core_bonuses) return []
      return this.lcp.core_bonuses.filter((x: any) => x.source === this.manufacturer.id)
    },
  },
  methods: {
    addNew(): void {
      this.reset()
      this.dialog = true
    },
    submit(): void {
      const e = {
        id: this.id,
        name: this.name,
        source: this.manufacturer.id,
        effect: this.effect,
        description: this.description,
        mounted_effect: this.mounted_effect,
        actions: this.actions,
        bonuses: this.bonuses,
        synergies: this.synergies,
        deployables: this.deployables,
        counters: this.counters,
        integrated: this.integrated,
        special_equipment: this.special_equipment,
      }
      if (this.isEdit) {
        const index = this.lcp.core_bonuses.findIndex((x: any) => x.id === this.id)
        this.$set(this.lcp.core_bonuses, index, e)
      } else {
        if (!this.lcp.core_bonuses) this.$set(this.lcp, 'core_bonuses', [])
        this.lcp.core_bonuses.push(e)
      }
      this.reset()
      this.dialog = false
    },
    edit(cb: any, index: number): void {
      this.id = cb.id || ''
      this.name = cb.name || ''
      this.effect = cb.effect || ''
      this.description = cb.description || ''
      this.mounted_effect = cb.mounted_effect || ''
      this.actions = cb.actions || []
      this.bonuses = cb.bonuses || []
      this.synergies = cb.synergies || []
      this.deployables = cb.deployables || []
      this.counters = cb.counters || []
      this.integrated = cb.integrated || []
      this.special_equipment = cb.special_equipment || []
      this.isEdit = true
      this.editIndex = index
      this.dialog = true
    },
    remove(item: any): void {
      const index = this.lcp.core_bonuses.findIndex((x: any) => x.id === item.id)
      this.lcp.core_bonuses.splice(index, 1)
    },
    reset(): void {
      this.id = ''
      this.name = ''
      this.effect = ''
      this.description = ''
      this.mounted_effect = ''
      this.actions = []
      this.bonuses = []
      this.synergies = []
      this.deployables = []
      this.counters = []
      this.integrated = []
      this.special_equipment = []
    },
  },
})
</script>
