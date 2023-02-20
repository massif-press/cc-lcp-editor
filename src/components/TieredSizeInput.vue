<template>
  <div>
    <div class="overline mb-n1 mt-n2">Size</div>
    <v-card color="grey darken-3" class="pa-1 pt-2">
      <v-row no-gutters>
        <v-col>
          <v-select
            :value="val[0]"
            label="T1"
            :items="sizes"
            @change="setTier($event, 0)"
            outlined
            density="compact"
            hide-details
            multiple
          />
        </v-col>
        <v-col>
          <v-select
            :value="val[1]"
            label="T2"
            :items="sizes"
            @change="setTier($event, 1)"
            outlined
            density="compact"
            hide-details
            multiple
          />
        </v-col>
        <v-col>
          <v-select
            :value="val[2]"
            label="T3"
            :items="sizes"
            @change="setTier($event, 2)"
            outlined
            density="compact"
            hide-details
            multiple
          />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'tiered-stat-input',
  props: ['value'],
  computed: {
    val: {
      get() {
        const self = this as any;
        return self.value;
      },
      set(val) {
        const self = this as any;
        self.$emit('input', val);
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
      this.val[tier] = e;
    },
  },
};
</script>
