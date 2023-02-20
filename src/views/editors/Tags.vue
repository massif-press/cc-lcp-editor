<template>
  <editor-base
    itemKey="tags"
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
          <v-col><id-input v-model="item.id" /></v-col>
          <v-col><v-text-field label="Name" v-model="item.name" /></v-col>
          <v-col>
            <v-switch
              color="secondary"
              label="Filter Ignore"
              v-model="item.filter_ignore"
              hint="Prevent this tag from appearing in equipment filters"
              persistent-hint
            />
          </v-col>
        </v-row>
        <rich-text-editor title="Description" v-model="item.description" />
      </v-card-text>
    </template>
  </editor-base>
</template>

<script lang="ts">
import EditorBase from './EditorBase.vue';

export default {
  name: 'tags-editor',
  components: { EditorBase },
};
</script>
