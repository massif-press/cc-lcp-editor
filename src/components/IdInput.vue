<template>
  <v-text-field
    label="ID"
    hide-details
    v-model="value"
    prepend-icon="mdi-id-card"
    @click:prepend="convertName"
  />
</template>

<script lang="ts">
// import { v4 as uuid } from 'uuid';
// used for random ID generation, disabled because it's not very human-readable
export default {
  name: 'id-entry',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    name: {
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
  },
  methods: {
    convertName(): void {
      var prefix = (this.$store.getters.lcp.lcp_manifest.item_prefix) ? this.$store.getters.lcp.lcp_manifest.item_prefix + "_": "";
      var name = (this.name) ? this.name.replace(/[^a-zA-Z]+/g, "_").replace(/_+/g, "_").toLowerCase() : "";
      this.$emit('update:modelValue', prefix + name);
    },
  },
};
</script>
