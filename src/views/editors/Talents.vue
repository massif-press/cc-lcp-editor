<template>
  <editor-base
    itemKey="talents"
    :checkDupes="['id', 'name']"
    :checkEmpty="['id', 'name', 'description', 'ranks']"
  >
    <template v-slot="{ item }">
      <v-toolbar density="compact" color="primary" :title="item.name" />
      <v-card-text>
        <v-row>
          <v-col><id-input v-model="item.id" /></v-col>
          <v-col><v-text-field label="Name" v-model="item.name" /></v-col>
          <v-col>
            <v-text-field label="SVG Icon URL" v-model="item.icon_url" />
          </v-col>
        </v-row>
        <v-row density="compact">
          <v-col cols="12"
            ><v-text-field label="Short Description" v-model="item.terse"
          /></v-col>
          <v-col cols="12">
            <rich-text-editor
              title="Long Description"
              v-model="item.description"
            />
          </v-col>
          <v-col cols="12" class="mt-2">
            <i-rank-builder :item="item" />
          </v-col>
        </v-row>
      </v-card-text>
    </template>
  </editor-base>
</template>

<script lang="ts">
import EditorBase from './EditorBase.vue';

import IRankBuilder from '../../components/IRankBuilder.vue';

export default {
  name: 'skills-editor',
  components: { EditorBase, IRankBuilder },
};
</script>
