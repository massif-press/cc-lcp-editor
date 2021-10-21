<template>
  <v-card outlined>
    <div class="caption mb-n1 mt-n3">ACTIONS</div>
    <v-card flat>
      <v-tooltip v-for="(action, i) in item.actions" :key="`action_chip_${item.id}-${i}`" top>
        <template v-slot:activator="{ on }">
          <v-chip
            small
            close
            outlined
            class="mx-1"
            close-icon="mdi-close"
            @click="edit(action, i)"
            @click:close="remove(i)"
            v-on="on"
          >
            {{ action.name || `Activate ${item.name || '---'}` }}
          </v-chip>
        </template>
        <b>{{ action.activation }}</b>
        <div v-html="action.detail" />
        <v-divider />
        <div v-if="action.cost">Costs {{ action.cost }} Uses</div>
        <div v-if="action.pilot">
          Available to Pilot:
          <b class="warning--text">true</b>
        </div>
        <div v-if="action.tech_attack">
          Is Tech Attack:
          <b class="warning--text">true</b>
        </div>
        <div v-if="action.activation === 'Reaction'">
          <v-divider />
          <div v-html="action.frequency" />
          <div v-html="action.init" />
          <div v-html="action.trigger" />
        </div>
      </v-tooltip>

      <v-dialog v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
        </template>
        <v-card>
          <v-toolbar dense color="pink darken-4" class="text-h6">Add Action</v-toolbar>
          <v-card-text>
            <v-row justify="space-around" align="center" class="mt-2">
              <v-col>
                <v-text-field
                  label="Name"
                  :placeholder="`Activate ${item.name || '---'}`"
                  hide-details
                  v-model="name"
                />
              </v-col>
              <v-col>
                <activator-selector :item="this" />
              </v-col>
              <v-col>
                <synergy-selector :item="this" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <rich-text-editor title="Detail" :value="detail" @input="detail = $event" />
              </v-col>
            </v-row>
            <v-row dense align="center" justify="space-around" class="my-2">
              <v-col cols="auto">
                <v-text-field
                  v-model="cost"
                  type="number"
                  label="Use Cost"
                  dense
                  outlined
                  hide-details
                />
              </v-col>
              <v-col cols="auto" class="mt-n4">
                <v-switch v-model="pilot" label="Pilot" dense hide-details />
              </v-col>
              <v-col cols="auto" class="mt-n4">
                <v-switch v-model="tech_attack" label="Tech Attack" dense hide-details />
              </v-col>
            </v-row>
            <div v-show="activation === 'Reaction'" class="mt-3">
              <v-divider />
              <div class="caption my-2">Reaction Detail:</div>
              <v-row align="center" dense>
                <v-col>
                  <v-combobox v-model="frequency" :items="frequencies" outlined label="Frequency" />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col>
                  <v-card outlined>
                    <rich-text-editor
                      title="Precondition (optional)"
                      :value="init"
                      @input="init = $event"
                    />
                  </v-card>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col>
                  <rich-text-editor title="Trigger" :value="trigger" @input="trigger = $event" />
                </v-col>
              </v-row>
            </div>
            <v-divider class="my-2" />
            <div class="caption">Damage (Charge items only):</div>
            <v-row dense align="center">
              <v-col>todo</v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-btn text color="error" @click="dialog = false">cancel</v-btn>
            <v-spacer />
            <v-btn color="success darken-2" :disabled="!confirmOK" @click="submit">
              {{ isEdit ? 'edit' : 'confirm' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { RichTextEditor, ActivatorSelector, SynergySelector } from './index'

import Vue from 'vue'
export default Vue.extend({
  name: 'action-builder',
  props: { item: { type: Object, required: true } },
  components: { RichTextEditor, ActivatorSelector, SynergySelector },
  data: () => ({
    dialog: false,
    name: '',
    activation: '',
    detail: '',
    cost: 0,
    pilot: false,
    synergy_locations: [],
    tech_attack: false,
    frequency: 'Unlimited',
    init: '',
    trigger: '',
    frequencies: ['Unlimited', '1/round', '1/encounter', '1/mission'],
    isEdit: false,
    editIndex: -1,
  }),
  computed: {
    confirmOK(): boolean {
      if (this.activation === 'Reaction') return !!this.detail && !!this.frequency && !!this.trigger
      return !!this.activation && !!this.detail
    },
  },
  methods: {
    submit(): void {
      const e = {
        name: this.name,
        activation: this.activation,
        detail: this.detail,
        cost: this.cost,
        pilot: this.pilot,
        synergy_locations: this.synergy_locations,
        tech_attack: this.tech_attack,
        frequency: this.frequency,
        init: this.init,
        trigger: this.trigger,
      }
      if (this.isEdit) {
        this.$set(this.item.actions, this.editIndex, e)
      } else {
        if (!this.item.actions) this.$set(this.item, 'actions', [])
        this.item.actions.push(e)
      }
      this.reset()
      this.dialog = false
    },
    edit(action: any, index: number): void {
      this.name = action.name
      this.activation = action.activation
      this.detail = action.detail
      this.cost = action.cost
      this.pilot = action.pilot
      this.synergy_locations = action.synergy_locations
      this.tech_attack = action.tech_attack
      this.frequency = action.frequency
      this.init = action.init
      this.trigger = action.trigger
      this.isEdit = true
      this.editIndex = index
      this.dialog = true
    },
    remove(index: number): void {
      this.item.actions.splice(index, 1)
    },
    reset(): void {
      this.name = ''
      this.activation = ''
      this.detail = ''
      this.cost = 0
      this.pilot = false
      this.synergy_locations = []
      this.tech_attack = false
      this.frequency = 'Unlimited'
      this.init = ''
      this.trigger = ''
      this.isEdit = false
      this.editIndex = -1
    },
  },
})
</script>
