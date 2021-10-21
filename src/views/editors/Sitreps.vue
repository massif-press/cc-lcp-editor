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
        <rich-text-editor
          title="Description"
          :value="item.description"
          @input="item.description = $event"
        />

        <v-row>
          <v-col>
            <rich-text-editor
              title="PC Victory"
              :value="item.pcVictory"
              @input="item.pcVictory = $event"
            />
          </v-col>
          <v-col>
            <rich-text-editor
              title="Enemy Victory"
              :value="item.enemyVictory"
              @input="item.enemyVictory = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <rich-text-editor
              title="Stalemate"
              :value="item.noVictory"
              @input="item.noVictory = $event"
            />
          </v-col>
          <v-col>
            <rich-text-editor
              title="Deployment"
              :value="item.deployment"
              @input="item.deployment = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <rich-text-editor
              title="Objective"
              :value="item.objective"
              @input="item.objective = $event"
            />
          </v-col>
          <v-col>
            <rich-text-editor
              title="Extraction"
              :value="item.extraction"
              @input="item.extraction = $event"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </template>
  </editor-base>
</template>

<script lang="ts">
import Vue from 'vue'
import EditorBase from './EditorBase.vue'
import { RichTextEditor } from '@/components'

export default Vue.extend({
  name: 'sitreps-editor',
  components: { EditorBase, RichTextEditor },
})
</script>
