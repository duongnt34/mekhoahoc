import { useAuthStore } from "~/stores/useAuthStore";
export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore();
    const isLoggedIn = auth.isLoggedIn()
    if(isLoggedIn){
        return navigateTo('/')
    }else{
        return navigateTo('/admin/login')
    }
    
})