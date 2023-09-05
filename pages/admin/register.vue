<template>
  <div class="flex h-screen w-screen">
    <div class="h-full w-1/3 bg-primary"></div>
    <div class="flex h-full w-2/3 items-center justify-center bg-white">
      <form class="w-1/2" @submit.prevent="handleRegister">
        <div
          class="flex items-center justify-center py-5 font-serif text-6xl uppercase"
        >
          <NuxtImg src="/images/logo.png" />
        </div>

        <div>{{ values }}</div>
        <div>{{ formErrors }}</div>
        <div class="mb-6">
          <label
            for="name"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >Họ và tên:</label
          >
          <input
            v-bind="name"
            type="text"
            id="name"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="name@flowbite.com"
            required
          />
          <div class="text-sm text-danger">
            {{ formErrors.name }}
          </div>
        </div>
        <div class="mb-6">
          <label
            for="email"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >Email</label
          >
          <input
            v-bind="email"
            type="email"
            id="email"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="name@flowbite.com"
            required
          />
          <div class="text-sm text-danger">
            {{ formErrors.email }}
          </div>
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >Mật khẩu:</label
          >
          <input
            v-bind="password"
            type="password"
            id="password"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
          />
          <div class="text-sm text-danger">
            {{ formErrors.password }}
          </div>
        </div>
        <div class="mb-6">
          <label
            for="password_confirmation"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >Nhập lại mật khẩu:</label
          >
          <input
            v-bind="password_confirmation"
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            autocomplete="off"
            required
          />
          <div class="text-sm text-danger">
            {{ formErrors.confirmPassword }}
          </div>
        </div>

        <!-- Error Alert -->
        <div class="mb-6">
          <div
            v-if="registerError"
            class="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span class="font-medium">{{ registerError }}</span>
          </div>
        </div>

        <button
          type="submit"
          class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          Đăng ký
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/useAuthStore";
import { useForm } from "vee-validate";
import * as yup from "yup";

definePageMeta({
  layout: false,
  middleware: ["logged-in"],
});

const schema = yup.object({
  name: yup.string().required("Vui lòng điền họ tên của bạn"),
  email: yup
    .string()
    .required("Vui lòng điền email")
    .email("Địa chỉ email không hợp lệ"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
    .max(16, "Mật khẩu phải có nhiều nhất 16 kí tự")
    .matches(
      /(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])/,
      "Mật khẩu phải có ít nhất một ký tự in hoa và một ký tự thường",
    )
    .matches(
      /(?=.*[@#$%^&-+=()])/,
      "Mật khẩu phải có ít nhất 1 ký tự đặc biệt",
    ),
  password_confirmation: yup
    .string()
    .required("Vui lòng nhập lại mật khẩu")
    .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp"),
});

const {
  values,
  errors: formErrors,
  defineInputBinds,
} = useForm({
  validationSchema: schema,
});

const name = defineInputBinds("name");
const email = defineInputBinds("email");
const password = defineInputBinds("password");
const password_confirmation = defineInputBinds("password_confirmation");

const auth = useAuthStore();
const registerError = ref();
const handleRegister = async () => {
  const { error } = await auth.register(values as any);
  registerError.value = error.value?.data.message;
  if (!error.value) {
    navigateTo("/admin/dashboard");
  }
};
</script>

<style scoped></style>
