import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/editor/actions',
    name: 'Action Editor',
    component: () => import(/* webpackChunkName: "editors" */ '../views/editors/Actions.vue'),
  },
  {
    path: '/editor/backgrounds',
    name: 'Action Editor',
    component: () => import(/* webpackChunkName: "editors" */ '../views/editors/Backgrounds.vue'),
  },
  {
    path: '/editor/environments',
    name: 'Environment Editor',
    component: () => import(/* webpackChunkName: "editors" */ '../views/editors/Environments.vue'),
  },
  {
    path: '/editor/sitreps',
    name: 'SITREP Editor',
    component: () => import(/* webpackChunkName: "editors" */ '../views/editors/Sitreps.vue'),
  },
  {
    path: '/editor/skills',
    name: 'Skill Editor',
    component: () => import(/* webpackChunkName: "editors" */ '../views/editors/Skills.vue'),
  },
  {
    path: '/editor/statuses',
    name: 'Status Editor',
    component: () => import(/* webpackChunkName: "editors" */ '../views/editors/Statuses.vue'),
  },
  {
    path: '/editor/tags',
    name: 'Tag Editor',
    component: () => import(/* webpackChunkName: "editors" */ '../views/editors/Tags.vue'),
  },
  {
    path: '/editor/reserves',
    name: 'Reserve Editor',
    component: () => import(/* webpackChunkName: "editors" */ '../views/editors/Reserves.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
