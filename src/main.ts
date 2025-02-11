import "@/assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import i18n from "@/plugins/i18n/index";

import "@/plugins/vee-validate/messages";
import "@/plugins/vee-validate/rules";

import App from "@/App.vue";
import router from "@/router";
import "@/plugins/echo/echo.js";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount("#app");
