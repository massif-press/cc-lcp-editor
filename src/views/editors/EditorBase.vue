<template>
  <v-container>
    <v-toolbar
      v-if="itemKey"
      id="start"
      density="compact"
      color="primary"
      rounded
      class="mt-n4 mb-2"
      :title="title"
    />
    <div v-show="lcp[itemKey] && lcp[itemKey].length">
      <div class="text-caption">Quick Navigation</div>
      <v-row density="compact" align="center">
        <v-col v-for="(item, i) in lcp[itemKey]" :key="`btn${i}`" cols="auto">
          <v-btn size="small" @click="scrollToElement(`item_${i}`)">
            {{ item.name }}
          </v-btn>
        </v-col>
      </v-row>
      <v-divider class="my-3" />
    </div>
    <v-row>
      <v-col cols="12" v-for="(item, i) in lcp[itemKey]" :key="`item_${i}`">
        <v-card :id="`item_${i}`">
          <slot :item="item" />
          <v-card-actions>
            <v-spacer />
            <v-btn @click="duplicateItem(item)">Duplicate</v-btn>
            <v-btn color="error darken-2" @click="deleteItem(item)"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="my-3" />
    <div class="px-8">
      <v-btn color="primary darken-2" block x-large @click="addNew">
        <v-icon large>mdi-plus</v-icon>
        Add New
      </v-btn>
    </div>
    <v-divider class="my-3" />
    <v-alert
      v-show="lcp && lcp[itemKey] && lcp[itemKey].length"
      :icon="errors.length ? 'mdi-alert' : 'mdi-check'"
      prominent
      :color="errors.length ? 'error darken-2' : 'success darken-2'"
      class="text-center"
    >
      <code class="error-msg">
        <span
          v-html="errors.length ? errors.join('<br>') : 'No errors detected!'"
        />
      </code>
    </v-alert>
    <br/>
    <v-alert
      v-show="lcp && lcp[itemKey] && lcp[itemKey].length && hasImportedError"
      :icon="'mdi-alert'"
      prominent
      :color="'error darken-2'"
      class="text-center"
    >
      <code class="error-msg">
        <span
          v-html="'Importing JSON file failed, check console for errors!'"
        />
      </code>
    </v-alert>
    <div id="end" style="min-height: 100px" />
    <v-footer app>
      <v-btn to="/">
        <v-icon>mdi-chevron-left</v-icon>
        back
      </v-btn>
      <v-spacer />
      <v-btn @click="scrollToElement('start')">
        <v-icon left>mdi-chevron-up</v-icon>
        return to top
      </v-btn>
      <v-spacer />
      <input
        ref="fileUpload"
        type="file"
        accept=".json"
        hidden
        @change="importFile"
      />
      <v-btn outlined small class="mx-1" @click="exportJson()"
        >Export JSON File</v-btn
      >
      <v-btn outlined small class="mx-1" @click="importJson()"
        >Import JSON File</v-btn
      >
    </v-footer>
  </v-container>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { synergyLocations, activationTypes } from '../../assets/enums';
import { exportPrep } from '../utilities/cleanup';

function getDuplicateProperties(arr: any[], prop: string) {
  let sorted = arr.map((x) => x[prop]).sort();
  let results: any[] = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i + 1] == sorted[i]) {
      results.push(sorted[i]);
    }
  }
  return results;
}

function getEmptyProperties(arr: any[], prop: string) {
  return arr.filter((x) => !x[prop] || !x[prop].length);
}

export default {
  name: 'editor-base',
  props: ['itemKey', 'checkDupes', 'checkEmpty'],
  data: () => ({
    synergyLocations: synergyLocations,
    activationTypes: activationTypes,
    hasImportedError : false
  }),
  computed: {
    title() {
      return this.itemKey.toUpperCase().replaceAll('_', ' ');
    },
    store() {
      return useStore();
    },
    loaded(): boolean {
      return this.store.getters.loaded;
    },
    lcp(): any {
      return this.store.getters.lcp;
    },
    errors(): string[] {
      const arr: string[] = [];
      if (!this.lcp[this.itemKey] || !this.lcp[this.itemKey].length) return arr;

      this.checkDupes.forEach((prop: string) => {
        getDuplicateProperties(this.lcp[this.itemKey], prop).forEach((p) => {
          arr.push(`Duplicate ${prop} detected:   ${p}`);
        });
      });
      this.checkEmpty.forEach((prop: string) => {
        getEmptyProperties(this.lcp[this.itemKey], prop).forEach((p) => {
          arr.push(
            `Item with missing ${prop} field (${p.id || p.name || '--'})`
          );
        });
      });

      if (this.itemKey == "pilot_gear"){
        this.lcp[this.itemKey].forEach(p => {
          if (p.type == "Weapon"){
            if (!p.damage)
              arr.push(`Item with missing damage field (${p.id || p.name || '--'})`);
            if (!p.range)
              arr.push(`Item with missing range field (${p.id || p.name || '--'})`);
          }
        });
      }

      return arr;
    }
  },
  methods: {
    addNew() {
      if (!this.lcp[this.itemKey]) this.lcp[this.itemKey] = [];
      this.lcp[this.itemKey].push({});
    },
    duplicateItem(item: any) {
      this.lcp[this.itemKey].push({ ...item });
    },
    deleteItem(item: any) {
      this.lcp[this.itemKey].splice(
        this.lcp[this.itemKey].findIndex((x: any) => x.id === item.id),
        1
      );
    },
    exportJson() {
      const blob = new Blob([exportPrep(this.lcp[this.itemKey])]);
      const elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = `${this.itemKey}.json`;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    },
    importJson() {
      if (this.$refs.fileUpload) (this.$refs.fileUpload as HTMLElement).click();
    },
    importFile(evt: any) {
      this.hasImportedError = false;
      const file = evt.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          this.lcp[this.itemKey] = JSON.parse(e?.target?.result?.toString() || '');
        } catch (e : any) {
          this.hasImportedError = true;
          console.error(e);
        }
      }
      reader.readAsText(file);
    },
    scrollToElement(target: string) {
      const el = document.getElementById(target);

      if (el) {
        el.scrollIntoView();
      }
    },
  },
};
</script>

<style scoped>
.error-msg {
  font-size: 18px !important;
}
</style>
