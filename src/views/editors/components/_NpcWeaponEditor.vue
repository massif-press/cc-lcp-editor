<template>
  <v-dialog v-model="dialog" fullscreen>
    <v-card>
      <v-toolbar density="compact" color="teal darken-4" class="text-h6">
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
            <v-select
              label="Size"
              :items="weaponSizes"
              hide-details
              v-model="weapon_size"
            />
          </v-col>
          <v-col>
            <v-select
              label="Type"
              :items="weaponTypes"
              hide-details
              v-model="weapon_type"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="recharge"
              label="Recharge"
              type="number"
              hide-details
              outlined
              density="compact"
              clearable
            />
          </v-col>
          <v-col v-show="npcClass || npcTemplate" cols="auto">
            <v-switch
              color="secondary"
              inset
              v-model="optional"
              :value="optional"
              mandatory
              density="compact"
              hide-details
              :label="`${npcClass ? 'Class' : 'Template'} Feature`"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <rich-text-editor title="Effect" v-model="effect" npc />
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
        <v-divider class="my-5" />
        <v-row align="center">
          <v-col>
            <damage-selector :item="this" npc />
          </v-col>
          <v-col>
            <range-selector :item="this" npc />
          </v-col>
          <v-col>
            <tiered-stat-input :value="attack_bonus" title="Attack Bonus" />
          </v-col>
          <v-col>
            <tiered-stat-input :value="accuracy" title="Accuracy" />
          </v-col>
        </v-row>
        <v-divider class="my-5" />
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
import { weaponType, weaponSize } from '../../../assets/enums';
import TieredStatInput from '../../../components/TieredStatInput.vue';

export default {
  components: { TieredStatInput },
  name: 'npc-weapon-editor',
  props: {
    npcClass: { type: Object, required: false },
    npcTemplate: { type: Object, required: false },
  },
  data: () => ({
    dialog: false,
    weaponTypes: weaponType,
    weaponSizes: weaponSize,
    id: '',
    name: '',
    recharge: 0,
    optional: false,
    type: 'Weapon',
    effect: '',
    on_attack: '',
    on_hit: '',
    on_crit: '',
    weapon_size: 'Aux',
    weapon_type: 'Melee',
    damage: [],
    range: [],
    attack_bonus: [0, 0, 0],
    accuracy: [0, 0, 0],
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
      return !!this.id && !!this.name;
    },
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
        effect: this.effect,
        recharge: this.recharge,
        optional: this.optional,
        damage: this.damage,
        range: this.range,
        on_attack: this.on_attack,
        on_hit: this.on_hit,
        on_crit: this.on_crit,
        weapon_size: this.weapon_size,
        weapon_type: this.weapon_type,
        attack_bonus: this.attack_bonus,
        accuracy: this.accuracy,
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
    edit(weapon: any): void {
      this.id = weapon.id;
      this.name = weapon.name;
      this.effect = weapon.effect;
      this.recharge = weapon.recharge;
      this.optional = weapon.origin.optional;
      this.damage = weapon.damage;
      this.range = weapon.range;
      this.on_attack = weapon.on_attack;
      this.on_hit = weapon.on_hit;
      this.on_crit = weapon.on_crit;
      this.weapon_size = weapon.weapon_size;
      this.weapon_type = weapon.weapon_type;
      this.attack_bonus = weapon.attack_bonus;
      this.accuracy = Array.isArray(weapon.accuracy)
        ? weapon.accuracy
        : Array(3).fill(weapon.accuracy);
      this.type = weapon.type;
      this.tags = weapon.tags;
      this.actions = weapon.actions;
      this.bonuses = weapon.bonuses;
      this.synergies = weapon.synergies;
      this.deployables = weapon.deployables;
      this.counters = weapon.counters;
      this.clocks = weapon.clocks;
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
      this.type = 'Weapon';
      this.effect = '';
      this.damage = [];
      this.range = [];
      this.on_attack = '';
      this.on_hit = '';
      this.on_crit = '';
      this.weapon_size = 'Aux';
      this.weapon_type = 'Melee';
      this.attack_bonus = [0, 0, 0];
      this.accuracy = [0, 0, 0];
      this.recharge = 0;
      this.optional = false;
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
