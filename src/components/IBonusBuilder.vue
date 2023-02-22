<template>
  <v-card>
    <v-toolbar density="compact" color="primary" title="Bonuses" />
    <v-card flat>
      <v-tooltip
        v-for="(bonus, i) in item.bonuses"
        :key="`bonus_chip_${item.id}-${i}`"
        top
      >
        <template v-slot:activator="{ props }">
          <v-chip
            small
            outlined
            class="mx-1"
            @click="edit(bonus, i)"
            v-bind="props"
          >
            {{ bonus.id }}, {{ bonus.val }}
          </v-chip>
        </template>
        {{ descById(bonus.id) }}: {{ bonus.val }}
        <v-divider />
        <div v-if="restrictions(bonus).length">
          Restricted to: {{ restrictions(bonus) }}
        </div>
        <div v-if="bonus.overwrite">
          Overwrite:
          <b class="warning--text">true</b>
        </div>
        <div v-if="bonus.replace">
          Replace:
          <b class="warning--text">true</b>
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
          <v-toolbar density="compact" color="pink darken-4" title="Add Bonus">
            <v-btn icon @click="dialog = false"
              ><v-icon icon="mdi-close"
            /></v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row justify="space-around" align="center" class="mt-2">
              <v-col cols="8">
                <v-select
                  label="Bonus"
                  :items="npc ? npcBonuses : bonuses"
                  return-object
                  item-text="desc"
                  v-model="bonus"
                />
              </v-col>
              <v-col cols="3">
                <div v-if="!bonus" class="text--disabled">Select Bonus</div>
                <div v-else-if="bonus.type === 'integer'">
                  <tiered-stat-input
                    v-if="npc"
                    v-model="value"
                    title="Integer"
                  />
                  <v-text-field
                    v-else
                    v-model="value"
                    label="Integer"
                    outlined
                  />
                </div>
                <div v-else-if="bonus.type === 'boolean'">
                  <v-radio-group v-model="value" mandatory>
                    <v-radio value="true" label="True" />
                    <v-radio value="false" label="False" />
                  </v-radio-group>
                </div>
                <div v-else>
                  <tiered-stat-input
                    v-if="npc"
                    v-model="value"
                    title="String"
                  />
                  <v-text-field
                    v-else
                    v-model="value"
                    label="String"
                    outlined
                  />
                </div>
              </v-col>
            </v-row>
            <v-divider />
            <div class="text-caption">Restrict to:</div>
            <v-row density="compact" align="center">
              <v-col cols="3">
                <v-select
                  v-model="dt"
                  :items="damageType"
                  density="compact"
                  outlined
                  multiple
                  hide-details
                  label="Damage Types"
                />
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="rt"
                  :items="rangeType"
                  density="compact"
                  outlined
                  multiple
                  hide-details
                  label="Range Types"
                />
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="wt"
                  :items="weaponType"
                  density="compact"
                  outlined
                  multiple
                  hide-details
                  label="Weapon Types"
                />
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="ws"
                  :items="weaponSize"
                  density="compact"
                  outlined
                  multiple
                  hide-details
                  label="Weapon Sizes"
                />
              </v-col>
            </v-row>
            <v-divider />
            <v-row>
              <v-col cols="auto">
                <v-tooltip top width="50em">
                  <template v-slot:activator="{ props }">
                    <span v-bind="props">
                      <v-switch
                        color="secondary"
                        v-model="overwrite"
                        label="Overwite"
                      />
                    </span>
                  </template>
                  The overwrite flag will overwrite any integer value bonus with
                  the highest bonus of the same type from any source that has an
                  overwrite flag. Which is to say: all applicable bonuses of
                  that bonus ID will be collected and everything will be
                  discarded except for the bonus of the highest value that has
                  an overwrite flag. Eg: a mech with items that give +4, +2, +3
                  (overwrite) and +2 (overwrite) AI Cap will result in a +3 AI
                  Cap bonus. This flag is not necessary for non-integer values.
                </v-tooltip>
              </v-col>
              <v-col cols="auto">
                <v-tooltip top width="50em">
                  <template v-slot:activator="{ props }">
                    <span v-bind="props">
                      <v-switch
                        color="secondary"
                        v-model="replace"
                        label="Replace"
                      />
                    </span>
                  </template>
                  The replace flag will replace any integer value in the target
                  item, pilot, or mech with the total collected replace bonus
                  value. Eg. a mech with a base HP of 8 and the following
                  bonuses: +1, +1 and 3 (replace) will result in a mech with a
                  final HP of 5 (5 replaced by 3, +1 +1). A mech with a base HP
                  of 8 and the following bonuses: +1, 3 (replace), and 3
                  (replace) will result in a mech with a final HP of 7 (5
                  replaced by 3 + 3, then +1).
                </v-tooltip>
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
              :disabled="!bonus || !value"
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
  bonuses,
  npcBonuses,
  weaponType,
  weaponSize,
  damageType,
  rangeType,
} from '../assets/enums';

import TieredStatInput from './TieredStatInput.vue';
export default {
  components: { TieredStatInput },
  name: 'bonus-builder',
  props: { item: { type: Object, required: true }, npc: { type: Boolean } },
  data: () => ({
    bonuses: bonuses,
    npcBonuses: npcBonuses,
    weaponType: weaponType,
    weaponSize: weaponSize,
    damageType: damageType,
    rangeType: rangeType,
    dialog: false,
    bonus: null as any,
    value: '' as any,
    dt: [],
    wt: [],
    rt: [],
    ws: [],
    overwrite: false,
    replace: false,
    isEdit: false,
    editIndex: -1,
  }),
  methods: {
    newItem(): void {
      this.reset();
      this.dialog = true;
    },
    submit() {
      if (!this.bonus) return;
      const e = {
        id: (this.bonus as any).value,
        val: this.value,
        damage_types: this.dt,
        range_types: this.rt,
        weapon_types: this.wt,
        weapon_sizes: this.ws,
        overwrite: this.overwrite,
        replace: this.replace,
      };
      if (!isNaN(e.val)) {
        e.val = Number(e.val);
      }
      if (this.isEdit) {
        this.item.bonuses[this.editIndex] = e;
      } else {
        if (!this.item.bonuses) this.item['bonuses'] = [];
        this.item.bonuses.push(e);
      }
      this.reset();
      this.dialog = false;
    },
    edit(bonus: any, index: number): void {
      this.reset();
      this.bonus = this.bonuses.find((x) => x.value === bonus.id) as any;
      this.value = bonus.val;
      this.dt = bonus.damage_types;
      this.rt = bonus.range_types;
      this.wt = bonus.weapon_types;
      this.ws = bonus.weapon_sizes;
      this.overwrite = bonus.overwrite;
      this.replace = bonus.replace;
      this.isEdit = true;
      this.editIndex = index;
      this.dialog = true;
    },
    remove() {
      this.item.bonuses.splice(this.editIndex, 1);
      this.dialog = false;
    },
    descById(id: string) {
      return (
        (this.bonuses as any[]).find((x: any) => x.value === id)?.desc || 'err'
      );
    },
    restrictions(bonus: any) {
      return []
        .concat(bonus.weapon_types || [])
        .concat(bonus.weapon_sizes || [])
        .concat(bonus.range_types || [])
        .concat(bonus.damage_types || []);
    },
    reset() {
      this.bonus = null;
      this.value = '';
      this.dt = this.wt = this.rt = this.ws = [];
      this.overwrite = this.replace = this.isEdit = false;
      this.editIndex = -1;
    },
  },
};
</script>
