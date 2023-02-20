<template>
  <editor-base
    itemKey="sitreps"
    :checkDupes="['id', 'name']"
    :checkEmpty="['id', 'name', 'description']"
  >
    <template v-slot="{ item }">
      <v-toolbar
        density="compact"
        color="primary"
        class="white--text text-h6"
        >{{ item.name }}</v-toolbar
      >
      <v-card-text>
        <v-row>
          <v-col><id-input v-model="item.id" /></v-col>
          <v-col><v-text-field label="Name" v-model="item.name" /></v-col>
        </v-row>
        <rich-text-editor title="Description" v-model="item.description" />

        <v-row>
          <v-col>
            <rich-text-editor title="PC Victory" v-model="item.pcVictory" />
          </v-col>
          <v-col>
            <rich-text-editor
              title="Enemy Victory"
              v-model="item.enemyVictory"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <rich-text-editor title="Stalemate" v-model="item.stalemate" />
          </v-col>
          <v-col>
            <rich-text-editor title="Deployment" v-model="item.deployment" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <rich-text-editor title="Objective" v-model="item.objective" />
          </v-col>
          <v-col>
            <rich-text-editor title="Extraction" v-model="item.extraction" />
          </v-col>
        </v-row>
      </v-card-text>
    </template>
  </editor-base>
</template>

<script lang="ts">
import EditorBase from './EditorBase.vue';

export default {
  name: 'sitreps-editor',
  components: { EditorBase },
};
</script>
