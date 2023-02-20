<template>
  <editor-base
    itemKey="backgrounds"
    :checkDupes="['id', 'name']"
    :checkEmpty="['id', 'name', 'description']"
  >
    <template v-slot="{ item }">
      <v-toolbar density="compact" color="primary" :title="item.name" />
      <v-card-text>
        <v-row>
          <v-col><id-input v-model="item.id" /></v-col>
          <v-col><v-text-field label="Name" v-model="item.name" /></v-col>
        </v-row>
        <rich-text-editor title="Description" v-model="item.description" />
      </v-card-text>
    </template>
  </editor-base>
</template>

<script lang="ts">
import EditorBase from './EditorBase.vue';

export default {
  name: 'backgrounds-editor',
  components: { EditorBase },
};
</script>
