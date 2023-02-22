<template>
  <v-card>
    <v-toolbar density="compact" color="primary" title="Actions" />
    <v-card flat>
      <v-tooltip
        v-for="(action, i) in item.actions"
        :key="`action_chip_${item.id || item.name}-${i}`"
        top
        width="20em"
      >
        <template v-slot:activator="{ props }">
          <v-chip
            small
            outlined
            class="mx-1"
            @click="edit(action, i)"
            v-bind="props"
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
        <template v-slot:activator="{ attrs }">
          <v-btn
            size="small"
            icon
            variant="flat"
            v-bind="attrs"
            @click="newItem()"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </template>
        <v-card>
          <v-toolbar color="pink darken-4" title="Add Action">
            <v-btn icon @click="dialog = false"
              ><v-icon icon="mdi-close"
            /></v-btn>
          </v-toolbar>
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
                <synergy-selector :item="this" :npc="npc" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <rich-text-editor title="Detail" v-model="detail" npc />
              </v-col>
            </v-row>
            <v-row
              density="compact"
              align="center"
              justify="space-around"
              class="my-2"
            >
              <v-col cols="auto">
                <v-text-field
                  v-model="cost"
                  type="number"
                  label="Use Cost"
                  density="compact"
                  outlined
                  hide-details
                />
              </v-col>
              <v-col v-if="!npc" cols="auto" class="mt-n4">
                <v-switch
                  color="secondary"
                  v-model="pilot"
                  label="Pilot"
                  density="compact"
                  hide-details
                />
              </v-col>
              <v-col cols="auto" class="mt-n4">
                <v-switch
                  color="secondary"
                  v-model="tech_attack"
                  label="Tech Attack"
                  density="compact"
                  hide-details
                />
              </v-col>
            </v-row>
            <div v-show="activation === 'Reaction'" class="mt-3">
              <v-divider />
              <div class="text-caption my-2">Reaction Detail:</div>
              <v-row align="center" density="compact">
                <v-col>
                  <v-combobox
                    v-model="frequency"
                    :items="frequencies"
                    outlined
                    label="Frequency"
                  />
                </v-col>
              </v-row>
              <v-row density="compact">
                <v-col>
                  <rich-text-editor
                    title="Precondition (optional)"
                    v-model="init"
                    npc
                  />
                </v-col>
              </v-row>
              <v-row density="compact">
                <v-col>
                  <rich-text-editor title="Trigger" v-model="trigger" npc />
                </v-col>
              </v-row>
            </div>
            <v-divider class="my-2" />
            <div v-show="!npc" class="text-caption mb-2">
              Charge items only:
            </div>
            <v-row>
              <v-col><damage-selector :item="this" :npc="npc" /></v-col>
              <v-col><range-selector :item="this" :npc="npc" /></v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-btn
              v-show="isEdit"
              variant="tonal"
              color="error"
              @click="remove()"
              >delete</v-btn
            >
            <v-spacer />
            <v-btn
              color="success darken-2"
              :disabled="!confirmOK"
              @click="submit"
            >
              {{ isEdit ? 'save' : 'confirm' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import SynergySelector from './SynergyLocationSelector.vue';
import RangeSelector from './RangeSelector.vue';

export default {
  name: 'action-builder',
  props: { item: { type: Object, required: true }, npc: { type: Boolean } },
  components: { SynergySelector, RangeSelector },
  data: () => ({
    dialog: false,
    name: '',
    activation: '',
    detail: '',
    cost: 0,
    pilot: false,
    synergy_locations: [],
    damage: [],
    range: [],
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
      if (this.activation === 'Reaction')
        return !!this.detail && !!this.frequency && !!this.trigger;
      return !!this.activation && !!this.detail;
    },
  },
  methods: {
    newItem(): void {
      this.reset();
      this.dialog = true;
    },
    submit(): void {
      const e = {
        name: this.name,
        activation: this.activation,
        detail: this.detail,
        cost: this.cost,
        pilot: this.pilot,
        damage: this.damage,
        range: this.range,
        synergy_locations: this.synergy_locations,
        tech_attack: this.tech_attack,
        frequency: this.frequency,
        init: this.init,
        trigger: this.trigger,
      };
      if (this.isEdit) {
        this.item.actions[this.editIndex] = e;
      } else {
        if (!this.item.actions) this.item.actions = [];
        this.item.actions.push(e);
      }
      this.reset();
      this.dialog = false;
    },
    edit(action: any, index: number): void {
      this.reset();
      this.name = action.name;
      this.activation = action.activation;
      this.detail = action.detail;
      this.cost = action.cost;
      this.pilot = action.pilot;
      this.damage = action.damage;
      this.range = action.range;
      this.synergy_locations = action.synergy_locations;
      this.tech_attack = action.tech_attack;
      this.frequency = action.frequency;
      this.init = action.init;
      this.trigger = action.trigger;
      this.isEdit = true;
      this.editIndex = index;
      this.dialog = true;
    },
    remove() {
      this.item.actions.splice(this.editIndex, 1);
      this.dialog = false;
    },
    reset(): void {
      this.name = '';
      this.activation = '';
      this.detail = '';
      this.cost = 0;
      this.pilot = false;
      this.damage = [];
      this.range = [];
      this.synergy_locations = [];
      this.tech_attack = false;
      this.frequency = 'Unlimited';
      this.init = '';
      this.trigger = '';
      this.isEdit = false;
      this.editIndex = -1;
    },
  },
};
</script>
