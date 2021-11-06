<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <v-list nav dense>
          <v-list-item
            v-for="(c, i) in classes"
            :key="`${c.id || 'new'}_${i}`"
            :class="selected && selected.id === c.id ? 'primary darken-3' : ''"
            selectable
            @click="selected = c"
          >
            <v-list-item-content class="mt-n2">
              <v-list-item-title>
                <span class="text-h6 mr-1">{{ c.name }}</span>
              </v-list-item-title>
              <v-list-item-action-text class="mt-n2">
                {{ c.base_features.length }} base features /
                {{ c.optional_features.length }} optional
              </v-list-item-action-text>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider class="my-2" />
        <v-btn block color="secondary" @click="addNew">
          <v-icon left>mdi-plus</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-container v-if="selected">
          <v-card outlined>
            <v-toolbar dense color="primary" class="white--text text-h6">
              {{ selected.name }}
            </v-toolbar>
            <v-card-text>
              <v-row dense justify="space-around">
                <v-col cols="3">
                  <v-text-field
                    v-model="selected.id"
                    hide-details
                    label="ID"
                    :readonly="isCore(selected.id)"
                  />
                </v-col>
                <v-col cols="9">
                  <v-text-field
                    v-model="selected.name"
                    hide-details
                    label="Name"
                    :readonly="isCore(selected.id)"
                  />
                </v-col>
              </v-row>
              <v-row dense justify="space-around" align="center">
                <v-col>
                  <v-text-field
                    v-model="selected.logo_url"
                    persistent-hint
                    hint="SVG"
                    label="Logo URL"
                    :readonly="isCore(selected.id)"
                  />
                  <v-img :src="selected.logo_url" max-height="222" max-width="450" contain />
                </v-col>
                <v-col>
                  <color-selector
                    v-model="selected.light"
                    title="Light Color"
                    :disabled="isCore(selected.id)"
                  />
                </v-col>
                <v-col>
                  <color-selector
                    v-model="selected.light"
                    title="Dark Color"
                    :disabled="isCore(selected.id)"
                  />
                </v-col>
                <v-col cols="12">
                  <rich-text-editor title="Flavor Quote" v-model="selected.quote" />
                </v-col>
                <v-col cols="12">
                  <rich-text-editor title="Description" v-model="selected.description" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <div style="min-height: 50px" />
        </v-container>
        <div v-else>
          <v-row style="height: 50vh" justify="center" align="center">
            <v-col cols="auto" class="text-h2 text--disabled">Select a Class</v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-footer fixed>
      <v-btn text to="/">
        <v-icon>mdi-chevron-left</v-icon>
        back
      </v-btn>
      <v-spacer />
      <input ref="fileUpload" type="file" accept=".json" hidden @change="importFile" />
      <v-btn outlined small class="mx-1" @click="exportJson()">Export JSON File</v-btn>
      <v-btn outlined small class="mx-1" @click="importJson()">Import JSON File</v-btn>
    </v-footer>
  </v-container>

  <!-- <template v-slot="{ item }">

        

      </v-card-text>
    </template>
  </editor-base> -->
</template>

<script lang="ts">
import Vue from 'vue'
import { npcRole } from '@/assets/enums'
import RichTextEditor from '@/components/RichTextEditor.vue'

export default Vue.extend({
  name: 'action-editor',
  components: { RichTextEditor },
  computed: {
    lcp(): any {
      return this.$store.getters.lcp
    },
    classes() {
      if (!this.$store.getters.lcp.npc_classes)
        this.$set(this.$store.getters.lcp, 'npc_classes', [])
      return this.$store.getters.lcp.npc_classes
    },
  },
  data: () => ({
    npcRoles: npcRole,
    selected: null as any,
  }),
  methods: {
    exportJSON() {
      const blob = new Blob([JSON.stringify(this.lcp.npc_classes)])
      const elem = window.document.createElement('a')
      elem.href = window.URL.createObjectURL(blob)
      elem.download = 'npc_classes.json'
      document.body.appendChild(elem)
      elem.click()
      document.body.removeChild(elem)
    },
    importJSON() {
      if (this.$refs.fileUpload) (this.$refs.fileUpload as HTMLElement).click()
    },
    importFile(evt: any) {
      const file = evt.target.files[0]
      const reader = new FileReader()

      reader.onload = e =>
        this.$set(this.lcp, 'npc_classes', JSON.parse(e?.target?.result?.toString() || ''))
      reader.readAsText(file)
    },
  },
})
</script>
