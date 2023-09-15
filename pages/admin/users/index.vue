<template>
    <div class="">
        <div v-if="permissionError">
            <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                 role="alert">
                {{ permissionError }}
            </div>
        </div>
        <div v-if="!permissionError" class="relative overflow-x-auto sm:rounded-lg">
            <!--            Action Bar-->
            <div
                class="flex items-center justify-between bg-white pb-4 dark:bg-gray-900"
            >
                <div>
                    <button
                        @click="toggleCreateModal"
                        class="mr-2 inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700"
                    >
                        Thêm
                        <Icon class="ml-2" size="14" name="fe:plus"></Icon>
                    </button>
                </div>
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative">
                    <div
                        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                    >
                        <svg
                            class="h-4 w-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search-users"
                        class="text-gray-90 block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm outline-none focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        placeholder="Search for users"
                    />
                </div>
            </div>

            <!-- Table-->
            <table class="table">
                <!-- head -->
                <thead>
                <tr>
                    <th>
                        <label>
                            <input type="checkbox" class="checkbox"/>
                        </label>
                    </th>
                    <th>Tên</th>
                    <th>Vai trò</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                <!-- row 1 -->
                <tr v-for="user in users">
                    <th>
                        <label>
                            <input type="checkbox" class="checkbox"/>
                        </label>
                    </th>
                    <td>
                        <div class="flex items-center space-x-3">
                            <div class="avatar">
                                <div class="mask mask-squircle h-12 w-12">
                                    <img
                                        :src="user.avatar"
                                        alt="Avatar Tailwind CSS Component"
                                    />
                                </div>
                            </div>
                            <div>
                                <div class="font-bold">{{ user.name }}</div>
                                <div class="text-sm opacity-50">{{ user.email }}</div>
                            </div>
                        </div>
                    </td>
                    <td class="space-x-1">
              <span
                  v-if="user.roles"
                  v-for="(role, index) in user.roles"
                  :key="index"
                  class="badge badge-ghost"
              >{{ role }}</span
              >
                    </td>
                    <th class="space-x-1">
                        <button class="text-info btn btn-xs">
                            <Icon size="16" name="heroicons:pencil-square-20-solid"></Icon>
                        </button>
                        <button class="text-danger btn btn-xs">
                            <Icon size="16" name="heroicons:trash-20-solid"></Icon>
                        </button>
                    </th>
                </tr>
                </tbody>
            </table>

            <!-- Create Modal -->
            <CreateUserModal
                :isOpen="isCreateModalOpen"
                @toggle-create-modal="toggleCreateModal"
                @user-created="userCreated"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import CreateUserModal from "~/components/admin/users/CreateUserModal.vue";

definePageMeta({
    layout: "admin",
    middleware: ["logged-out"],
});

type User = {
    name: string;
    email: string;
    avatar: string;
    roles: string[];
};

const isCreateModalOpen = ref(false);
const users = ref<User[]>([]);
const permissionError = ref<string | boolean>(false);

const {data, error} = await useApiFetch<any>("/api/users");
if (error.value) {
    if (error.value.statusCode == 403) {
        permissionError.value = "Bạn không có quyền truy cập mục này!"
    }
} else {
    users.value = data.value.data as User[];
}

const toggleCreateModal = () => {
    isCreateModalOpen.value = !isCreateModalOpen.value;
};

const userCreated = (dataUsers: any) => {
    isCreateModalOpen.value = !isCreateModalOpen.value;
    users.value = dataUsers.data;
};
</script>

<style scoped></style>
