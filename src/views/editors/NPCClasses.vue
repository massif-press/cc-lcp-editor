<template>
  <div>
    <v-row>
      <v-col cols="auto">
        <v-list nav density="compact">
          <v-list-item
            v-for="c in classes"
            :key="`${c[0].id || 'new'}_$`"
            :class="selected && selected[0].id === c[0].id ? 'primary darken-3' : ''"
            selectable
            :title="c[0].name"
            @click="selected = c"
          >
            <template v-slot:subtitle="{ subtitle }">
              {{ getFeatures(c, false).length }} base features /
              {{ getFeatures(c, true).length }} optional
            </template>
          </v-list-item>
          <!-- <v-divider class="my-2" />
          <v-list-item @click="selected = 'generic'" title="Generic Features">
            <template v-slot:subtitle="{ subtitle }">
              {{ getFeatures('generic').length }} base features /
              {{ getFeatures('generic', true).length }} optional
            </template>
          </v-list-item> -->
        </v-list>
        <v-divider class="my-2" />
        <v-btn block color="secondary" @click="addNew">
          <v-icon left>mdi-plus</v-icon>
          Add New Class
        </v-btn>
      </v-col>
      <v-col>
        <v-container v-if="selected">
          <v-card outlined>
            <v-toolbar
              density="compact"
              color="primary"
              :title="selected[0].name"
            />
            <v-card-text>
              <v-row density="compact" justify="space-around" align="end">
                <v-col cols="3">
                  <id-input v-model="selected[0].id" />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="selected[0].name"
                    hide-details
                    label="Name"
                  />
                </v-col>
                <v-col cols="3">
                  <v-select
                    label="Role"
                    :items="roles"
                    v-model="selected[0].role"
                    hide-details
                  />
                </v-col>
              </v-row>
              <v-row density="compact" justify="space-around" align="center">
                <v-col cols="12">
                  <v-textarea
                    label="Short Description"
                    density="compact"
                    hide-details
                    rows="2"
                    v-model="selected[0].info.terse"
                  />
                </v-col>
                <v-col cols="12">
                  <rich-text-editor
                    title="Flavor"
                    v-model="selected[0].info.flavor"
                  />
                </v-col>
                <v-col cols="12">
                  <rich-text-editor
                    title="Tactics"
                    v-model="selected[0].info.tactics"
                  />
                </v-col>
              </v-row>
              <v-divider class="mt-3 mb-5" />
              <v-row class="px-2" justify="space-around">
                <v-col
                  v-show="key !== 'size'"
                  v-for="key in Object.keys(selected[0].stats)"
                  :key="`stat_${key}`"
                  cols="auto"
                  class="pa-1"
                >
                  <tiered-stat-input
                    v-model="selected[0].stats[key]"
                    :title="key"
                  />
                </v-col>
                <v-col cols="auto" class="pa-1"
                  ><tiered-size-input v-model="selected[0].stats.size"
                /></v-col>
              </v-row>
              <v-divider class="mb-3 mt-5" /> 
              <v-row>
                <v-col>
                  <v-card>
                    <v-toolbar density="compact" title="Base Features" />
                    <v-card-text>
                      <v-row>
                        <v-col
                          v-for="item in getFeatures(selected, false)"
                          :key="`base_feature_${item}`"
                        >
                          <v-btn
                            block
                            :color="colorByType(item)"
                            @click="openByType(item)"
                          >
                            {{ item.name }}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card>
                    <v-toolbar density="compact" title="Optional Features" />

                    <v-card-text>
                      <v-row>
                        <v-col
                          v-for="item in getFeatures(selected, true)"
                          :key="`optional_feature_${item}`"
                        >
                          <v-btn
                            block
                            :color="colorByType(item)"
                            @click="openByType(item)"
                          >
                            {{ item.name }}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    block
                    large
                    color="pink darken-4"
                    @click="newFeature('traits')"
                  >
                    <v-icon left>mdi-plus</v-icon>
                    add new trait
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    block
                    large
                    color="deep-orange darken-4"
                    @click="newFeature('weapons')"
                  >
                    <v-icon left>mdi-plus</v-icon>
                    add new weapon
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    block
                    large
                    color="teal darken-4"
                    @click="newFeature('systems')"
                  >
                    <v-icon left>mdi-plus</v-icon>
                    add new system
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <div style="min-height: 50px" />
        </v-container>
        <div v-else>
          <v-row style="height: 50vh" justify="center" align="center">
            <v-col cols="auto" class="text-h2 text--disabled"
              >Select a Class</v-col
            >
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-footer app>
      <v-btn text to="/">
        <v-icon>mdi-chevron-left</v-icon>
        back
      </v-btn>
      <v-spacer />
      <input
        ref="fileUpload"
        type="file"
        accept=".json"
        hidden
        @change="importFile"
      />
      <v-btn outlined small class="mx-1" @click="exportJSON()"
        >Export JSON File</v-btn
      >
      <v-btn outlined small class="mx-1" @click="importJSON()"
        >Import JSON File</v-btn
      >
    </v-footer>
    <div style="height: 50px" />
    <npc-system-editor
      ref="systems"
      :npcClass="selected"
      @save="saveItem($event)"
      @remove="removeItem($event)"
    />
    <npc-trait-editor
      ref="traits"
      :npcClass="selected"
      @save="saveItem($event)"
      @remove="removeItem($event)"
    />
    <npc-weapon-editor
      ref="weapons"
      :npcClass="selected"
      @save="saveItem($event)"
      @remove="removeItem($event)"
    />
  </div>
</template>

<script lang="ts">
import { npcRole } from '../../assets/enums';
import NpcSystemEditor from './components/_NpcSystemEditor.vue';
import NpcTraitEditor from './components/_NpcTraitEditor.vue';
import NpcWeaponEditor from './components/_NpcWeaponEditor.vue';

export default {
  name: 'npc-class-editor',
  components: { NpcSystemEditor, NpcTraitEditor, NpcWeaponEditor },
  computed: {
    lcp(): any {
      return this.$store.getters.lcp;
    },
    classes() {
      if (!this.$store.getters.lcp.npc_classes)
        this.$store.getters.lcp['npc_classes'] = [];
      return this.$store.getters.lcp.npc_classes;
    },
  },
  data: () => ({
    roles: npcRole,
    selected: null as any,
  }),
  methods: {
    colorByType(item: any) {
      if (item.type === 'Weapon') return 'deep-orange darken-4';
      if (item.type === 'Trait') return 'pink darken-4';
      return 'teal darken-4';
    },
    openByType(item: any) {
      const type =
        item.type === 'Weapon'
          ? 'weapons'
          : item.type === 'System'
          ? 'systems'
          : 'traits';
      if (this.$refs && this.$refs[type]) {
        const r = this.$refs[type] as any;
        r.edit(item);
      }
    },
    getFeatures(c: any, isOptional?: boolean) {
      //if (!this.lcp) return [];
      return c.slice(1).filter((x: any) => (((isOptional) ? (!x.base || x.base === false) : (x.base === true))));
    },
    addNew() {
      if (!this.lcp.npc_classes) {
        this.lcp['npc_classes'] = [];
      }
      this.lcp.npc_classes.push({
        id: 'new',
        name: 'New Class',
        info: {
          flavor: '',
          tactics: '',
          terse: '',
        },
        stats: this.generateStatObject(),
        tables: [],
        clocks: [],
      });
    },
    newFeature(type: string) {
      if (this.$refs && this.$refs[type]) {
        const r = this.$refs[type] as any;
        r.reset();
        r.open();
      }
    },
    saveItem(item: any) {
      if (!this.lcp.npc_features) this.lcp['npc_features'] = [];
      const idx = this.lcp.npc_features.findIndex((x: any) => x.id === item.id);
      if (idx < 0) {
        this.lcp.npc_features.push(item);
      } else this.lcp.npc_features[idx] = item;
    },
    removeItem(id: string) {
      const idx = this.lcp.npc_features.findIndex((x: any) => x.id === id);
      if (idx > -1) this.lcp.npc_features.splice(idx, 1);
    },
    _exportJSON(type: string) {
      const blob = new Blob([JSON.stringify(this.lcp[type])]);
      const elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = `${type}.json`;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    },
    exportJSON() {
      this._exportJSON('npc_classes');
      this._exportJSON('npc_features');
    },
    importJSON() {
      if (this.$refs.fileUpload) (this.$refs.fileUpload as HTMLElement).click();
    },
    importFile(evt: any) {
      const file = evt.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) =>
        (this.lcp.npc_classes = JSON.parse(
          e?.target?.result?.toString() || ''
        ));
      reader.readAsText(file);
    },
    generateStatObject() {
      return {
        armor: [0, 0, 0],
        hp: [0, 0, 0],
        evade: [0, 0, 0],
        edef: [0, 0, 0],
        heatcap: [0, 0, 0],
        speed: [0, 0, 0],
        sensor: [0, 0, 0],
        save: [0, 0, 0],
        hull: [0, 0, 0],
        agility: [0, 0, 0],
        systems: [0, 0, 0],
        engineering: [0, 0, 0],
        size: [[1], [1], [1]],
        activations: [0, 0, 0],
      };
    },
  },
};
</script>
