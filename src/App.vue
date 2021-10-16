<template>
  <v-app>
    <v-app-bar app color="secondary" dark>
      <h2>COMP/CON LCP Editor v.0.0.1</h2>

      <v-spacer></v-spacer>

      <v-btn icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon to="about">
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
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

  created() {
    this.$vuetify.theme.dark = true
  },
})
</script>
