<template>
  <div class="mt-n2">
    <div class="text-overline mb-n2">Size</div>
    <v-card variant="tonal" class="px-3 py-2">
      <v-row dense>
        <v-col>
          <v-select
            v-model="value[0]"
            label="T1"
            :items="sizes"
            @change="setTier($event, 0)"
            density="compact"
            variant="outlined"
            hide-details
            multiple
            style="width: 150px"
          />
        </v-col>
        <v-col>
          <v-select
            v-model="value[1]"
            label="T2"
            :items="sizes"
            @change="setTier($event, 1)"
            density="compact"
            variant="outlined"
            hide-details
            multiple
            style="width: 150px"
          />
        </v-col>
        <v-col>
          <v-select
            v-model="value[2]"
            label="T3"
            :items="sizes"
            @change="setTier($event, 2)"
            density="compact"
            variant="outlined"
            hide-details
            multiple
            style="width: 150px"
          />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'tiered-size-input',
  props: {
    modelValue: {
      type: Array,
      default: [[1], [1], [1]],
    },
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
  data: () => ({
    sizes: [0.5, 1, 2, 3, 4],
  }),
  methods: {
    setTier(evt: string, tier: number) {
      let e = evt ? evt : [1];
      if (!Array.isArray(e)) e = [Number(e)];
      e = e.map((v) => Number(v));
      this.value[tier] = e;
    },
  },
};
</script>
