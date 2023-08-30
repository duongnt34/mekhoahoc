import {defineStore} from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";

type User = {
    id: number;
    name: string;
    email: string;
}

type Credentials = {
    email: string;
    password: string;
}

type RegisterInfo = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null >(null);
    const isLoggedIn = computed(() => !!user.value)

    const login = async (credentials: Credentials) => {
        await useApiFetch('/sanctum/csrf-cookie')

        const login = await useApiFetch('/login', {
            method: "POST",
            body: credentials,
        });

        await fetchUser();

        return login;
    }

    const fetchUser = async () => {
        const {data, error} = await useApiFetch('/api/user');        
        user.value = data.value as User
    }

    const register = async (info: RegisterInfo) => {
        await useApiFetch('/sanctum/csrf-cookie')

        const register = await useApiFetch('/register', {
            method: "POST",
            body: info
        })

        return register;
    }

    return {user, login, isLoggedIn, fetchUser, register}
})