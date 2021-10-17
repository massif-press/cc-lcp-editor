<template>
  <editor-base
    itemKey="sitreps"
    :checkDupes="['id', 'name']"
    :checkEmpty="['id', 'name', 'description']"
  >
    <template v-slot="{ item }">
      <v-toolbar dense color="primary" class="white--text text-h6">{{ item.name }}</v-toolbar>
      <v-card-text>
        <v-row>
          <v-col><v-text-field label="ID" v-model="item.id" /></v-col>
          <v-col><v-text-field label="Name" v-model="item.name" /></v-col>
        </v-row>
        <v-card outlined class="pa-1 mb-6">
          <div class="caption">Description</div>
          <tiptap-vuetify
            id="rte"
            v-model="item.description"
            :extensions="extensions"
            :card-props="{ flat: true, tile: true, elevation: 0 }"
            :toolbar-attributes="{ color: 'black', dark: true }"
          />
        </v-card>
        <v-row>
          <v-col>
            <v-card outlined class="pa-1">
              <div class="caption">PC Victory</div>
              <tiptap-vuetify
                v-model="item.pcVictory"
                :extensions="extensions"
                :card-props="{ flat: true, tile: true, elevation: 0 }"
                :toolbar-attributes="{ color: 'black', dark: true }"
              />
            </v-card>
          </v-col>
          <v-col>
            <v-card outlined class="pa-1">
              <div class="caption">Enemy Victory</div>
              <tiptap-vuetify
                v-model="item.enemyVictory"
                :extensions="extensions"
                :card-props="{ flat: true, tile: true, elevation: 0 }"
                :toolbar-attributes="{ color: 'black', dark: true }"
              />
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card outlined class="pa-1">
              <div class="caption">Stalemate</div>
              <tiptap-vuetify
                v-model="item.noVictory"
                :extensions="extensions"
                :card-props="{ flat: true, tile: true, elevation: 0 }"
                :toolbar-attributes="{ color: 'black', dark: true }"
              />
            </v-card>
          </v-col>
          <v-col>
            <v-card outlined class="pa-1">
              <div class="caption">Deployment</div>
              <tiptap-vuetify
                v-model="item.deployment"
                :extensions="extensions"
                :card-props="{ flat: true, tile: true, elevation: 0 }"
                :toolbar-attributes="{ color: 'black', dark: true }"
              />
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card outlined class="pa-1">
              <div class="caption">objective</div>
              <tiptap-vuetify
                v-model="item.Objective"
                :extensions="extensions"
                :card-props="{ flat: true, tile: true, elevation: 0 }"
                :toolbar-attributes="{ color: 'black', dark: true }"
              />
            </v-card>
          </v-col>
          <v-col>
            <v-card outlined class="pa-1">
              <div class="caption">Extraction</div>
              <tiptap-vuetify
                v-model="item.extraction"
                :extensions="extensions"
                :card-props="{ flat: true, tile: true, elevation: 0 }"
                :toolbar-attributes="{ color: 'black', dark: true }"
              />
            </v-card>
          </v-col>
        </v-row>
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
  name: 'sitreps-editor',
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
