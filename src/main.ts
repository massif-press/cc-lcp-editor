import { createApp } from 'vue';
import { createStore } from 'vuex';
import { mutations, actions, getters } from './store';
import _ from 'lodash';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import routes from './routes';
import * as globalComponents from './components';

import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';

const store = createStore({
  state: {
    lcp: {} as any,
    loaded: false,
  },
  mutations,
  getters,
  actions,
});

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

const theme = {
  dark: true,
  colors: {
    background: '#1d1f2b',
    surface: '#2c2f40',
    primary: '#558C8C',
    secondary: '#C7EFCF',
    error: '#E63462',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FE5F55',
  },
};

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'theme',
    themes: {
      theme,
    },
  },
  icons: {
    defaultSet: 'mdi',
    sets: {} as any,
  },
});

const app = createApp(App);
app.use(store);
app.use(router);
app.use(vuetify);

Object.keys(globalComponents).forEach((key) => {
  const componentConfig = globalComponents[key];
  app.component(key, componentConfig.default || componentConfig);
});

app.mount('#app');
