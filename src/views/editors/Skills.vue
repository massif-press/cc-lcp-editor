<template>
  <editor-base
    itemKey="skills"
    :checkDupes="['id', 'name']"
    :checkEmpty="['id', 'name', 'description', 'detail', 'family']"
  >
    <template v-slot="{ item }">
      <v-toolbar dense color="primary" class="white--text text-h6">{{ item.name }}</v-toolbar>
      <v-card-text>
        <v-row>
          <v-col><v-text-field label="ID" v-model="item.id" /></v-col>
          <v-col><v-text-field label="Name" v-model="item.name" /></v-col>
          <v-col>
            <v-select
              label="Skill Type"
              :items="['str', 'con', 'int', 'dex', 'cha']"
              v-model="item.family"
              hint="This deremines where on the Skill Trigger list the item appears and has no mechanical effect"
              persistent-hint
            />
          </v-col>
        </v-row>
        <v-text-field label="Short Description" v-model="item.description" />
        <v-card outlined class="pa-1">
          <div class="caption">Long Description</div>
          <tiptap-vuetify
            id="rte"
            v-model="item.detail"
            :extensions="extensions"
            :card-props="{ flat: true, tile: true, elevation: 0 }"
            :toolbar-attributes="{ color: 'black', dark: true }"
          />
        </v-card>
      </v-card-text>
    </template>
  </editor-base>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  BulletList,
  OrderedList,
  ListItem,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from 'tiptap-vuetify'
import EditorBase from './EditorBase.vue'

export default Vue.extend({
  name: 'skills-editor',
  components: { TiptapVuetify, EditorBase },
  data: () => ({
    extensions: [
      History,
      Blockquote,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      Bold,
      Code,
      HorizontalRule,
      HardBreak,
    ],
  }),
})
</script>

<style scoped>
#rte >>> .tiptap-vuetify-editor__content {
  max-height: 200px;
}
</style>
