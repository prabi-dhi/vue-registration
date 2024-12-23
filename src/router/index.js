import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../components/LoginForm.vue";
import DynamicForm from "../components/DynamicForm.vue";
import RegistrationForm from "../components/RegistrationForm.vue";
import ShowData from "../components/ShowData.vue";
import Home from "../components/Home.vue";
const routes = [
  { path: "/login", component: LoginForm },
  {
    path: "/home",
    component: Home,
    // meta: {
    //   requiresAuth: true,
    // },
  },
  { path: "/register", component: DynamicForm },
  {
    path: "/register-next",
    name: "register-next",
    component: RegistrationForm,
  },
  { path: "/showdata", component: ShowData },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
