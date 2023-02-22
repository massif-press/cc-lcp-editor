<template>
  <v-card outlined>
    <div class="text-caption">DAMAGE</div>
    <v-card flat>
      <v-chip
        v-for="(damage, i) in item.damage"
        :key="`damage_chip_${item.id}-${i}`"
        small
        class="mx-1"
        :color="getColor(damage.type)"
        @click="edit(damage, i)"
      >
        {{ damage.val }} {{ damage.type }}
      </v-chip>

      <v-menu
        v-model="menu"
        width="20em"
        :close-on-click="false"
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ props }">
          <v-btn icon size="small" flat @click="addNew()" v-bind="props"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </template>
        <v-card>
          <v-toolbar density="compact" color="pink darken-4" title="Add Damage">
            <v-btn icon @click="menu = false"
              ><v-icon icon="mdi-close"
            /></v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row justify="space-around" align="center">
              <v-col cols="7">
                <v-select
                  v-model="damage.type"
                  item-text="name"
                  item-value="id"
                  label="Damage"
                  :items="damageTypes"
                  hide-details
                />
              </v-col>
              <v-col>
                <tiered-stat-input
                  v-if="npc"
                  v-model="damage.val"
                  title="Value"
                />
                <v-text-field
                  v-else
                  v-model="damage.val"
                  label="Value"
                  hide-details
                  outlined
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-btn variant="tonal" color="error" @click="remove()"
              >delete</v-btn
            >
            <v-spacer />
            <v-btn color="success darken-2" @click="submit">
              {{ isEdit ? 'save' : 'confirm' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { damageType } from '../assets/enums';

export default {
  name: 'damage-selector',
  props: { item: { type: Object, required: true }, npc: { type: Boolean } },
  data: () => ({
    menu: false,
    damage: {} as any,
    isEdit: false,
    editIndex: -1,
    damageTypes: damageType,
  }),
  methods: {
    getColor(type: string) {
      switch (type) {
        case 'Energy':
          return 'blue darken-2';
        case 'Explosive':
          return 'yellow';
        case 'Heat':
          return 'red';
        case 'Burn':
          return 'pink';
        case 'Variable':
          return 'purple-accent-1';
        case 'Kinetic':
        default:
          return '';
      }
    },
    submit() {
      if (!this.damage) return;
      if (!isNaN(this.damage.val)) {
        this.damage.val = Number(this.damage.val);
      }
      if (this.isEdit) {
        this.item.damage[this.editIndex] = this.damage;
      } else {
        if (!this.item.damage) this.item['damage'] = [];
        this.item.damage.push(this.damage);
      }
      this.damage = {};
      this.isEdit = false;
      this.editIndex = -1;
      this.menu = false;
    },
    addNew() {
      this.damage = {};
      this.isEdit = false;
      this.editIndex = -1;
      this.menu = true;
    },
    edit(damage: any, index: number) {
      if (!isNaN(this.damage.val)) {
        this.damage.val = Number(this.damage.val);
      }
      this.damage = { ...damage };
      this.isEdit = true;
      this.editIndex = index;
      this.menu = true;
    },
    remove() {
      this.item.damage.splice(this.editIndex, 1);
      this.menu = false;
      this.isEdit = false;
      this.editIndex = -1;
    },
  },
};
</script>
