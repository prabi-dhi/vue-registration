import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../components/LoginForm.vue";
import DynamicForm from "../components/DynamicForm.vue";
import RegistrationForm from "../components/RegistrationForm.vue";
import ShowData from "../components/ShowData.vue";
import Home from "../components/Home.vue";
import Student from "../components/Student.vue";
import Teacher from "../components/Teacher.vue";

const routes = [
  { path: "/login", component: LoginForm },
  {
    path: "/home",
    component: Home,
  },

  { path: "/register", component: DynamicForm },
  {
    path: "/register-next",
    name: "register-next",
    component: RegistrationForm,
  },
  { path: "/students", component: Student },
  { path: "/teachers", component: Teacher },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
