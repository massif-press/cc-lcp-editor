<template>
  <editor-base
    itemKey="pilot_gear"
    :checkDupes="['id', 'name']"
    :checkEmpty="['id', 'name', 'type']">
    <template v-slot="{ item }">
      <v-toolbar dense color="primary" class="white--text text-h6">{{ item.name }}</v-toolbar>
      <v-card-text>
        <v-row>
          <v-col><id-input v-model="item.id" /></v-col>
          <v-col><v-text-field hide-details label="Name" v-model="item.name" /></v-col>
          <v-col>
            <v-select
              hide-details
              label="Type"
              :items="['Armor', 'Weapon', 'Gear']"
              outlined
              v-model="item.type" />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <rich-text-editor title="Description" v-model="item.description" />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col><tag-selector :item="item" /></v-col>
          <v-col><synergy-selector :item="item" /></v-col>
        </v-row>
        <div v-if="item.type === 'Weapon'">
          <v-divider class="my-3" />
          <v-row>
            <v-col><damage-selector :item="item" /></v-col>
            <v-col><range-selector :item="item" /></v-col>
          </v-row>
          <v-divider class="my-3" />
        </div>
        <v-row align="center">
          <v-col><i-action-builder :item="item" /></v-col>
          <v-col><i-bonus-builder :item="item" /></v-col>
          <v-col><i-deployable-builder :item="item" /></v-col>
        </v-row>
      </v-card-text>
    </template>
  </editor-base>
</template>

<script lang="ts">
import Vue from 'vue'
import EditorBase from './EditorBase.vue'

import SynergySelector from '@/components/SynergyLocationSelector.vue'

export default Vue.extend({
  name: 'tags-editor',
  components: {
    EditorBase,

    SynergySelector,
  },
})
</script>
