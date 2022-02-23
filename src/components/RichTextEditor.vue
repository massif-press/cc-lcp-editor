<template>
  <v-card outlined>
    <div class="caption px-1">{{ title }}</div>
    <span v-show="npc" class="caption text--disabled">
      The syntax
      <code>{X/Y/Z}</code>
      will be rendered into the values for Tier 1/2/3 based on user tier selection within COMP/CON
    </span>
    <tiptap-vuetify
      id="rte"
      v-model="val"
      :extensions="extensions"
      :card-props="{ flat: true, tile: true, elevation: 0 }"
      :toolbar-attributes="{ color: 'darkgrey', dark: true }" />
  </v-card>
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

export default Vue.extend({
  name: 'rich-text-editor',
  components: { TiptapVuetify },
  props: ['value', 'title', 'npc'],
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
  computed: {
    val: {
      get(): string {
        return `${this.value}`
      },
      set(val: string) {
        this.$emit('input', val)
      },
    },
  },
})
</script>

<style scoped>
#rte >>> .tiptap-vuetify-editor__content {
  max-height: 400px;
}
</style>
