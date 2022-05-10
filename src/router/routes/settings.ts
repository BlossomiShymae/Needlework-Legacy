const settingsRoute: any = {
  path: '/settings',
  name: 'Settings',
  redirect: '/settings/general',
  component: () =>
    import(/* webpackChunkName: "settings" */ '../../views/Settings.vue'),
  children: [
    {
      path: 'general',
      component: () =>
        import(
          /* webpackChunkName: "general" */ '../../views/settings/General.vue'
        ),
    },
    {
      path: 'data',
      component: () =>
        import(/* webpackChunkName: "data" */ '../../views/settings/Data.vue'),
    },
  ],
};

export default settingsRoute;
