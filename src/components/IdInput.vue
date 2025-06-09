<template>
  <v-text-field
    label="ID"
    hide-details
    v-model="value"
    prepend-icon="mdi-id-card"
  />
</template>

<script lang="ts">
import { v4 as uuid } from 'uuid';
// used for random ID generation, disabled because it's not very human-readable
// @click:prepend="uuid"
export default {
  name: 'id-entry',
  props: ['modelValue'],
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
    uuid(): void {
      this.$emit('update:modelValue', uuid());
    },
  },
};
</script>
