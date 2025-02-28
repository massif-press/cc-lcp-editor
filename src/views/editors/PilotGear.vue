<template>
  <editor-base
    itemKey="pilot_gear"
    :checkDupes="['id', 'name']"
    :checkEmpty="['id', 'name', 'type']"
  >
    <template v-slot="{ item }">
      <v-toolbar density="compact" color="primary" :title="item.name" />
      <v-card-text>
        <v-row>
          <v-col><id-input v-model="item.id" /></v-col>
          <v-col
            ><v-text-field hide-details label="Name" v-model="item.name"
          /></v-col>
          <v-col>
            <v-select
              hide-details
              label="Type"
              :items="['Armor', 'Weapon', 'Gear']"
              v-model="item.type"
            />
          </v-col>
        </v-row>
        <v-row density="compact">
          <v-col>
            <rich-text-editor title="Description" v-model="item.description" />
          </v-col>
        </v-row>
        <v-row density="compact">
          <v-col>
            <rich-text-editor title="Effect" v-model="item.effect" />
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
import EditorBase from './EditorBase.vue';

import SynergySelector from '../../components/SynergyLocationSelector.vue';

export default {
  name: 'pilot-gear-editor',
  components: {
    EditorBase,
    SynergySelector,
  },
};
</script>
