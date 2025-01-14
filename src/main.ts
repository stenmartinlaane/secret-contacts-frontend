import "./assets/main.css";

import { createApp } from "vue";
import "./assets/main.css";
import { plugin, defaultConfig } from "@formkit/vue";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import App from "./App.vue";

const app = createApp(App);
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: "top-right"
} as ToastContainerOptions);
app.use(plugin, defaultConfig);

app.mount("#app");
