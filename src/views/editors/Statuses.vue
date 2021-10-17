<template>
  <editor-base
    itemKey="statuses"
    :checkDupes="['name']"
    :checkEmpty="['name', 'effects', 'type', 'scope']"
  >
    <template v-slot="{ item }">
      <v-toolbar dense color="primary" class="white--text text-h6">{{ item.name }}</v-toolbar>
      <v-card-text>
        <v-row align="center">
          <v-col cols="3"><v-text-field label="Name" v-model="item.name" /></v-col>
          <v-col cols="3"><v-text-field label="Icon URL" v-model="item.icon_url" /></v-col>
          <v-col cols="2">
            <v-select label="Type" :items="['Status', 'Condition']" v-model="item.type" />
          </v-col>
          <v-select
            label="Scope"
            item-text="name"
            item-value="value"
            :items="[
              { name: 'Mech', value: 'Mech' },
              { name: 'Pilot', value: 'Pilot' },
              { name: 'Both', value: '' },
            ]"
            v-model="item.exclusive"
          />
        </v-row>
        <v-text-field label="Short Description" v-model="item.terse" />
        <v-card outlined class="pa-1">
          <div class="caption">Effect</div>
          <tiptap-vuetify
            id="rte"
            v-model="item.effects"
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
  name: 'status-editor',
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
