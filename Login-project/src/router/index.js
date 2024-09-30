import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../components/LoginForm.vue"; // Your login form component
import HomePage from "../components/HomePage.vue"; // Component to redirect to after login

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage, // Destination page after login
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
