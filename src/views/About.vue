<template>
  <v-container>
    <div class="text-h5">About</div>
    <p class="ml-3">
      A tool for producing Lancer Content Packages for use with
      <a target="_blank" href="https://compcon.app">COMP/CON</a>
      . More information about LCPs, including technical notes and content
      examples, can be found in the
      <a target="_blank" href="https://github.com/massif-press/lancer-data">
        lancer-data repository
      </a>
    </p>
    <v-divider class="my-2" />
    <div class="text-h5">Disclaimer</div>
    <p class="ml-3">
      This app is experimental, subject to frequent and/or profound change, and
      is only lightly tested. It is provided as-is, but the author makes no
      guarantees to its operation nor to the output it produces. That said, it
      is an
      <a href="https://github.com/massif-press/cc-lcp-editor" target="_blank">
        open source project
      </a>
      and contributions and forks are very welcome. Discussion regarding this
      app should be held in the the #compcon-homebrew channel on the official
      LANCER Discord.
    </p>
    <div class="text-h5">Issue Reporting</div>
    <p class="ml-3">
      Bugs/feature requests should
      <strong>not</strong>
      be reported through the COMP/CON form. Instead, create a ticket
      <a
        href="https://github.com/massif-press/cc-lcp-editor/issues"
        target="_blank"
      >
        in the repository
      </a>
    </p>
    <div class="text-h5">Contributors</div>
    <p class="ml-3">
      <a href="http://jarena3.github.io/" target="_blank">beeftime</a>
      , Bluhman
    </p>
    <div class="text-h5">Special Thanks</div>
    <p class="ml-3">
      Bluhman, sealtrowitz, BoltsJ, GNUtopia, Tetragramm, Fwuffy, OWACS Ender,
      Marshadow, LostDeviljho
    </p>
    <v-divider class="my-2" />
    <div class="text-h5">Changelog</div>
    <v-card v-for="c in changes">
      <v-card-title class="text-h5" v-text="`v.${c.release}`" />
      <div class="text-caption ml-4" v-text="c.date" />
      <v-card-text class="ml-4">
        <ul>
          <li v-for="e in c.content" v-text="e" />
        </ul>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
export default {
  data: () => ({
    changes: [
      {
        release: '0.3',
        date: '2/22/2023',
        content: ['rebuilt tool in vue3/vite', 'fixed bugs, and so on'],
      },
    ],
  }),
};
</script>
