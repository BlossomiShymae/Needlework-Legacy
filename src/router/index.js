import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    children: [
      {
        path: "all",
        component: () =>
          import(/* webpackChunkName: "all" */ "../views/All.vue"),
      },
      {
        path: "material",
        component: () =>
          import(/* webpackChunkName: "material" */ "../views/Material.vue"),
      },
      {
        path: "champion",
        component: () =>
          import(/* webpackChunkName: "champion" */ "../views/Champion.vue"),
      },
      {
        path: "eternal",
        component: () =>
          import(/* webpackChunkName: "eternal" */ "../views/Eternal.vue"),
      },
      {
        path: "emote",
        component: () =>
          import(/* webpackChunkName: "emote" */ "../views/Emote.vue"),
      },
      {
        path: "icon",
        component: () =>
          import(/* webpackChunkName: "icon" */ "../views/Icon.vue"),
      },
      {
        path: "skin",
        component: () =>
          import(/* webpackChunkName: "skin" */ "../views/Skin.vue"),
      },
      {
        path: "tactician",
        component: () =>
          import(/* webpackChunkName: "tactician" */ "../views/Tactician.vue"),
      },
      {
        path: "wardskin",
        component: () =>
          import(/* webpackChunkName: "wardskin" */ "../views/WardSkin.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: process.env.IS_ELECTRON
    ? createWebHashHistory()
    : createWebHistory(),
  routes,
});

export default router;
