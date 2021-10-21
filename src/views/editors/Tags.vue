<template>
  <editor-base
    itemKey="tags"
    :checkDupes="['id', 'name']"
    :checkEmpty="['id', 'name', 'description']"
  >
    <template v-slot="{ item }">
      <v-toolbar dense color="primary" class="white--text text-h6">{{ item.name }}</v-toolbar>
      <v-card-text>
        <v-row>
          <v-col><v-text-field label="ID" v-model="item.id" /></v-col>
          <v-col><v-text-field label="Name" v-model="item.name" /></v-col>
          <v-col>
            <v-switch
              label="Filter Ignore"
              v-model="item.filter_ignore"
              hint="Prevent this tag from appearing in equipment filters"
              persistent-hint
            />
          </v-col>
        </v-row>
        <rich-text-editor
          title="Description"
          :value="item.description"
          @input="item.description = $event"
        />
      </v-card-text>
    </template>
  </editor-base>
</template>

<script lang="ts">
import Vue from 'vue'
import EditorBase from './EditorBase.vue'
import { RichTextEditor } from '@/components'

export default Vue.extend({
  name: 'tags-editor',
  components: { EditorBase, RichTextEditor },
})
</script>
