<template>
  <editor-base
    itemKey="skills"
    :checkDupes="['id', 'name']"
    :checkEmpty="['id', 'name', 'description', 'detail', 'family']">
    <template v-slot="{ item }">
      <v-toolbar dense color="primary" class="white--text text-h6">{{ item.name }}</v-toolbar>
      <v-card-text>
        <v-row>
          <v-col><id-input v-model="item.id" /></v-col>
          <v-col><v-text-field label="Name" v-model="item.name" /></v-col>
          <v-col>
            <v-select
              label="Skill Type"
              :items="['str', 'con', 'int', 'dex', 'cha']"
              v-model="item.family"
              hint="This deremines where on the Skill Trigger list the item appears and has no mechanical effect"
              persistent-hint />
          </v-col>
        </v-row>
        <v-text-field label="Short Description" v-model="item.description" />
        <rich-text-editor title="Long Description" v-model="item.detail" />
      </v-card-text>
    </template>
  </editor-base>
</template>

<script lang="ts">
import Vue from 'vue'
import EditorBase from './EditorBase.vue'

export default Vue.extend({
  name: 'skills-editor',
  components: { EditorBase },
})
</script>
