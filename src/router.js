// router.js
import { createRouter, createWebHistory } from "vue-router";
import CurrencyExchange from "./components/CurrencyExchange.vue";
import StoreExchange from "./components/StoreExchange.vue";
import LoginComponent  from "./components/Login.vue"

const routes = [
  {  path: "/",  component: LoginComponent  },
  {  path: "/home",  component: CurrencyExchange },
  {  path: "/store",  component: StoreExchange},
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
