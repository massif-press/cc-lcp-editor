<template>
  <v-dialog v-model="dialog" fullscreen>
    <v-card>
      <v-toolbar
        density="compact"
        color="amber darken-4"
        title="NPC Protocol Editor"
      >
        <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row justify="space-around" align="end">
          <v-col>
            <id-input v-model="id" :name="name"/>
          </v-col>
          <v-col>
            <v-text-field label="Name" hide-details v-model="name" />
          </v-col>
          <v-col cols="auto">
            <v-text-field
              v-model="recharge"
              label="Recharge"
              type="number"
              hide-details
              clearable
            />
          </v-col>
          <v-col cols="auto">
            <v-switch
              color="secondary"
              v-model="hide_active"
              density="compact"
              hide-details
              label="Hide in Active Mode"
            />
          </v-col>
          <v-col v-show="npcClass || npcTemplate" cols="auto">
            <v-switch
              color="secondary"
              inset
              v-model="optional"
              mandatory
              density="compact"
              hide-details
              label="Optional Feature"
            />
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
        <v-btn v-if="isEdit" color="error darken-2" @click="remove"
          >Delete</v-btn
        >
        <v-btn color="success darken-2" :disabled="!confirmOK" @click="submit">
          {{ isEdit ? 'save' : 'confirm' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  name: 'npc-trait-editor',
  props: {
    npcClass: { type: Object, required: false },
    npcTemplate: { type: Object, required: false },
  },
  data: () => ({
    dialog: false,
    optional: false,
    hide_active: false,
    id: '',
    name: '',
    recharge: 0,
    effect: '',
    type: 'Protocol',
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
    origin(): any {
      if (this.npcClass || this.npcTemplate)
        return {
          type: this.npcClass ? 'Class' : 'Template',
          name: this[this.npcClass ? 'npcClass' : 'npcTemplate'].name,
          optional: this.optional,
          origin_id: this[this.npcClass ? 'npcClass' : 'npcTemplate'].id,
        };
      else
        return {
          type: 'Generic',
        };
    },
    confirmOK(): boolean {
      return !!this.id && !!this.name;
    },
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    submit(): void {
      const e = {
        id: this.id,
        name: this.name,
        origin: this.origin,
        recharge: this.recharge,
        optional: this.optional,
        hide_active: this.hide_active,
        effect: this.effect,
        type: this.type,
        tags: this.tags,
        actions: this.actions,
        bonuses: this.bonuses,
        synergies: this.synergies,
        deployables: this.deployables,
        counters: this.counters,
        clocks: this.clocks,
      };
      this.$emit('save', e);
      this.reset();
      this.dialog = false;
    },
    edit(trait: any): void {
      this.id = trait.id;
      this.name = trait.name;
      this.effect = trait.effect;
      this.type = trait.type;
      this.recharge = trait.recharge;
      this.optional = trait.origin.optional;
      this.hide_active = trait.hide_active;
      this.tags = trait.tags;
      this.actions = trait.actions;
      this.bonuses = trait.bonuses;
      this.synergies = trait.synergies;
      this.deployables = trait.deployables;
      this.counters = trait.counters;
      this.clocks = trait.clocks;
      this.isEdit = true;
      this.dialog = true;
    },
    remove(): void {
      this.$emit('remove', this.id);
      this.dialog = false;
    },
    reset(): void {
      this.id = '';
      this.name = '';
      this.effect = '';
      this.type = 'Protocol';
      this.recharge = 0;
      this.optional = false;
      this.hide_active = false;
      this.tags = [];
      this.actions = [];
      this.bonuses = [];
      this.synergies = [];
      this.deployables = [];
      this.counters = [];
      this.clocks = [];
      this.isEdit = false;
    },
  },
};
</script>
