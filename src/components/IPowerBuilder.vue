<template>
  <v-card>
    <v-toolbar density="compact" color="amber darken-4" title="Powers" />
    <v-card flat>
      <v-tooltip
        v-for="(power, i) in item.powers"
        :key="`power_chip_${item.id}-${i}`"
        top
      >
        <template v-slot:activator="{ props }">
          <v-chip small class="mx-1" @click="edit(power, i)" v-bind="props">
            {{ power.name }}
          </v-chip>
        </template>
        {{ power.id }}
        <v-divider />
        <div v-if="power.name">{{ power.name }}</div>
        <div v-if="power.frequency">Frequency: {{ power.frequency }}</div>
        <div v-if="power.description">{{ power.description }}</div>
        <div v-if="power.veteran">Veteran Power</div>
        <div v-if="power.master">Master Power</div>
      </v-tooltip>
      <v-dialog v-model="dialog">
        <template v-slot:activator="{ props }">
          <v-btn size="small" icon variant="flat" v-bind="props"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </template>
        <v-card>
          <v-toolbar
            density="compact"
            color="pink darken-4"
            title="Add Power"
          >
            <v-btn icon @click="dialog = false"
              ><v-icon icon="mdi-close"
            /></v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row justify="space-around" align="center" class="mt-2">
              <v-col>
                <v-text-field
                  v-model="power.name"
                  label="Name"
                  hide-details
                />
              </v-col>
              <v-col>
                <v-combobox
                  v-model="power.frequency"
                  :items="frequencies"
                  label="Frequency"
                  hide-details
                />
              </v-col>
              <v-col>
                <v-row justify="space-around" align="center" class="mt-2">
                  <v-checkbox v-model="power.veteran" label="Veteran Power"/>
                  <v-checkbox v-model="power.master" label="Master Power"/>
                </v-row>
              </v-col>
            </v-row>
            <v-divider />
            <v-row justify="space-around" align="center" class="mt-2">
              <v-col>
                <v-textarea
                  v-model="power.description"
                  label="Description"
                  auto-grow
                  rows="1" 
                  hide-details
                />
              </v-col>
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
              :disabled="!power.name || !power.description"
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
import { frequencyOptions } from '../assets/enums';

export default {
  name: 'power-builder',
  props: { item: { type: Object, required: true } },
  data: () => ({
    dialog: false,
    power: {} as any,
    frequencies: frequencyOptions,
    isEdit: false,
    editIndex: -1,
  }),
  mounted () {
    if (!this.item.powers) this.item.powers = [];
  },
  methods: {
    submit() {
      if (!this.power) return;
      if (this.power.veteran){
        this.power.prerequisite = `If you have two or more powers from this bond, you can choose a power from any other bond instead of one from this bond when you would gain a power. You can do this twice. If you have at least one veteran power, gain the ${this.power.name}.`;
      } else if (this.power.master){
        this.power.prerequisite = "You may only gain this power if you’ve taken four powers from this bond, including the Veteran Power.";
      } else {
        this.power.prerequisite = undefined;
      }
      if (this.isEdit) {
        this.item.powers[this.editIndex] = this.power;
      } else {
        if (!this.item.powers) this.item.powers = [];
        this.item.powers.push(this.power);
      }
      this.power = {};
      this.isEdit = false;
      this.editIndex = -1;
      this.dialog = false;
    },
    edit(power: any, index: number) {
      this.power = { ...power };
      this.isEdit = true;
      this.editIndex = index;
      this.dialog = true;
    },
    remove() {
      this.item.powers.splice(this.editIndex, 1);
      this.dialog = false;
    },
  },
};
</script>
