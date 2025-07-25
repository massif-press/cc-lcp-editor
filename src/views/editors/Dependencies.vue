<template>
  <editor-base
    itemKey="dependencies"
    :checkDupes="['name']"
    :checkEmpty="['name', 'version']"
  >
    <template v-slot="{ item }">
      <v-toolbar density="compact" color="primary" :title="item.name" />
      <v-card-text>
        <v-row>
          <v-col><v-combobox label="Name" :items="massif_lcp_names" v-model="item.name" hint="Must match origin LCP name (check in COMP/CON)"/></v-col>
          <v-col>
            <v-text-field v-if="!isMassifLCP(item.name)" label="Version" v-model="item.version" hint="Must be in semver format"/>
            <v-text-field v-else="!isMassifLCP(item.name)" disabled label="Version" persistent-placeholder :placeholder="getMassifLCPVersion(item.name)" />
          </v-col>
          <v-col>
            <v-text-field v-if="!isMassifLCP(item.name)" label="Link" v-model="item.link" hint="Use main content link, not direct LCP download link" />
            <v-text-field v-else="!isMassifLCP(item.name)" disabled label="Link" persistent-placeholder :placeholder="getMassifLCPLink(item.name)" />
          </v-col>
        </v-row>
      </v-card-text>
    </template>
  </editor-base>
</template>

<script lang="ts">
import EditorBase from './EditorBase.vue';
import { massif_lcps } from '@/assets/enums';

export default {
  name: 'dependencies-editor',
  components: { EditorBase },
  computed : {
    massif_lcp_names() : string[] {
      return massif_lcps.map((l) => l["name"]);
    }
  },
  methods : {
    getMassifLCP(name) {
      return massif_lcps.find((x) => x["name"] == name);
    },
    isMassifLCP(name){
      return !!this.getMassifLCP(name);
    },
    getMassifLCPVersion(name) {
      return this.getMassifLCP(name)?.version;
    },
    getMassifLCPLink(name){
      return this.getMassifLCP(name)?.link;
    }
  }
};
</script>
