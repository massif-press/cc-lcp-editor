<template>
  <v-container>
    <div class="text-h5">About</div>
    <p class="ml-3">
      A tool for producing Lancer Content Packages for use with
      <a target="_blank" href="https://compcon.app">COMP/CON</a>
      . More information about LCPs, including technical notes and content examples, can be found in
      the
      <a target="_blank" href="https://github.com/massif-press/lancer-data">
        lancer-data repository
      </a>
    </p>
    <v-divider class="my-2" />
    <div class="text-h5">Disclaimer</div>
    <p class="ml-3">
      This app is experimental, subject to frequent and/or profound change, and is only lightly
      tested. It is provided as-is, but the author makes no guarantees to its operation nor to the
      output it produces. That said, it is an
      <a href="https://github.com/massif-press/cc-lcp-editor" target="_blank">
        open source project
      </a>
      and contributions and forks are very welcome. Discussion regarding this app should be held in
      the the #compcon-homebrew channel on the official LANCER Discord.
    </p>
    <div class="text-h5">Issue Reporting</div>
    <p class="ml-3">
      Bugs/feature requests should
      <strong>not</strong>
      be reported through the COMP/CON form. Instead, create a ticket
      <a href="https://github.com/massif-press/cc-lcp-editor/issues" target="_blank">
        in the repository
      </a>
    </p>
    <div class="text-h5">Contributors</div>
    <p class="ml-3">
      <a href="https://twitter.com/jarena2" target="_blank">beeftime</a>
    </p>
    <div class="text-h5">Special Thanks</div>
    <p class="ml-3">Bluhman, sealtrowitz</p>
    <v-divider class="my-2" />
    <div class="text-h5">Changelog</div>
    <div class="text-h6 ml-3">v0.1.0 (10/29/2020)</div>
    <p class="ml-6">Initial release</p>
    <div class="text-h6 ml-3">v0.1.1 (11/2/2020)</div>
    <div class="ml-6">
      <ul>
        <li>
          Corrected Name/Type linkage on System Editor
          <a href="https://github.com/massif-press/cc-lcp-editor/issues/1" target="_blank">(#1)</a>
        </li>
        <li>
          Ensure sub-editors clear on exit/load
          <a href="https://github.com/massif-press/cc-lcp-editor/issues/5" target="_blank">(#5)</a>
        </li>
        <li>
          Replace tiptap paragraph output with divs to preserve C/C styling
          <a href="https://github.com/massif-press/cc-lcp-editor/issues/7" target="_blank">(#7)</a>
        </li>
        <li>
          Collect no-source equipment for integrated etc. "unlisted" assignment
          <a href="https://github.com/massif-press/cc-lcp-editor/issues/6" target="_blank">(#6)</a>
        </li>
      </ul>
    </div>
  </v-container>
</template>
