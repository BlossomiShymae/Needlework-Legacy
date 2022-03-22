const settingsRoute = {
  path: "/settings",
  name: "Settings",
  redirect: "/settings/general",
  component: () =>
    import(/* webpackChunkName: "settings" */ "../../views/Settings.vue"),
  children: [
    {
      path: "general",
      component: () =>
        import(
          /* webpackChunkName: "general" */ "../../views/settings/General.vue"
        ),
    },
  ],
};

export default settingsRoute;
