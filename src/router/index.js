import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    children: [
      {
        path: "material",
        component: () =>
          import(/* webpackChunkName: "material" */ "../views/Material.vue"),
      },
      {
        path: "champion",
        component: () => import(/* webpackChunkName: "champion" */ "../views/Champion.vue")
      }
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
