<template>
  <editor-base
    itemKey="reserves"
    :checkDupes="['id', 'name']"
    :checkEmpty="['id', 'name', 'label', 'type']"
  >
    <template v-slot="{ item }">
      <v-toolbar dense color="primary" class="white--text text-h6">{{ item.name }}</v-toolbar>
      <v-card-text>
        <v-row>
          <v-col><v-text-field label="ID" v-model="item.id" /></v-col>
          <v-col><v-text-field label="Name" v-model="item.name" /></v-col>
          <v-col><v-text-field label="Label" v-model="item.label" /></v-col>
          <v-col>
            <v-select
              label="Reserve Type"
              :items="['Mech', 'Tactical', 'Resource', 'Bonus']"
              v-model="item.type"
            />
          </v-col>
          <v-col>
            <v-switch label="Consumable" v-model="item.consumable" />
          </v-col>
        </v-row>
        <v-card outlined class="pa-1">
          <div class="caption">Description</div>
          <tiptap-vuetify
            id="rte"
            v-model="item.description"
            :extensions="extensions"
            :card-props="{ flat: true, tile: true, elevation: 0 }"
            :toolbar-attributes="{ color: 'black', dark: true }"
          />
        </v-card>
        <!-- TODO -->
        "actions"?: IActionData[], "bonuses"?: IBonusData[] "synergies"?: ISynergyData[]
        "deployables"?: IDeployableData[], "counters"?: ICounterData[], "integrated"?: string[]
        "special_equipment"?: string[]
        <!-- TODO -->
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
  name: 'tags-editor',
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
