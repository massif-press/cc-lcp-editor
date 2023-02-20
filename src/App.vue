<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-menu location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list density="compact">
          <v-list-item to="/">
            <template v-slot:prepend>
              <v-icon icon="mdi-home" />
            </template>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/about">
            <template v-slot:prepend>
              <v-icon icon="mdi-information-outline" />
            </template>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
          <v-list-item to="/util">
            <template v-slot:prepend>
              <v-icon icon="mdi-wrench" />
            </template>
            <v-list-item-title>Utilities</v-list-item-title>
          </v-list-item>
          <v-divider v-show="loaded" />
          <v-list-item
            v-for="c in categories"
            :key="c"
            v-show="loaded"
            :to="`/editor/${c}`"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-pencil" />
            </template>
            <v-list-item-title style="text-transform: capitalize">
              {{ c.replace('_', ' ') }}
            </v-list-item-title>
          </v-list-item>
          <v-divider v-show="loaded" />
          <v-list-item
            v-for="c in gmCategories"
            :key="c"
            v-show="loaded"
            :to="`/editor/${c}`"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-pencil" />
            </template>
            <v-list-item-title style="text-transform: capitalize">
              {{ c.replace('_', ' ') }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-divider vertical class="ml-2 mr-4" />
      <h2>COMP/CON LCP Editor v.0.3</h2>
      <h3 class="text-yellow pl-2">[EXPERIMENTAL]</h3>
      <v-spacer />
      <v-btn icon to="/" active-class="indigo"><v-icon>mdi-home</v-icon></v-btn>
      <v-btn icon to="/about" active-class="indigo"
        ><v-icon>mdi-information-outline</v-icon></v-btn
      >
      <v-btn icon to="/util" active-class="indigo"
        ><v-icon>mdi-wrench</v-icon></v-btn
      >
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { useStore } from 'vuex';

export default {
  name: 'App',
  data: () => ({
    categories: [
      'manufacturers',
      'actions',
      'backgrounds',
      'pilot_gear',
      'reserves',
      'skills',
      'statuses',
      'tags',
      'talents',
    ],
    gmCategories: [
      'npc_classes',
      'npc_templates',
      'eidolon_shells',
      'sitreps',
      'environments',
    ],
  }),
  created() {
    // this.$vuetify.theme.dark = true;
  },
  computed: {
    loaded(): boolean {
      return useStore().getters.loaded;
    },
  },
};
</script>
