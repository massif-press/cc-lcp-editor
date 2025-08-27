<template>
  <editor-base
    itemKey="bonds"
    :checkDupes="['id', 'name']"
    :checkEmpty="['id', 'name']"
  >
    <template v-slot="{ item }">
      <v-toolbar density="compact" color="primary" :title="item.name" />
      <v-card-text>
        <v-row>
          <v-col><id-input v-model="item.id" :name="item.name"/></v-col>
          <v-col><v-text-field hide-details label="Name" v-model="item.name"/></v-col>
        </v-row>
        <v-row density="compact">
          <v-col><i-ideal-builder :item="item" :major="true"/></v-col>
        </v-row>
        <v-row density="compact">
          <v-col><i-ideal-builder :item="item" :minor="true"/></v-col>
        </v-row>
        <v-row density="compact">
          <v-col><i-question-builder :item="item" /></v-col>
        </v-row>
        <v-row density="compact">
          <v-col><i-power-builder :item="item" /></v-col>
        </v-row>
      </v-card-text>
    </template>
  </editor-base>
</template>

<script lang="ts">
import EditorBase from './EditorBase.vue';

export default {
  name: 'bond-editor',
  components: {
    EditorBase,
  },
};
</script>
