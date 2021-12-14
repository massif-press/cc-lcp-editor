<template>
  <v-card outlined>
    <div class="caption mb-n1 mt-n3">DAMAGE</div>
    <v-card flat>
      <v-chip
        v-for="(damage, i) in item.damage"
        :key="`damage_chip_${item.id}-${i}`"
        small
        close
        class="mx-1"
        close-icon="mdi-close"
        :color="getColor(damage.type)"
        @click="edit(damage, i)"
        @click:close="remove(i)"
      >
        {{ damage.val }} {{ damage.type }}
      </v-chip>
      <v-menu v-model="menu" :close-on-click="false" :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
        </template>
        <v-card>
          <v-toolbar dense color="pink darken-4" class="text-h6">Add Damage</v-toolbar>
          <v-card-text>
            <v-row justify="space-around" align="center">
              <v-col cols="7">
                <v-select
                  v-model="damage.type"
                  item-text="name"
                  item-value="id"
                  label="Damage"
                  :items="damageTypes"
                  hide-details
                />
              </v-col>
              <v-col>
                <tiered-stat-input v-if="npc" v-model="damage.val" title="Value" />
                <v-text-field v-else v-model="damage.val" label="Value" hide-details outlined />
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-btn text color="error" @click="menu = false">cancel</v-btn>
            <v-spacer />
            <v-btn color="success darken-2" @click="submit">
              {{ isEdit ? 'save' : 'confirm' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { damageType } from '@/assets/enums'

export default Vue.extend({
  name: 'damage-selector',
  props: { item: { type: Object, required: true }, npc: { type: Boolean } },
  data: () => ({
    menu: false,
    damage: {},
    isEdit: false,
    editIndex: -1,
    damageTypes: damageType,
  }),
  methods: {
    getColor(type: string) {
      switch (type) {
        case 'Energy':
          return 'blue darken-2'
        case 'Explosive':
          return 'yellow darken-4'
        case 'Heat':
          return 'red darken-2'
        case 'Burn':
          return 'pink darken-4'
        case 'Variable':
          return 'purple darken-3'
        case 'Kinetic':
        default:
          return ''
      }
    },
    submit() {
      if (!this.damage) return
      if (this.isEdit) {
        this.$set(this.item.damage, this.editIndex, this.damage)
      } else {
        if (!this.item.damage) this.$set(this.item, 'damage', [])
        this.item.damage.push(this.damage)
      }
      this.$set(this, 'damage', {})
      this.isEdit = false
      this.editIndex = -1
      this.menu = false
    },
    edit(damage: any, index: number) {
      this.damage = JSON.parse(JSON.stringify(damage))
      this.isEdit = true
      this.editIndex = index
      this.menu = true
    },
    remove(index: number) {
      this.item.damage.splice(index, 1)
    },
  },
})
</script>
