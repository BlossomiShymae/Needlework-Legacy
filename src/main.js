import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import WaveUI from "wave-ui";
import "wave-ui/dist/wave-ui.css";
import "@mdi/font/css/materialdesignicons.min.css";

const app = createApp(App);

new WaveUI(app, {});

createApp(App).use(store).use(router).mount("#app");
