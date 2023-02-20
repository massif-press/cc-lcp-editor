<template>
  <editor-base
    itemKey="statuses"
    :checkDupes="['name']"
    :checkEmpty="['name', 'effects', 'type', 'exclusive']"
  >
    <template v-slot="{ item }">
      <v-toolbar
        density="compact"
        color="primary"
        class="white--text text-h6"
        >{{ item.name }}</v-toolbar
      >
      <v-card-text>
        <v-row align="center" class="mb-1">
          <v-col cols="3"
            ><v-text-field label="Name" v-model="item.name"
          /></v-col>
          <v-col cols="3"
            ><v-text-field label="SVG Icon URL" v-model="item.icon_url"
          /></v-col>
          <v-col cols="2">
            <v-select
              label="Type"
              :items="['Status', 'Condition']"
              v-model="item.type"
            />
          </v-col>
          <v-select
            label="Scope"
            hint="(Exclusivity)"
            persistent-hint
            :items="[
              { title: 'Mech', value: 'Mech' },
              { title: 'Pilot', value: 'Pilot' },
              { title: 'Both', value: '' },
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
import EditorBase from './EditorBase.vue';

export default {
  name: 'status-editor',
  components: { EditorBase },
};
</script>
