<template>
  <v-dialog v-model="dialog" fullscreen>
    <v-card>
      <v-toolbar dense color="green darken-3" class="text-h6">
        NPC System Editor
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
            <v-text-field
              v-model="recharge"
              label="Recharge"
              type="number"
              hide-details
              outlined
              dense
              clearable
            />
          </v-col>
          <v-col v-show="npcClass || npcTemplate" cols="auto">
            <v-btn-toggle v-model="optional" mandatory dense color="primary lighten-1">
              <v-btn text :value="false">Base</v-btn>
              <v-btn text :value="true">Optional</v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <rich-text-editor title="Effect" v-model="effect" npc />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col><i-action-builder npc :item="this" /></v-col>
          <v-col><i-deployable-builder npc :item="this" /></v-col>
        </v-row>
        <v-row align="center">
          <v-col><i-synergy-builder npc :item="this" /></v-col>
          <v-col><i-counter-builder :item="this" /></v-col>
          <v-col><i-clock-builder :item="this" /></v-col>
        </v-row>
        <v-row align="center">
          <v-col><i-bonus-builder npc :item="this" /></v-col>
          <v-col><tag-selector npc :item="this" /></v-col>
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
import Vue from 'vue'
export default Vue.extend({
  name: 'npc-system-editor',
  props: {
    npcClass: { type: Object, required: false },
    npcTemplate: { type: Object, required: false },
  },
  data: () => ({
    dialog: false,
    id: '',
    name: '',
    recharge: 0,
    optional: false,
    effect: '',
    type: 'System',
    tags: [],
    actions: [],
    bonuses: [],
    synergies: [],
    deployables: [],
    counters: [],
    clocks: [],
    isEdit: false,
  }),
  computed: {
    confirmOK(): boolean {
      return !!this.id && !!this.name
    },
    origin(): any {
      if (this.npcClass || this.npcTemplate)
        return {
          type: this.npcClass ? 'Class' : 'Template',
          name: this[this.npcClass ? 'npcClass' : 'npcTemplate'].name,
          optional: this.optional,
          origin_id: this[this.npcClass ? 'npcClass' : 'npcTemplate'].id,
        }
      else
        return {
          type: 'Generic',
        }
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
        origin: this.origin,
        effect: this.effect,
        recharge: this.recharge,
        optional: this.optional,
        type: this.type,
        tags: this.tags,
        actions: this.actions,
        bonuses: this.bonuses,
        synergies: this.synergies,
        deployables: this.deployables,
        counters: this.counters,
        clocks: this.clocks,
      }
      this.$emit('save', e)
      this.reset()
      this.dialog = false
    },
    edit(system: any): void {
      this.id = system.id
      this.name = system.name
      this.effect = system.effect
      this.recharge = system.recharge
      this.optional = system.optional
      this.type = system.type
      this.tags = system.tags
      this.actions = system.actions
      this.bonuses = system.bonuses
      this.synergies = system.synergies
      this.deployables = system.deployables
      this.counters = system.counters
      this.clocks = system.clocks
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
      this.effect = ''
      this.type = 'System'
      this.recharge = 0
      this.optional = false
      this.tags = []
      this.actions = []
      this.bonuses = []
      this.synergies = []
      this.deployables = []
      this.counters = []
      this.clocks = []
      this.isEdit = false
    },
  },
})
</script>
