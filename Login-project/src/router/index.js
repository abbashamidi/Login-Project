import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../components/LoginForm.vue";
import Dashboard from "../components/Dashboard.vue";
import randomPageOne from "../components/randomPageOne.vue";
import randomPageTwo from "../components/randomPageTwo.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/randompageone",
    name: "randomPageOne",
    component: randomPageOne,
    meta: { requiresAuth: true },
  },
  {
    path: "/randompagetwo",
    name: "randompagetwo",
    component: randomPageTwo,
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    redirect: "/login", // Redirect root to login
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("authtoken");

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
