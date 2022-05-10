import Home from '@/views/Home.vue';

const homeRoute: any = {
  path: '/home',
  name: 'Home',
  component: Home,
  children: [
    {
      path: 'all',
      component: () =>
        import(/* webpackChunkName: "all" */ '../../views/loots/All.vue'),
    },
    {
      path: 'material',
      component: () =>
        import(
          /* webpackChunkName: "material" */ '../../views/loots/Material.vue'
        ),
    },
    {
      path: 'champion',
      component: () =>
        import(
          /* webpackChunkName: "champion" */ '../../views/loots/Champion.vue'
        ),
    },
    {
      path: 'eternal',
      component: () =>
        import(
          /* webpackChunkName: "eternal" */ '../../views/loots/Eternal.vue'
        ),
    },
    {
      path: 'emote',
      component: () =>
        import(/* webpackChunkName: "emote" */ '../../views/loots/Emote.vue'),
    },
    {
      path: 'icon',
      component: () =>
        import(/* webpackChunkName: "icon" */ '../../views/loots/Icon.vue'),
    },
    {
      path: 'skin',
      component: () =>
        import(/* webpackChunkName: "skin" */ '../../views/loots/Skin.vue'),
    },
    {
      path: 'tactician',
      component: () =>
        import(
          /* webpackChunkName: "tactician" */ '../../views/loots/Tactician.vue'
        ),
    },
    {
      path: 'wardskin',
      component: () =>
        import(
          /* webpackChunkName: "wardskin" */ '../../views/loots/WardSkin.vue'
        ),
    },
  ],
};

export default homeRoute;
