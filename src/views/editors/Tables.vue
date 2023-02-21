<template>
  <v-container>
    <v-card v-for="t in tables" :key="t.key" outlined class="my-5">
      <v-toolbar density="compact" color="primary darken-2" :title="t.name" />
      <div class="text-caption text-right">{{ t.location }}</div>
      <v-card-text>
        <v-row>
          <v-col
            :cols="t.name === 'Quirks' ? 12 : 6"
            v-for="(item, i) in lcp.tables[t.key]"
            :key="`item_${t.key}_${i}`"
          >
            <v-row no-gutters>
              <v-col>
                <v-text-field
                  v-model="lcp.tables[t.key][i]"
                  density="compact"
                  hide-details
                  outlined
                />
              </v-col>
              <v-col cols="auto">
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  color="error"
                  @click="deleteItem(t.key, i)"
                >
                  <v-icon size="large">mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="addNew(t.key)">
          <v-icon left>mdi-plus</v-icon>
          Add New
        </v-btn>
      </v-card-actions>
    </v-card>

    <div id="end" style="min-height: 100px" />
    <v-footer fixed>
      <v-btn variant="text" to="/">
        <v-icon icon="mdi-chevron-left" />
        Back
      </v-btn>
      <v-spacer />
      <!-- <v-btn icon @click="$vuetify.goTo(0)">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <v-btn icon @click="$vuetify.goTo('#end')">
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn> -->
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
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'table-editor',
  props: ['itemKey', 'checkDupes', 'checkEmpty'],
  data: () => ({
    tables: [
      {
        key: 'pilot_names',
        name: 'Pilot Names',
        location: 'Pilot names, rollable on the first Create New Pilot screen',
      },
      {
        key: 'pilot_callsigns',
        name: 'Pilot Callsigns',
        location:
          'Pilot callsigns, rollable on the first Create New Pilot screen',
      },
      {
        key: 'mech_names',
        name: 'Mech Names',
        location: 'Mech names, rollable on the Add New Mech to Hangar screen',
      },
      {
        key: 'quirks',
        name: 'Quirks',
        location: 'Rollable Quirks table for Flash Cloned pilots',
      },
    ],
  }),
  computed: {
    loaded(): boolean {
      return this.$store.getters.loaded;
    },
    lcp(): any {
      return this.$store.getters.lcp;
    },
  },
  created() {
    if (!this.lcp.tables) this.lcp.tables = [];

    this.tables.forEach((e) => {
      if (!this.lcp.tables[e.key]) this.lcp.tables[e.key] = [];
    });
  },
  methods: {
    addNew(key: string) {
      this.lcp.tables[key].push('');
    },
    deleteItem(key: string, index: number) {
      this.lcp.tables[key].splice(index, 1);
    },
    exportJSON() {
      const blob = new Blob([JSON.stringify({ ...this.lcp.tables })]);
      const elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = 'tables.json';
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    },
    importJSON() {
      if (this.$refs.fileUpload) (this.$refs.fileUpload as HTMLElement).click();
    },
    importFile(evt: any) {
      const file = evt.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) =>
        (this.lcp.tables = JSON.parse(e?.target?.result?.toString() || ''));
      reader.readAsText(file);
    },
  },
};
</script>
