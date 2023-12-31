import { useAuthStore } from "~/stores/useAuthStore";
export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  if (auth.isLoggedIn) {
    return navigateTo("/admin/dashboard");
  } else {
    return navigateTo("/admin/login");
  }
});
