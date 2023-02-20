<template>
  <div>
    <v-text-field
      v-model="value"
      filled
      :label="title"
      density="compact"
      hide-details
      :disabled="disabled"
    >
      <v-menu
        slot="append-outer"
        bottom
        offset-y
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            size="x-small"
            class="mr-2"
            :color="value"
            v-bind="props"
            :disabled="disabled"
          >
            <v-icon size="large">mdi-eyedropper-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-color-picker v-model="value" :disabled="disabled" />
        </v-card>
      </v-menu>
    </v-text-field>
  </div>
</template>

<script lang="ts">
export default {
  name: 'color-selector',
  props: {
    modelValue: String,
    title: String,
    disabled: Boolean,
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
};
</script>
