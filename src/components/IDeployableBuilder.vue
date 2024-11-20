<template>
  <v-card>
    <v-toolbar density="compact" color="primary" title="Deployables" />
    <v-card flat>
      <v-tooltip
        v-for="(deployable, i) in item.deployables"
        :key="`deployable_chip_${item.id}-${i}`"
        top
      >
        <template v-slot:activator="{ props }">
          <v-chip
            small
            class="mx-1"
            @click="edit(deployable, i)"
            v-bind="props"
          >
            {{ deployable.name }} ({{ deployable.type }})
          </v-chip>
        </template>
        <div>
          Activation: {{ deployable.activation }} // Deactivation:
          {{ deployable.deactivation || '--' }} // Recall:
          {{ deployable.recall || '--' }} // Redeploy:
          {{ deployable.redeploy || '--' }}
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
            small
            class="mx-1"
            v-html="`${deployable.armor ? `  Armor: ${deployable.armor}` : ''}`"
          />
          <v-chip
            small
            class="mx-1"
            v-html="`${deployable.hp ? `  HP: ${deployable.hp}` : ''}`"
          />
          <v-chip
            small
            class="mx-1"
            v-html="
              `${deployable.evasion ? `  Evasion: ${deployable.evasion}` : ''}`
            "
          />
          <v-chip
            small
            class="mx-1"
            v-html="`${deployable.edef ? `  EDef: ${deployable.edef}` : ''}`"
          />
          <v-chip
            small
            class="mx-1"
            v-html="
              `${deployable.heatcap ? `  Heatcap: ${deployable.heatcap}` : ''}`
            "
          />
          <v-chip
            small
            class="mx-1"
            v-html="
              `${deployable.repcap ? `  Repcap: ${deployable.repcap}` : ''}`
            "
          />
          <v-chip
            small
            class="mx-1"
            v-html="
              `${
                deployable.sensor_range
                  ? `  Sensors: ${deployable.sensor_range}`
                  : ''
              }`
            "
          />
          <v-chip
            small
            class="mx-1"
            v-html="
              `${
                deployable.tech_attack
                  ? `  Tech Atk: ${deployable.tech_attack}`
                  : ''
              }`
            "
          />
          <v-chip
            small
            class="mx-1"
            v-html="`${deployable.save ? `  Save: ${deployable.save}` : ''}`"
          />
          <v-chip
            small
            class="mx-1"
            v-html="`${deployable.speed ? `  Speed: ${deployable.speed}` : ''}`"
          />
          <v-chip
            small
            class="mx-1"
            v-html="`${deployable.size ? `  Size: ${deployable.size}` : ''}`"
          />
        </div>
        <div v-if="deployable.tags">
          <v-divider />
          <v-chip small v-for="t in deployable.tags" :key="t.id">{{
            t
          }}</v-chip>
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
          <v-toolbar
            density="compact"
            color="pink darken-4"
            title="Add Deployable"
          >
            <v-btn icon @click="dialog = false"
              ><v-icon icon="mdi-close"
            /></v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row justify="space-around" align="center" class="mt-2">
              <v-col>
                <v-text-field label="Name" hide-details v-model="name" />
              </v-col>
              <v-col>
                <v-text-field
                  label="Deployable Type"
                  hide-details
                  v-model="type"
                />
              </v-col>
              <v-col>
                <v-select
                  label="Size"
                  :items="[0, 0.5, 1, 2, 3, 4]"
                  hide-details
                  v-model="size"
                />
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
            <v-row density="compact">
              <v-col>
                <activator-selector :item="this" label="Activation" />
              </v-col>
              <v-col>
                <activator-selector
                  :item="this"
                  label="Deactivation"
                  field="deactivation"
                  optional
                />
              </v-col>
              <v-col>
                <activator-selector
                  :item="this"
                  label="Recall"
                  field="recall"
                  optional
                />
              </v-col>
              <v-col>
                <activator-selector
                  :item="this"
                  label="Redeploy"
                  field="redeploy"
                  optional
                />
              </v-col>
            </v-row>
            <v-row
              density="compact"
              align="center"
              justify="space-around"
              class="my-4"
            >
              <v-col>
                <v-text-field
                  v-model="instances"
                  type="number"
                  label="Instances"
                  density="compact"
                  clearable
                  hide-details
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="cost"
                  type="number"
                  label="Use Cost"
                  density="compact"
                  clearable
                  hide-details
                />
              </v-col>
              <v-col v-show="!npc" class="mt-n4">
                <v-switch
                  color="secondary"
                  v-model="pilot"
                  label="Pilot"
                  density="compact"
                  hide-details
                />
              </v-col>
              <v-col v-show="!npc" class="mt-n4">
                <v-switch
                  color="secondary"
                  v-model="mech"
                  label="Mech"
                  density="compact"
                  hide-details
                />
              </v-col>
            </v-row>
            <v-row
              density="compact"
              align="center"
              justify="space-around"
              class="my-2"
            >
              <v-col v-for="k in stats" :key="`dep_stat_${k}`" cols="2">
                <tiered-stat-input
                  v-if="npc"
                  v-model="$data[k]"
                  :title="k.replaceAll('_', ' ')"
                />
                <v-text-field
                  v-else
                  v-model="$data[k]"
                  type="number"
                  :label="k.replaceAll('_', ' ')"
                  density="compact"
                  clearable
                  hide-details
                />
              </v-col>
            </v-row>
            <v-divider class="my-4" />
            <v-row density="compact" align="center">
              <v-col><i-action-builder :item="this" npc /></v-col>
              <v-col><i-bonus-builder :item="this" npc /></v-col>
              <v-col><i-counter-builder :item="this" /></v-col>
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
];

export default {
  name: 'deployable-builder',
  props: { item: { type: Object, required: true }, npc: { type: Boolean } },

  data: () => ({
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
    armor: '',
    hp: '',
    evasion: '',
    edef: '',
    heatcap: '',
    repcap: '',
    sensor_range: '',
    tech_attack: '',
    save: '',
    speed: '',
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
      return !!this.name && !!this.type && !!this.detail && (!!this.size || this.type == "Mine");
    },
  },
  methods: {
    newItem(): void {
      this.reset();
      this.dialog = true;
    },
    submit(): void {
      const tmp = {
        name: this.name,
        type: this.type,
        detail: this.detail,
        size: this.size,
        activation: this.activation,
        deactivation: this.deactivation,
        recall: this.recall,
        redeploy: this.redeploy,
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
      };

      const {"size" : _, ...mine} = tmp;
      const e = (this.type == "Mine" || this.size == 0) ? mine : tmp;

      if (this.isEdit) {
        this.item.deployables[this.editIndex] = e;
      } else {
        if (!this.item.deployables) this.item['deployables'] = [];
        this.item.deployables.push(e);
      }
      this.reset();
      this.dialog = false;
    },
    edit(deployable: any, index: number): void {
      this.reset();
      this.name = deployable.name || '';
      this.type = deployable.type || '';
      this.detail = deployable.detail || '';
      this.size = deployable.size || 1;
      this.activation = deployable.activation || '';
      this.deactivation = deployable.deactivation || '';
      this.recall = deployable.recall || '';
      this.redeploy = deployable.redeploy || '';
      this.instances = deployable.instances || 1;
      this.cost = deployable.cost || 1;
      this.armor = deployable.armor || '';
      this.hp = deployable.hp || '';
      this.evasion = deployable.evasion || '';
      this.edef = deployable.edef || '';
      this.heatcap = deployable.heatcap || '';
      this.repcap = deployable.repcap || '';
      this.sensor_range = deployable.sensor_range || '';
      this.tech_attack = deployable.tech_attack || '';
      this.save = deployable.save || '';
      this.speed = deployable.speed || '';
      this.pilot = deployable.pilot || false;
      this.mech = deployable.mech || false;
      this.actions = deployable.actions || [];
      this.bonuses = deployable.bonuses || [];
      this.synergies = deployable.synergies || [];
      this.counters = deployable.counters || [];
      this.isEdit = true;
      this.editIndex = index;
      this.dialog = true;
    },
    remove() {
      this.item.deployables.splice(this.editIndex, 1);
      this.dialog = false;
    },
    reset(): void {
      this.name = '';
      this.type = '';
      this.detail = '';
      this.size = 1;
      this.activation = '';
      this.deactivation = '';
      this.recall = '';
      this.redeploy = '';
      this.instances = 1;
      this.cost = 1;
      this.armor = '';
      this.hp = '';
      this.evasion = '';
      this.edef = '';
      this.heatcap = '';
      this.repcap = '';
      this.sensor_range = '';
      this.tech_attack = '';
      this.save = '';
      this.speed = '';
      this.pilot = false;
      this.mech = false;
      this.actions = [];
      this.bonuses = [];
      this.synergies = [];
      this.counters = [];
    },
  },
};
</script>
