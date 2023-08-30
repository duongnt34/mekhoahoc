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
export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null >(null);

    const login = async (credentials: Credentials) => {
        await useApiFetch('/sanctum/csrf-cookie')

        const login = await useApiFetch('/login', {
            method: "POST",
            body: credentials,
        });

        const {data} = await useApiFetch('/api/user');
        user.value = data.value as User

        return login
    }

    const isLoggedIn = () => {
        return user.value != null ? true : false
    }


    return {user, login, isLoggedIn}
})