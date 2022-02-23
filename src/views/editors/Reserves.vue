<template>
  <editor-base
    itemKey="reserves"
    :checkDupes="['id', 'name']"
    :checkEmpty="['id', 'name', 'label', 'type']">
    <template v-slot="{ item }">
      <v-toolbar dense color="primary" class="white--text text-h6">{{ item.name }}</v-toolbar>
      <v-card-text>
        <v-row>
          <v-col><id-input v-model="item.id" /></v-col>
          <v-col><v-text-field label="Name" v-model="item.name" /></v-col>
          <v-col><v-text-field label="Label" v-model="item.label" /></v-col>
          <v-col>
            <v-select
              label="Reserve Type"
              :items="['Mech', 'Tactical', 'Resource', 'Bonus']"
              v-model="item.type" />
          </v-col>
          <v-col cols="auto">
            <v-switch label="Consumable" v-model="item.consumable" />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <rich-text-editor title="Description" v-model="item.description" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <synergy-selector :item="item" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <special-equipment-selector :item="item" />
          </v-col>
          <v-col>
            <integrated-selector :item="item" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <i-action-builder :item="item" />
          </v-col>
          <v-col>
            <i-bonus-builder :item="item" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <i-counter-builder :item="item" />
          </v-col>
          <v-col>
            <i-deployable-builder :item="item" />
          </v-col>
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
  name: 'reserves-editor',
  components: {
    EditorBase,
    SynergySelector,
  },
})
</script>
