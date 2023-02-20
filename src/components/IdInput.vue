<template>
  <v-text-field
    label="ID"
    hide-details
    v-model="value"
    prepend-icon="mdi-dice-6"
    @click:prepend="uuid"
  />
</template>

<script lang="ts">
import { v4 as uuid } from 'uuid';

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
