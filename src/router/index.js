import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

import homeRoute from "./routes/home";
import settingsRoute from "./routes/settings";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
];

routes.push(homeRoute);
routes.push(settingsRoute);

const router = createRouter({
  history: process.env.IS_ELECTRON
    ? createWebHashHistory()
    : createWebHistory(),
  routes,
});

export default router;
