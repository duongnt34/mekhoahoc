<template>
    <div class="w-screen h-screen flex">
        <div class="w-1/3 h-full bg-primary"></div>
        <div class="w-2/3 h-full bg-white flex justify-center items-center">

            <form class="w-1/2" @submit.prevent="handleRegister">
                <div class="flex items-center justify-center text-6xl uppercase font-serif py-5">
                    <NuxtImg src="/images/logo.png" />
                </div>

                <div>{{ values }}</div>
                <div>{{ errors }}</div>
                <div class="mb-6">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và
                        tên:</label>
                    <input v-bind="name" type="text" id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com" required>
                    <div class="text-sm text-danger">
                        {{ errors.name }}
                    </div>
                </div>
                <div class="mb-6">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input v-bind="email" type="email" id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com" required>
                    <div class="text-sm text-danger">
                        {{ errors.email }}
                    </div>
                </div>
                <div class="mb-6">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật
                        khẩu:</label>
                    <input v-bind="password" type="password" id="password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required>
                    <div class="text-sm text-danger">
                        {{ errors.password }}
                    </div>
                </div>
                <div class="mb-6">
                    <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập
                        lại mật khẩu:</label>
                    <input v-bind="confirmPassword" type="password" id="confirm-password" name="confirm-password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        autocomplete="off" required>
                    <div class="text-sm text-danger">
                        {{ errors.confirmPassword }}
                    </div>
                </div>
                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/useAuthStore';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

definePageMeta({
    layout: false,
});

const schema = yup.object({
    name: yup.string().required('Vui lòng điền họ tên của bạn'),
    email: yup.string().required('Vui lòng điền email').email('Địa chỉ email không hợp lệ'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu phải có ít nhất 8 kí tự').max(16, 'Mật khẩu phải có nhiều nhất 16 kí tự').matches(/(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])/, 'Mật khẩu phải có ít nhất một ký tự in hoa và một ký tự thường').matches(/(?=.*[@#$%^&-+=()])/, 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt'),
    confirmPassword: yup.string().required('Vui lòng nhập lại mật khẩu').oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp'),
});

const { values, errors, defineInputBinds } = useForm({
    validationSchema: schema
});

const name = defineInputBinds('name');
const email = defineInputBinds('email');
const password = defineInputBinds('password');
const confirmPassword = defineInputBinds('confirmPassword');

const auth = useAuthStore()
const handleRegister = async () => {
    await auth.register(values as any)
}
</script>

<style scoped></style>