<template>
  <editor-base
    itemKey="actions"
    :checkDupes="['id', 'name']"
    :checkEmpty="['id', 'name', 'activation', 'detail']"
  >
    <template v-slot="{ item }">
      <v-toolbar density="compact" color="primary" :title="item.name" />
      <v-card-text>
        <v-row>
          <v-col><id-input v-model="item.id" :name="item.name" /></v-col>
          <v-col><v-text-field label="Name" v-model="item.name" /></v-col>
          <v-col>
            <activator-selector :item="item" />
          </v-col>
        </v-row>
        <v-text-field label="Short Description" v-model="item.terse" />
        <rich-text-editor title="Long Description" v-model="item.detail" />

        <v-row
          v-if="item.activation !== 'Downtime'"
          class="px-4 mb-2"
          density="compact"
        >
          <v-col
            ><v-switch
              color="secondary"
              density="compact"
              hide-details
              label="Pilot Action"
              v-model="item.pilot"
          /></v-col>
          <v-col
            ><v-switch
              color="secondary"
              density="compact"
              hide-details
              label="Mech Action"
              v-model="item.mech"
          /></v-col>
          <v-col>
            <v-switch
              color="secondary"
              density="compact"
              hide-details
              label="Ignore 'Used' State"
              v-model="item.ignore_used"
            />
          </v-col>
          <v-col>
            <v-switch
              color="secondary"
              density="compact"
              hide-details
              label="Incur Heat Cost"
              v-model="item.heat_cost"
            />
          </v-col>
        </v-row>
        <v-row density="compact">
          <v-col>
            <synergy-location-selector :item="item" />
          </v-col>
        </v-row>
      </v-card-text>
    </template>
  </editor-base>
</template>

<script lang="ts">
import EditorBase from './EditorBase.vue';

export default {
  name: 'action-editor',
  components: { EditorBase },
};
</script>
