# cc-lcp-editor
[![Netlify Status](https://api.netlify.com/api/v1/badges/487bd3a4-d35b-42a4-bdd0-15e4c24ad898/deploy-status)](https://app.netlify.com/sites/cc-lcp-editor/deploys)

  A tool for producing Lancer Content Packages for use with COMP/CON. More information about LCPs, including technical notes and content examples, can be found in the lancer-data repository: https://github.com/massif-press/lancer-data

## Disclaimer</div>
  This app is experimental, subject to frequent and/or profound change, and is only lightly tested. It is provided as-is, but the author makes no guarantees to its operation nor to the output it produces. That said, it is an open source project and contributions and forks are very welcome. Discussion regarding this app should be held in the the #compcon-homebrew channel on the official LANCER Discord.

## Build instructions

Requires Vue 3 + Vite to build. Install dependencies with `npm install`. Tested on Node 16+.

- `npm run dev` (`vite`): runs development version, starts server on localhost
- `npm run build` (`vite build`): generates production build
- `npm run preview` (`vite preview`): preview most recent production build, starts server on localhost