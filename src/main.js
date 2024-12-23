import "./assets/main.css";
import "./assets/style.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
// app.component("login-form", LoginForm);
app.mount("#app");
