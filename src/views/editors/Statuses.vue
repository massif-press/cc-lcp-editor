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
        <rich-text-editor title="Effects" v-model="item.effects" />
      </v-card-text>
    </template>
  </editor-base>
</template>

<script lang="ts">
import Vue from 'vue'
import EditorBase from './EditorBase.vue'
import RichTextEditor from '@/components/RichTextEditor.vue'

export default Vue.extend({
  name: 'status-editor',
  components: { EditorBase, RichTextEditor },
})
</script>
