<template>
    <div class="w-screen h-screen flex">
        <div class="w-1/3 h-full bg-primary"></div>
        <div class="w-2/3 h-full bg-white flex justify-center items-center">

            <form @submit.prevent="handleLogin" class="w-1/2">
                <div class="flex items-center justify-center text-6xl uppercase font-serif py-5">
                    <NuxtImg src="/images/logo.png" />
                </div>
                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@mekhoahoc.net" v-model="email" required>
                </div>
                <div class="mb-6">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                    <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="password" required>
                </div>
                <div class="flex items-start mb-6">
                    <div class="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800">
                    </div>
                    <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nhớ mật khẩu</label>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đăng nhập</button>
            </form>
            <button @click="logout">Logout</button>

        </div>
    </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "~/stores/useAuthStore";

definePageMeta({
    layout: false,
});

const email = ref<string>("");
const password = ref<string>("");

const loginData = computed(() => {
    return {
        email: email.value,
        password: password.value,
    };
});

const auth = useAuthStore();
const handleLogin = async () => {
    await auth.login(loginData.value);    
}

const logout = async () => {
    await useFetch('http://localhost:8000/api/auth/logout',{
        method:"POST",
        credentials: "include",
        headers: {
            Accept: "appication/json"
        }
    });

}
</script>

<style scoped>

</style>