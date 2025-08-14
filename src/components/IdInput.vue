<template>
  <v-text-field class="id_input"
    label="ID"
    hide-details
    v-model="value"
    prepend-icon="mdi-id-card"
    @click="idSwap"
    readonly
  />
  <v-dialog v-model="idSwapDialog" activator="parent" width="50vw" :key="idSwapOutput">
    <v-card>
      <v-card-title>ID Replacement</v-card-title>
      <v-divider />
      <v-card-text v-if="!hasChildren">
        Be aware that changing IDs can cause issues with preexisting items that reference this ID.
        This includes both references in the LCP itself (such as integrated items), and references
        to this ID in COMP/CON (such as pilots or mechs with this item equipped).
        <br/><br/>
        The default value for the new ID field below is the name of the item in a standardized format. This
        is identical to the ID generation used by the "Standardize IDs" tool on the main page of this editor.
      </v-card-text>
      <v-card-text v-if="hasChildren">
        To edit the ID of a frame with license items, you MUST use the "Replace ID" tool on the main page of this editor to update the ID instead. 
        Otherwise, license items will not have their IDs changed, despite continuing to look right in the editor.
      </v-card-text>
      <v-card-text v-if="isFrame">
        Make sure to save the frame after changing the ID. Otherwise, the license_id will not be updated. 
        This will lead to bad behavior in COMP/CON for non-alt frames.
      </v-card-text>
      <v-card-text class="text-center" v-if="!hasChildren">
        <v-text-field color="primary" label="Old ID" readonly v-model="value"></v-text-field>
        <v-text-field color="primary" label="New ID" v-model="newID"></v-text-field>
        <v-btn color="primary" @click="replaceID()">Replace ID</v-btn>
        <div v-show="idSwapOutput">
          <div class="text-caption text-left" v-text="`output`" />
          <v-textarea
            v-model="idSwapOutput"
            auto-grow
            rows="1"
            readonly
          />
        </div>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn color="secondary" @click="idSwapDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style scoped>
.id_input * {
  pointer-events: none;
}
.id_input {
    cursor: text;
}
</style>
<script lang="ts">

// import { v4 as uuid } from 'uuid';
import _ from 'lodash';
// used for random ID generation, disabled because it's not very human-readable
export default {
  name: 'id-entry',
  data: () => ({
    idSwapDialog: false,
    oldID: '',
    newID: '',
    idSwapOutput: '',
  }),
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    isFrame : {
      type: String,
      default: '',
    },
    readonly: Boolean,
  },
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value: string) {
        this.$emit('update:modelValue', value);
      },
    },
    lcp(): any {
      return this.$store.getters.lcp;
    },
    hasChildren(): boolean {
      if (!this.isFrame) return false;
      if (this.value === '') return false;
      let items = this.collect('weapons')
        .concat(this.collect('systems'))
        .concat(this.collect('mods'));
      items = _.groupBy(items, 'license_id');
      if (items[this.value] && items[this.value].length > 0) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    if (this.name) {
      this.newID = this.convertName();
    }
  },
  methods: {
    idSwap() {
      this.idSwapDialog = true;
    },
    collect(key: string) {
      if (this.lcp[key])
        return this.lcp[key].map((obj: any) => ({ ...obj, itemType: key }));
      return [];
    },
    convertName(): string {
      const digits = [["1", "one"], ["2", "two"], ["3", "three"], ["4", "four"], ["5", "five"], ["6", "six"], ["7", "seven"], ["8", "eight"], ["9", "nine"], ["0", "zero"]];
      var prefix = (this.$store.getters.lcp.lcp_manifest.item_prefix) ? this.$store.getters.lcp.lcp_manifest.item_prefix + "_": "";
      var name = this.name;
      if (!name) {
        //this.$emit('update:modelValue', prefix);
        return prefix;
      }
      for (const d of digits) {
        name = name.replaceAll(d[0], d[1]);
      }
      name = name.replace(/[^a-zA-Z]+/g, "_").replace(/_+/g, "_").toLowerCase();
      //this.$emit('update:modelValue', prefix + name);
      return prefix + name;
    },
    replaceID() {
      this.oldID = this.value;
      for (const key in this.lcp) {
        if (!Array.isArray(this.lcp[key])) continue;
        this.lcp[key].forEach((item: any, index: number) => {
          if (item.id && item.id === this.oldID) {
            item.id = this.newID;
          }
        });
      }
      if (!this.newID || this.newID === "") {
        return;
      } else {
        this.$emit('update:modelValue', this.newID);
      }
      this.idSwapOutput = `Successfully replaced ID "${this.oldID}" with "${this.newID}"`;
    },
  },
};
</script>
