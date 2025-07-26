<template>
  <v-dialog v-model="dialog" fullscreen>
    <v-card>
      <v-toolbar
        density="compact"
        color="orange-darken-4"
        :title="`${
          manufacturer ? manufacturer.id : isExotic ? 'Exotic' : ''
        } Weapon Editor`"
      >
        <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row justify="space-around" align="center">
          <v-col>
            <id-input v-model="id" :name="name"/>
          </v-col>
          <v-col cols="4">
            <v-text-field label="Name" hide-details v-model="name" />
          </v-col>
          <v-col>
            <v-select
              label="Size"
              :items="weaponSizes"
              hide-details
              v-model="mount"
            />
          </v-col>
          <v-col>
            <v-select
              label="Type"
              :items="weaponTypes"
              hide-details
              v-model="type"
            />
          </v-col>
          <v-col><v-divider vertical /></v-col>
          <v-col>
            <v-text-field
              label="SP Cost"
              type="number"
              hide-details
              v-model="sp"
            />
          </v-col>
          <!-- <v-col>
            <v-text-field
              label="Use Cost"
              type="number"
              hide-details
                            v-model="cost"
            />
          </v-col> -->
        </v-row>
        <v-row v-if="!sourceless">
          <v-col>
            <v-combobox
              v-model="license"
              label="License"
              hide-details
              :items="licenses"
            />
          </v-col>
          <v-col>
            <v-text-field
              label="License Level"
              type="number"
              hide-details
              v-model="license_level"
            />
          </v-col>
          <v-col v-if="manufacturer && manufacturer.id === 'GMS'" cols="auto">
            <v-tooltip location="start" width="300px">
              <template v-slot:activator="{ props }">
                <v-icon class="pr-6" v-bind="props" icon="mdi-information" />
              </template>
              <span>
                Setting the License Level to <code>0</code> and the License
                field empty will register this item as a GMS generic available
                from Pilot LL0
              </span>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <rich-text-editor title="Description" v-model="description" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <rich-text-editor title="Effect" v-model="effect" />
          </v-col>
        </v-row>

        <v-row density="compact" justify="space-around">
          <v-col cols="auto">
            <v-switch
              color="secondary"
              density="compact"
              hide-details
              label="Prohibit Attack Action"
              v-model="no_attack"
            />
          </v-col>
          <v-col cols="auto">
            <v-switch
              color="secondary"
              density="compact"
              hide-details
              label="Prohibit Attached Mods"
              v-model="no_mods"
            />
          </v-col>
          <v-col cols="auto">
            <v-switch
              color="secondary"
              density="compact"
              hide-details
              label="Ignore Core Bonus Effects"
              v-model="no_core_bonus"
            />
          </v-col>
          <v-col cols="auto">
            <v-switch
              color="secondary"
              density="compact"
              hide-details
              label="Ignore Bonus Effects"
              v-model="no_bonus"
            />
          </v-col>
          <v-col cols="auto">
            <v-switch
              color="secondary"
              density="compact"
              hide-details
              label="Ignore Synergies"
              v-model="no_synergy"
            />
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col>
            <rich-text-editor title="Effect" v-model="effect" />
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
        </v-row> -->

        <!-- <v-row>
          <v-col>
            <damage-selector :item="this" />
          </v-col>
          <v-col>
            <range-selector :item="this" />
          </v-col>
        </v-row> -->

        <!-- <v-row align="center">
          <v-col><i-action-builder :item="this" /></v-col>
          <v-col><i-bonus-builder :item="this" /></v-col>
          <v-col><i-deployable-builder :item="this" /></v-col>
        </v-row>
        <v-row align="center">
          <v-col><i-synergy-builder :item="this" /></v-col>
          <v-col><i-counter-builder :item="this" /></v-col>
          <v-col><integrated-selector :item="this" /></v-col>
          <v-col><special-equipment-selector :item="this" /></v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <tag-selector :item="this" />
          </v-col>
        </v-row> -->
        <v-row align="center">
          <v-col
            ><i-profile-builder
              v-for="(p, i) in profiles"
              :parent="this"
              :profile="p"
              :index="i"
          /></v-col>
        </v-row>
        <v-row align="center" v-if="profiles && profiles.length > 1">
          <v-col>
            <tag-selector :item="this" />
        </v-col>
      </v-row>

        <v-btn block color="primary darken-3" @click="addProfile()">
          <v-icon>mdi-plus</v-icon>
          Add Weapon Profile
        </v-btn>
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
import { getLicenseID } from '../../utilities/cleanup';
import { weaponType, weaponSize } from '../../../assets/enums';

import IProfileBuilder from '../../../components/IProfileBuilder.vue';

export default {
  name: 'weapon-editor',
  props: {
    manufacturer: { type: Object, required: false },
    isExotic: Boolean,
    licenses: { type: Array, required: false, default: () => [] },
  },
  components: {
    IProfileBuilder,
  },
  data: () => ({
    dialog: false,
    id: '',
    name: '',
    license: '',
    license_level: 1,
    description: '',
    effect: '',
    weaponTypes: weaponType,
    weaponSizes: weaponSize,
    mount: 'Auxiliary',
    type: 'Melee',

    no_attack: false,
    no_mods: false,
    no_core_bonus: false,
    no_bonus: false,
    no_synergy: false,

    sp: 0,
    tags: [],

    profiles: [
      {
        name: '',
        effect: '',
        barrage: true,
        skirmish: true,
        cost: 0,
        on_attack: '',
        on_hit: '',
        on_crit: '',
        damage: [],
        range: [],
        actions: [],
        bonuses: [],
        synergies: [],
        deployables: [],
        counters: [],
        integrated: [],
        special_equipment: [],
        tags: [],
      },
    ],
    isEdit: false,
  }),
  computed: {
    confirmOK(): boolean {
      return !!this.id && !!this.name && !!this.mount;
    },
    source(): string {
      if (this.manufacturer) return this.manufacturer.id;
      if (
        (this.profiles &&
          this.profiles
            .map((p) => p.tags)
            .some((x: any) => x && x.id === 'tg_exotic')) ||
        this.isExotic
      )
        return 'EXOTIC';
      return '';
    },
    sourceless(): boolean {
      return !this.source || this.source === 'EXOTIC';
    },
  },
  methods: {
    open() {
      if (!this.isEdit && this.manufacturer && this.manufacturer.id === 'GMS') {
        this.license_level = 0;
      }
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    submit(): void {
      this.profiles.forEach((profile) => this.cleanProfileText(profile));
      const e = {
        id: this.id,
        name: this.name,
        source: this.source,
        license: this.license,
        license_id: getLicenseID(
          this.license,
          this.$store.getters.lcp.frames || []
        ),
        license_level: Number(this.license_level),
        description: this.description,
        effect: this.effect,
        mount: this.mount,
        type: this.type,
        no_attack: this.no_attack,
        no_mods: this.no_mods,
        no_core_bonus: this.no_core_bonus,
        no_bonus: this.no_bonus,
        no_synergy: this.no_synergy,
        sp: this.sp,
        tags: this.tags,
        profiles: this.profiles,
      };
      this.$emit('save', e);
      this.reset();
      this.dialog = false;
    },
    cleanProfileText(profile: any): void {
      let is_empty_text = (s) => (s == "<p></p>" || s == "<div></div>");
      if (is_empty_text(profile.on_attack)) {
        profile.on_attack = undefined;
      }
      if (is_empty_text(profile.on_hit)) {
        profile.on_hit = undefined;
      }
      if (is_empty_text(profile.on_crit)) {
        profile.on_crit = undefined;
      }
      if (is_empty_text(profile.effect)) {
        profile.effect = undefined;
      }
    },
    edit(weapon: any): void {
      this.id = weapon.id;
      this.name = weapon.name;
      this.license = weapon.license;
      this.license_level = Number(weapon.license_level);
      this.description = weapon.description;
      this.effect = weapon.effect;
      this.mount = weapon.mount;
      this.type = weapon.type;
      this.no_attack = weapon.no_attack;
      this.no_mods = weapon.no_mods;
      this.no_core_bonus = weapon.no_core_bonus;
      this.no_bonus = weapon.no_bonus;
      this.no_synergy = weapon.no_synergy;
      this.sp = weapon.sp;
      this.tags = weapon.tags;
      this.profiles = this.getProfiles(weapon);
      this.isEdit = true;
      this.dialog = true;
    },
    getProfiles(w: any) {
      if (w.profiles && w.profiles.length) return w.profiles;
      return [
        {
          name: w.name,
          effect: w.effect,
          barrage: w.barrage,
          skirmish: w.skirmish,
          cost: w.cost,
          on_attack: w.on_attack,
          on_hit: w.on_hit,
          on_crit: w.on_crit,
          damage: w.damage,
          range: w.range,
          actions: w.actions,
          bonuses: w.bonuses,
          synergies: w.synergies,
          deployables: w.deployables,
          counters: w.counters,
          integrated: w.integrated,
          special_equipment: w.special_equipment,
          tags: (w.tags) ? [...w.tags] : [],
        },
      ];
    },
    remove(): void {
      this.$emit('remove', this.id);
      this.dialog = false;
    },
    reset(): void {
      this.id = '';
      this.name = '';
      this.license = '';
      this.license_level = 1;
      this.description = '';
      this.effect = '';
      this.mount = 'Auxiliary';
      this.type = 'Melee';
      this.no_attack = false;
      this.no_mods = false;
      this.no_core_bonus = false;
      this.no_bonus = false;
      this.no_synergy = false;
      this.sp = 0;
      this.tags = [];
      this.profiles = [
        {
          name: '',
          effect: '',
          barrage: true,
          skirmish: true,
          cost: 0,
          on_attack: '',
          on_hit: '',
          on_crit: '',
          damage: [],
          range: [],
          actions: [],
          bonuses: [],
          synergies: [],
          deployables: [],
          counters: [],
          integrated: [],
          special_equipment: [],
          tags: [],
        },
      ];
      this.isEdit = false;
    },
    addProfile() {
      this.profiles.push({
        name: '',
        effect: '',
        barrage: true,
        skirmish: true,
        cost: 0,
        on_attack: '',
        on_hit: '',
        on_crit: '',
        damage: [],
        range: [],
        actions: [],
        bonuses: [],
        synergies: [],
        deployables: [],
        counters: [],
        integrated: [],
        special_equipment: [],
        tags: [],
      });
    },
  },
};
</script>
