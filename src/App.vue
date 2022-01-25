<template>
  <v-app>
    <v-app-bar app color="secondary" dark>
      <v-menu bottom offset-y class="pr-12" max-height="50vh" min-width="30vw">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list tile>
          <v-list-item to="/">
            <v-list-item-avatar><v-icon>mdi-home</v-icon></v-list-item-avatar>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/about">
            <v-list-item-avatar><v-icon>mdi-information-outline</v-icon></v-list-item-avatar>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
          <v-list-item to="/util">
            <v-list-item-avatar><v-icon>mdi-wrench</v-icon></v-list-item-avatar>
            <v-list-item-title>Utilities</v-list-item-title>
          </v-list-item>
          <v-divider v-if="loaded" />
          <v-list-item-group v-if="loaded">
            <v-list-item v-for="c in categories" :key="c" :to="`/editor/${c}`">
              <v-list-item-avatar><v-icon>mdi-pencil</v-icon></v-list-item-avatar>
              <v-list-item-title style="text-transform: capitalize">
                {{ c.replace('_', ' ') }}
              </v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item v-for="c in gmCategories" :key="c" :to="`/editor/${c}`">
              <v-list-item-avatar><v-icon>mdi-pencil</v-icon></v-list-item-avatar>
              <v-list-item-title style="text-transform: capitalize">
                {{ c.replace('_', ' ') }}
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <v-divider vertical class="ml-2 mr-4" />
      <h2>COMP/CON LCP Editor v.0.2</h2>
      <h3 class="warning--text pl-2">[EXPERIMENTAL]</h3>
      <v-spacer />
      <v-btn icon to="/" active-class="indigo"><v-icon>mdi-home</v-icon></v-btn>
      <v-btn icon to="/about" active-class="indigo"><v-icon>mdi-information-outline</v-icon></v-btn>
      <v-btn icon to="/util" active-class="indigo"><v-icon>mdi-wrench</v-icon></v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
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
      'tables',
      'tags',
      'talents',
      'sitreps',
      'environments',
    ],
    gmCategories: ['npc_classes', 'npc_templates', 'eidolon_shells'],
  }),
  created() {
    this.$vuetify.theme.dark = true
  },
  computed: {
    loaded(): boolean {
      return this.$store.getters.loaded
    },
  },
})
</script>
