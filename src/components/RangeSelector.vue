<template>
  <v-card outlined>
    <div class="caption mb-n1 mt-n3">RANGE</div>
    <v-card flat>
      <v-chip
        v-for="(range, i) in item.range"
        :key="`range_chip_${item.id}-${i}`"
        small
        close
        class="mx-1"
        close-icon="mdi-close"
        @click="edit(range, i)"
        @click:close="remove(i)"
      >
        {{ range.val }} {{ range.type }}
      </v-chip>
      <v-menu v-model="menu" :close-on-click="false" :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
        </template>
        <v-card>
          <v-toolbar dense color="pink darken-4" class="text-h6">Add Range</v-toolbar>
          <v-card-text>
            <v-row justify="space-around" align="center">
              <v-col cols="7">
                <v-select
                  v-model="range.type"
                  item-text="name"
                  item-value="id"
                  label="range"
                  :items="rangeTypes"
                  hide-details
                />
              </v-col>
              <v-col>
                <v-text-field v-model="range.val" label="Value" hide-details outlined />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-btn text color="error" @click="menu = false">cancel</v-btn>
            <v-spacer />
            <v-btn color="success darken-2" :disabled="!range.type || !range.type" @click="submit">
              {{ isEdit ? 'edit' : 'confirm' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { rangeType } from '@/assets/enums'

export default Vue.extend({
  name: 'range-selector',
  props: { item: { type: Object, required: true } },
  data: () => ({
    menu: false,
    range: {},
    isEdit: false,
    editIndex: -1,
    rangeTypes: rangeType,
  }),
  methods: {
    submit() {
      if (!this.range) return
      if (this.isEdit) {
        this.$set(this.item.range, this.editIndex, this.range)
      } else {
        if (!this.item.range) this.$set(this.item, 'range', [])
        this.item.range.push(this.range)
      }
      this.$set(this, 'range', {})
      this.isEdit = false
      this.editIndex = -1
      this.menu = false
    },
    edit(range: any, index: number) {
      this.range = JSON.parse(JSON.stringify(range))
      this.isEdit = true
      this.editIndex = index
      this.menu = true
    },
    remove(index: number) {
      this.item.range.splice(index, 1)
    },
  },
})
</script>
