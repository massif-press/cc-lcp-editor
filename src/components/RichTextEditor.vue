<template>
  <v-card>
    <v-card-title class="mt-n1 mb-n2">{{ title }}</v-card-title>
    <v-divider />
    <v-card-text class="pt-2 bg-background">
      <p v-if="readonly" v-html="modelValue" />
      <div v-else>
        <v-row align="center" justify="space-between" dense class="mb-1">
          <v-col cols="auto" style="width: 45px !important"
            ><v-btn
              variant="text"
              size="small"
              :color="editor && editor.isActive('bold') ? 'pink' : ''"
              @click="editor.chain().focus().toggleBold().run()"
              ><v-icon size="large" icon="mdi-format-bold" /></v-btn
          ></v-col>
          <v-col cols="auto" style="width: 45px !important"
            ><v-btn
              variant="text"
              size="small"
              :color="editor && editor.isActive('italic') ? 'pink' : ''"
              @click="editor.chain().focus().toggleItalic().run()"
              ><v-icon size="large" icon="mdi-format-italic" /></v-btn
          ></v-col>
          <v-col cols="auto" style="width: 45px !important"
            ><v-btn
              variant="text"
              size="small"
              :color="editor && editor.isActive('underline') ? 'pink' : ''"
              @click="editor.chain().focus().toggleUnderline().run()"
              ><v-icon size="large" icon="mdi-format-underline" /></v-btn
          ></v-col>
          <v-col cols="auto" style="width: 45px !important"
            ><v-btn
              variant="text"
              size="small"
              :color="editor && editor.isActive('strike') ? 'pink' : ''"
              @click="editor.chain().focus().toggleStrike().run()"
              ><v-icon size="large" icon="mdi-format-strikethrough" /></v-btn
          ></v-col>
          <v-col cols="auto" style="width: 45px !important"
            ><v-btn
              variant="text"
              size="small"
              :color="editor && editor.isActive('code') ? 'pink' : ''"
              @click="editor.chain().focus().toggleCode().run()"
              ><v-icon size="large" icon="mdi-code-braces" /></v-btn
          ></v-col>
          <v-spacer />
          <v-col cols="auto" style="width: 45px !important"
            ><v-btn
              variant="text"
              size="small"
              :color="
                editor && editor.isActive('heading', { level: 1 }) ? 'pink' : ''
              "
              @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
              ><v-icon size="large" icon="mdi-format-header-1" /></v-btn
          ></v-col>
          <v-col cols="auto" style="width: 45px !important"
            ><v-btn
              variant="text"
              size="small"
              :color="
                editor && editor.isActive('heading', { level: 2 }) ? 'pink' : ''
              "
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
              ><v-icon size="large" icon="mdi-format-header-2" /></v-btn
          ></v-col>
          <v-col cols="auto" style="width: 45px !important"
            ><v-btn
              variant="text"
              size="small"
              :color="
                editor && editor.isActive('heading', { level: 3 }) ? 'pink' : ''
              "
              @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
              ><v-icon size="large" icon="mdi-format-header-3" /></v-btn
          ></v-col>
          <v-spacer />
          <v-col cols="auto" style="width: 45px !important"
            ><v-btn
              variant="text"
              size="small"
              @click="editor.commands.setHorizontalRule()"
              ><v-icon size="large" icon="mdi-minus" /></v-btn
          ></v-col>
          <v-spacer />
          <v-col cols="auto" style="width: 45px !important"
            ><v-btn
              variant="text"
              size="small"
              :color="
                editor && editor.isActive({ textAlign: 'left' }) ? 'pink' : ''
              "
              @click="editor.chain().focus().setTextAlign('left').run()"
              ><v-icon size="large" icon="mdi-format-align-left" /></v-btn
          ></v-col>
          <v-col cols="auto" style="width: 45px !important"
            ><v-btn
              variant="text"
              size="small"
              :color="
                editor && editor.isActive({ textAlign: 'center' }) ? 'pink' : ''
              "
              @click="editor.chain().focus().setTextAlign('center').run()"
              ><v-icon size="large" icon="mdi-format-align-center" /></v-btn
          ></v-col>
          <v-col cols="auto" style="width: 45px !important"
            ><v-btn
              variant="text"
              size="small"
              :color="
                editor && editor.isActive({ textAlign: 'right' }) ? 'pink' : ''
              "
              @click="editor.chain().focus().setTextAlign('right').run()"
              ><v-icon size="large" icon="mdi-format-align-right" /></v-btn
          ></v-col>
          <v-spacer />
          <v-col cols="auto" style="width: 45px !important"
            ><v-btn variant="text" size="small"
              ><v-icon size="large" icon="mdi-information-outline" />
              <v-menu activator="parent" location="left" open-on-hover>
                <v-card>
                  <v-card-text>
                    <div class="text-h5">Shortcuts</div>
                    <div class="text-h6 pt-3">Text Formatting</div>
                    <div>
                      <v-table>
                        <thead>
                          <tr>
                            <th>Command</th>
                            <th>Windows/Linux</th>
                            <th>macOS</th>
                            <th>Syntax</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Bold</td>
                            <td><code>Control</code>&nbsp;<code>B</code></td>
                            <td><code>Cmd</code>&nbsp;<code>B</code></td>
                            <td>
                              <code>**two asterisks**</code>
                            </td>
                          </tr>
                          <tr>
                            <td>Italicize</td>
                            <td><code>Control</code>&nbsp;<code>I</code></td>
                            <td><code>Cmd</code>&nbsp;<code>I</code></td>
                            <td>
                              <code>*one asterisk*</code>
                            </td>
                          </tr>
                          <tr>
                            <td>Underline</td>
                            <td><code>Control</code>&nbsp;<code>U</code></td>
                            <td><code>Cmd</code>&nbsp;<code>U</code></td>
                            <td />
                          </tr>
                          <tr>
                            <td>Strikethrough</td>
                            <td>
                              <code>Control</code
                              >&nbsp;<code>Shift</code>&nbsp;<code>X</code>
                            </td>
                            <td>
                              <code>Cmd</code
                              >&nbsp;<code>Shift</code>&nbsp;<code>X</code>
                            </td>
                            <td>
                              <code>∼∼text between tildes∼∼</code>
                            </td>
                          </tr>
                          <tr>
                            <td>Code</td>
                            <td><code>Control</code>&nbsp;<code>E</code></td>
                            <td><code>Cmd</code>&nbsp;<code>E</code></td>
                            <td>
                              <code>`backticks`</code>
                            </td>
                          </tr>
                          <tr>
                            <td>Horizontal Rule</td>
                            <td />
                            <td />
                            <td>
                              <code>---</code>
                            </td>
                          </tr>
                        </tbody>
                      </v-table>
                    </div>
                    <div class="text-h6 pt-3">Paragraph Formatting</div>
                    <div>
                      <v-table>
                        <thead>
                          <tr>
                            <th>Command</th>
                            <th>Windows/Linux</th>
                            <th>macOS</th>
                            <th>Syntax</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Apply normal text style</td>
                            <td>
                              <code>Control</code
                              >&nbsp;<code>Alt</code>&nbsp;<code>0</code>
                            </td>
                            <td>
                              <code>Cmd</code>&nbsp;<code>Alt</code>&nbsp;<code
                                >0</code
                              >
                            </td>
                            <td />
                          </tr>
                          <tr>
                            <td>Apply heading style 1</td>
                            <td>
                              <code>Control</code
                              >&nbsp;<code>Alt</code>&nbsp;<code>1</code>
                            </td>
                            <td>
                              <code>Cmd</code>&nbsp;<code>Alt</code>&nbsp;<code
                                >1</code
                              >
                            </td>
                            <td>
                              Type <code>#</code> at the beginning of a new line
                            </td>
                          </tr>
                          <tr>
                            <td>Apply heading style 2</td>
                            <td>
                              <code>Control</code
                              >&nbsp;<code>Alt</code>&nbsp;<code>2</code>
                            </td>
                            <td>
                              <code>Cmd</code>&nbsp;<code>Alt</code>&nbsp;<code
                                >2</code
                              >
                            </td>
                            <td>
                              Type <code>##</code> at the beginning of a new
                              line
                            </td>
                          </tr>
                          <tr>
                            <td>Apply heading style 3</td>
                            <td>
                              <code>Control</code
                              >&nbsp;<code>Alt</code>&nbsp;<code>3</code>
                            </td>
                            <td>
                              <code>Cmd</code>&nbsp;<code>Alt</code>&nbsp;<code
                                >3</code
                              >
                            </td>
                            <td>
                              Type <code>###</code> at the beginning of a new
                              line
                            </td>
                          </tr>

                          <tr>
                            <td>Ordered list</td>
                            <td>
                              <code>Control</code
                              >&nbsp;<code>Shift</code>&nbsp;<code>7</code>
                            </td>
                            <td>
                              <code>Cmd</code
                              >&nbsp;<code>Shift</code>&nbsp;<code>7</code>
                            </td>
                            <td>
                              Type <code>1.</code> at the beginning of a new
                              line
                            </td>
                          </tr>
                          <tr>
                            <td>Bullet list</td>
                            <td>
                              <code>Control</code
                              >&nbsp;<code>Shift</code>&nbsp;<code>8</code>
                            </td>
                            <td>
                              <code>Cmd</code
                              >&nbsp;<code>Shift</code>&nbsp;<code>8</code>
                            </td>
                            <td>
                              Type <code>*</code> at the beginning of a new line
                            </td>
                          </tr>
                          <tr>
                            <td>Left align</td>
                            <td>
                              <code>Control</code
                              >&nbsp;<code>Shift</code>&nbsp;<code>L</code>
                            </td>
                            <td>
                              <code>Cmd</code
                              >&nbsp;<code>Shift</code>&nbsp;<code>L</code>
                            </td>
                            <td />
                          </tr>
                          <td />
                          <tr>
                            <td>Center align</td>
                            <td>
                              <code>Control</code
                              >&nbsp;<code>Shift</code>&nbsp;<code>E</code>
                            </td>
                            <td>
                              <code>Cmd</code
                              >&nbsp;<code>Shift</code>&nbsp;<code>E</code>
                            </td>
                            <td />
                          </tr>
                          <tr>
                            <td>Right align</td>
                            <td>
                              <code>Control</code
                              >&nbsp;<code>Shift</code>&nbsp;<code>R</code>
                            </td>
                            <td>
                              <code>Cmd</code
                              >&nbsp;<code>Shift</code>&nbsp;<code>R</code>
                            </td>
                            <td />
                          </tr>
                        </tbody>
                      </v-table>
                    </div>
                  </v-card-text>
                </v-card>
              </v-menu> </v-btn
          ></v-col>
        </v-row>
        <editor-content :editor="editor" id="rte" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
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
      extensions: [
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Underline,
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
        }),
      ],
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
  background-color: #171924;
  border-radius: 4px;
}
</style>
