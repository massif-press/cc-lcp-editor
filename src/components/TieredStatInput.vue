<template>
  <div>
    <div class="overline mb-n1 mt-n2">{{ title }}</div>
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
  methods: {
    setTier(evt: string, tier: number) {
      this.$set(this.val, tier, Number(evt))
    },
  },
})
</script>
