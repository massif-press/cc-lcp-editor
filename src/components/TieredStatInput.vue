<template>
  <div class="mt-n2">
    <div class="text-overline mb-n2">{{ title }}</div>
    <v-card variant="tonal" class="px-3 py-2">
      <v-row dense>
        <v-col>
          <v-text-field
            v-model="value[0]"
            label="T1"
            type="number"
            variant="outlined"
            @change="setTier($event, 0)"
            density="compact"
            hide-details
            style="width: 70px"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="value[1]"
            label="T2"
            type="number"
            variant="outlined"
            @change="setTier($event, 1)"
            density="compact"
            hide-details
            style="width: 70px"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="value[2]"
            label="T3"
            type="number"
            variant="outlined"
            @change="setTier($event, 2)"
            density="compact"
            hide-details
            style="width: 70px"
          />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'tiered-stat-input',
  props: {
    modelValue: {
      type: [Array, Number],
      default: [0, 0, 0],
    },
    title: {
      type: String,
      default: '',
    },
    readonly: Boolean,
  },
  emits: ['update:modelValue'],

  computed: {
    value: {
      get() {
        return (Array.isArray(this.modelValue) ? this.modelValue : [this.modelValue, this.modelValue, this.modelValue]);
      },
      set(value: string) {
        this.$emit('update:modelValue', (Array.isArray(this.modelValue)) ? value : value.slice());
      },
    },
  },
  created() {
    if (!Array.isArray(this.value)) this.value = [this.value, this.value, this.value];
  },
  methods: {
    setTier(evt: string, tier: number) {
      const n = Number(evt);
      if (!Array.isArray(this.value)) this.value = [n, n, n];
      this.value[tier] = n;
    },
  },
};
</script>
