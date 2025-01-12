import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/main.css";
import { plugin, defaultConfig } from "@formkit/vue";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: "top-right"
} as ToastContainerOptions);
app.use(plugin, defaultConfig);
app.use(createPinia());
app.use(router);

app.mount("#app");
