import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "./components/LoginForm.vue";
import DynamicForm from "./components/DynamicForm.vue";
const routes = [
  { path: "/login", component: LoginForm },
  { path: "/register", component: DynamicForm },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
// app.component("login-form", LoginForm);

app.mount("#app");
