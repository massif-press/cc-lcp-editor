<template>
  <v-card>
    <v-card-title class="mt-n1 mb-n2">{{ title }}</v-card-title>
    <v-divider />
    <v-card-text class="pt-2 bg-background">
      <p v-if="readonly" v-html="modelValue" />
      <editor-content v-else :editor="editor" id="rte" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3';

export default {
  components: {
    EditorContent,
  },

  props: {
    modelValue: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    readonly: Boolean,
  },

  emits: ['update:modelValue'],

  data() {
    return {
      editor: null as any,
    };
  },

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(value, false);
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit],
      content: this.modelValue,
      onUpdate: () => {
        // HTML
        this.$emit('update:modelValue', this.editor.getHTML());

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style scoped>
#rte >>> p {
  padding: 4px 12px 4px 12px;
}
</style>
