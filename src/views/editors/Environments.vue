<template>
  <editor-base
    itemKey="environments"
    :checkDupes="['id', 'name']"
    :checkEmpty="['id', 'name', 'description']"
  >
    <template v-slot="{ item }">
      <v-toolbar
        density="compact"
        color="primary"
        class="white--text text-h6"
        >{{ item.name }}</v-toolbar
      >
      <v-card-text>
        <v-row>
          <v-col><id-input v-model="item.id" :name="item.name"/></v-col>
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
  name: 'environments-editor',
  components: { EditorBase },
};
</script>
