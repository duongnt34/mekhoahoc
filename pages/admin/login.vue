<template>
  <div class="flex h-screen w-screen">
    <div class="h-full w-1/3 bg-primary"></div>
    <div class="flex h-full w-2/3 items-center justify-center bg-white">
      <form @submit.prevent="handleLogin" class="w-1/2">
        <div
          class="flex items-center justify-center py-5 font-serif text-6xl uppercase"
        >
          <NuxtImg src="/images/logo.png" />
        </div>
        <div class="mb-6">
          <label
            for="email"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >Email</label
          >
          <input
            type="email"
            id="email"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="name@mekhoahoc.net"
            v-model="email"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >Mật khẩu</label
          >
          <input
            type="password"
            id="password"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            v-model="password"
            required
          />
        </div>
        <div class="mb-6 flex items-start justify-between">
          <div class="flex items-start">
            <div class="flex h-5 items-center">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              for="remember"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Nhớ mật khẩu</label
            >
          </div>
          <div>
            <NuxtLink
              to="/admin/forgot"
              class="text-sm text-blue-700 hover:underline dark:text-blue-500"
              >Quên mật khẩu?</NuxtLink
            >
          </div>
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            Đăng nhập
          </button>
          <NuxtLink
            to="/admin/register"
            class="text-sm text-blue-700 underline hover:underline dark:text-blue-500"
            >Chưa có tài khoản? Đăng ký ngay</NuxtLink
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/useAuthStore";
definePageMeta({
  layout: false,
  middleware: ["logged-in"],
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
  if (auth.isLoggedIn) return navigateTo("/admin/dashboard");
  const login = await auth.login(loginData.value);
  if (!login.error.value) {
    setTimeout(() => {
      navigateTo("/admin/dashboard");
    }, 1000);
  }
};
</script>

<style scoped></style>
