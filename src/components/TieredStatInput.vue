<template>
  <div class="mt-n2">
    <div class="overline mb-n2 mt-n2">{{ title }}</div>
    <v-card color="grey darken-3" class="pa-1 pt-2">
      <v-row no-gutters>
        <v-col>
          <v-text-field
            :value="val[0]"
            label="T1"
            type="number"
            @change="setTier($event, 0)"
            outlined
            dense
            hide-details
          />
        </v-col>
        <v-col>
          <v-text-field
            :value="val[1]"
            label="T2"
            type="number"
            @change="setTier($event, 1)"
            outlined
            dense
            hide-details
          />
        </v-col>
        <v-col>
          <v-text-field
            :value="val[2]"
            label="T3"
            type="number"
            @change="setTier($event, 2)"
            outlined
            dense
            hide-details
          />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'tiered-stat-input',
  props: ['value', 'title'],
  computed: {
    val: {
      get() {
        const self = this as any
        return self.value
      },
      set(val) {
        const self = this as any
        self.$emit('input', val)
      },
    },
  },
  created() {
    if (!Array.isArray(this.val)) this.$set(this, 'val', [0, 0, 0])
  },
  methods: {
    setTier(evt: string, tier: number) {
      const n = Number(evt)
      if (!Array.isArray(this.val)) this.$set(this, 'val', [n, n, n])
      this.$set(this.val, tier, n)
    },
  },
})
</script>
