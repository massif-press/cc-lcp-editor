export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('./views/About.vue'),
  },
  {
    path: '/util',
    name: 'Utilities',
    component: () => import('./views/utilities/index.vue'),
  },
  {
    path: '/editor/actions',
    name: 'Action Editor',
    component: () => import('./views/editors/Actions.vue'),
  },
  {
    path: '/editor/backgrounds',
    name: 'Background Editor',
    component: () => import('./views/editors/Backgrounds.vue'),
  },
  {
    path: '/editor/environments',
    name: 'Environment Editor',
    component: () => import('./views/editors/Environments.vue'),
  },
  {
    path: '/editor/sitreps',
    name: 'SITREP Editor',
    component: () => import('./views/editors/Sitreps.vue'),
  },
  {
    path: '/editor/skills',
    name: 'Skill Editor',
    component: () => import('./views/editors/Skills.vue'),
  },
  {
    path: '/editor/statuses',
    name: 'Status Editor',
    component: () => import('./views/editors/Statuses.vue'),
  },
  {
    path: '/editor/tags',
    name: 'Tag Editor',
    component: () => import('./views/editors/Tags.vue'),
  },
  {
    path: '/editor/reserves',
    name: 'Reserve Editor',
    component: () => import('./views/editors/Reserves.vue'),
  },
  {
    path: '/editor/pilot_gear',
    name: 'Pilot Gear Editor',
    component: () => import('./views/editors/PilotGear.vue'),
  },
  {
    path: '/editor/talents',
    name: 'Talent Editor',
    component: () => import('./views/editors/Talents.vue'),
  },
  {
    path: '/editor/manufacturers',
    name: 'Manufacturer Editor',
    component: () => import('./views/editors/Manufacturers.vue'),
  },
  {
    path: '/editor/npc_classes',
    name: 'NPC Class Editor',
    component: () => import('./views/editors/NPCClasses.vue'),
  },
  {
    path: '/editor/npc_templates',
    name: 'NPC Template Editor',
    component: () => import('./views/editors/NPCTemplates.vue'),
  },
  {
    path: '/editor/eidolon_shells',
    name: 'Eidolon Shell Editor',
    component: () => import('./views/editors/EidolonShells.vue'),
  },
];
