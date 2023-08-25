import {defineStore} from "pinia";

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
        const login = await useApiFetch('/auth/login', {
            method: "POST",
            body: credentials
        })

        const {data} = await useApiFetch('/user', {
            method: "GET"
        });
        user.value = data.value as User;

        return login;
    }


    return {user, login}
})