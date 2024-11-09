<template>
  <v-card>
    <v-toolbar density="compact" color="primary" title="Synergies" />
    <v-card flat>
      <v-tooltip
        v-for="(synergy, i) in item.synergies"
        :key="`synergy_chip_${item.id}-${i}`"
        top
      >
        <template v-slot:activator="{ props }">
          <v-chip small class="mx-1" @click="edit(synergy, i)" v-bind="props">
            {{ synergy.locations.join(', ') }}
          </v-chip>
        </template>
        <div v-html="synergy.detail" />
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
            title="Add Synergy"
          >
            <v-btn icon @click="dialog = false"
              ><v-icon icon="mdi-close"
            /></v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row justify="space-around" align="center" class="mt-2">
              <v-col cols="12">
                <v-select
                  label="Synergy Locations"
                  :items="npc ? npcSynergies : synergies"
                  item-value="value"
                  item-text="desc"
                  multiple
                  hide-details
                  v-model="locations"
                />
              </v-col>
              <v-col cols="12">
                <rich-text-editor title="Detail" v-model="detail" />
              </v-col>
            </v-row>
            <div v-show="!npc">
              <v-divider class="mb-2 mt-3" />
              <div class="text-caption">Restrict to:</div>
              <v-row density="compact" align="center">
                <v-col cols="4">
                  <v-select
                    v-model="wt"
                    :items="weaponType"
                    density="compact"
                    multiple
                    hide-details
                    label="Weapon Types"
                  />
                </v-col>
                <v-col cols="4">
                  <v-select
                    v-model="ws"
                    :items="weaponSize"
                    density="compact"
                    multiple
                    hide-details
                    label="Weapon Sizes"
                  />
                </v-col>
                <v-col cols="4">
                  <v-select
                    v-model="st"
                    :items="systemType"
                    density="compact"
                    multiple
                    hide-details
                    label="System Types"
                  />
                </v-col>
              </v-row>
            </div>
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
              :disabled="!locations.length || !detail"
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
import {
  synergyLocations,
  npcSynergyLocations,
  weaponType,
  weaponSize,
  systemType,
} from '../assets/enums';
import RichTextEditor from './RichTextEditor.vue';

export default {
  name: 'synergy-builder',
  components: { RichTextEditor },
  props: { item: { type: Object, required: true }, npc: { type: Boolean } },
  data: () => ({
    synergies: synergyLocations,
    npcSynergies: npcSynergyLocations,
    weaponType: weaponType,
    weaponSize: weaponSize,
    systemType: systemType,
    dialog: false,
    locations: [],
    detail: '',
    wt: [],
    ws: [],
    st: [],
    isEdit: false,
    editIndex: -1,
  }),
  methods: {
    newItem(): void {
      this.reset();
      this.dialog = true;
    },
    submit() {
      const e = {
        locations: this.locations,
        detail: this.detail,
        weapon_types: this.wt,
        weapon_sizes: this.ws,
        system_types: this.st,
      };
      if (this.isEdit) {
        this.item.synergies[this.editIndex] = e;
      } else {
        if (!this.item.synergies) this.item['synergies'] = [];
        this.item.synergies.push(e);
      }
      this.reset();
      this.dialog = false;
    },
    edit(synergy: any, index: number): void {
      this.reset();
      this.locations = synergy.locations;
      this.detail = synergy.detail;
      this.wt = synergy.wt;
      this.ws = synergy.ws;
      this.st = synergy.st;
      this.isEdit = true;
      this.editIndex = index;
      this.dialog = true;
    },
    remove() {
      this.item.synergies.splice(this.editIndex, 1);
      this.dialog = false;
    },
    descById(id: string) {
      return this.synergies.find((x) => x.value === id)?.desc || 'err';
    },
    reset() {
      this.locations = [];
      this.detail = '';
      this.wt = [];
      this.ws = [];
      this.st = [];
      this.isEdit = false;
    },
  },
};
</script>
