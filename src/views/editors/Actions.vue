<template>
  <editor-base
    itemKey="actions"
    :checkDupes="['id', 'name']"
    :checkEmpty="['id', 'name', 'activation', 'detail']"
  >
    <template v-slot="{ item }">
      <v-toolbar dense color="primary" class="white--text text-h6">{{ item.name }}</v-toolbar>
      <v-card-text>
        <v-row>
          <v-col><v-text-field label="ID" v-model="item.id" /></v-col>
          <v-col><v-text-field label="Name" v-model="item.name" /></v-col>
          <v-col>
            <activator-selector :item="item" />
          </v-col>
        </v-row>
        <v-text-field label="Short Description" v-model="item.terse" />
        <rich-text-editor
          title="Long Description"
          :value="item.detail"
          @input="item.detail = $event"
        />

        <v-row v-if="item.activation !== 'Downtime'" class="px-4 mb-2" dense>
          <v-col><v-switch dense hide-details label="Pilot Action" v-model="item.pilot" /></v-col>
          <v-col><v-switch dense hide-details label="Mech Action" v-model="item.mech" /></v-col>
          <v-col>
            <v-switch dense hide-details label="Ignore 'Used' State" v-model="item.ignore_used" />
          </v-col>
          <v-col>
            <v-switch dense hide-details label="Incur Heat Cost" v-model="item.heat_cost" />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <synergy-selector :item="item" />
          </v-col>
        </v-row>
      </v-card-text>
    </template>
  </editor-base>
</template>

<script lang="ts">
import Vue from 'vue'
import EditorBase from './EditorBase.vue'
import { SynergySelector, ActivatorSelector, RichTextEditor } from '@/components'

export default Vue.extend({
  name: 'action-editor',
  components: { EditorBase, SynergySelector, ActivatorSelector, RichTextEditor },
})
</script>
