import {defineStore} from "pinia";
import {ref} from "vue";
import {useApiFetch} from "~/composables/useApiFetch";

type User = {
    id: number;
    name: string;
    email: string;
    roles: string[];
};

type Credentials = {
    email: string;
    password: string;
};

type RegisterInfo = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export const useAuthStore = defineStore("auth", () => {
    const user = ref<User | null>(null);
    const isLoggedIn = computed(() => !!user.value);
    const fetchUser = async () => {
        const {data, error} = await useApiFetch<any>("/api/user");
        user.value = data.value?.data as User;
    };
    const login = async (credentials: Credentials) => {
        await useApiFetch("/sanctum/csrf-cookie");

        const login = await useApiFetch("/login", {
            method: "POST",
            body: credentials,
        });

        await fetchUser();

        return login;
    };

    const register = async (info: RegisterInfo) => {
        await useApiFetch("/sanctum/csrf-cookie");
        const register = await useApiFetch("/register", {
            method: "POST",
            body: info,
        });

        await fetchUser();
        return register;
    };

    const logout = async () => {
        await useApiFetch("/sanctum/csrf-cookie");
        const logout = await useApiFetch("/logout", {
            method: "POST",
        });
        return logout;
    };

    return {user, login, isLoggedIn, fetchUser, register, logout};
});
