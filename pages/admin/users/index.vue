<template>
    <div class="">
        <PermissionError :permission-error="permissionError"></PermissionError>
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
                        <Icon size="16" name="heroicons:magnifying-glass-20-solid"></Icon>
                    </div>
                    <input
                        type="text"
                        id="table-search-users"
                        class="text-gray-90 block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm outline-none focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        placeholder="Search for users"
                        @input="searchUser"
                        v-model="searchQuery"
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
                    <th class="space-x-3">
                        <!--Edit-->
                        <div class="tooltip" data-tip="Sửa">
                            <button class="text-info hover:scale-125 transition" @click="openEditModal(user)">
                                <Icon size="22" name="heroicons:pencil-square-20-solid"></Icon>
                            </button>
                        </div>

                        <!--Delete-->
                        <div class="tooltip" data-tip="Xóa">
                            <button class="text-danger hover:scale-125 transition" @click="deleteUser(user)">
                                <Icon size="22" name="heroicons:trash-20-solid"></Icon>
                            </button>
                        </div>
                    </th>
                </tr>
                </tbody>
            </table>

            <!-- Create Modal -->
            <CreateUserModal
                :isOpen="isCreateModalOpen"
                @toggle-create-modal="toggleCreateModal"
                @user-created="handleUserCreated"
                :roles="roles"
            />

            <EditUserModal :isOpen="isEditModalOpen" @toggle-edit-modal="toggleEditModal" :user="editingUser"
                           :roles="roles"
                           @user-edited="handleUserEdited"/>

            <ConfirmDialog ref="deleteDialog">
                <template #modal-content>
                    Bạn có chắc muốn xoá người dùng này?
                </template>
            </ConfirmDialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import CreateUserModal from "~/components/admin/users/CreateUserModal.vue";
import {useToastStore} from "~/stores/useToastStore";
import EditUserModal from "~/components/admin/users/EditUserModal.vue";
import PermissionError from "~/components/utils/PermissionError.vue";
import ConfirmDialog from "~/components/utils/confirm-dialog/ConfirmDialog.vue";
import {bool} from "yup";

definePageMeta({
    layout: "admin",
    middleware: ["logged-out"],
});

type User = {
    id: number;
    name: string;
    email: string;
    avatar: string;
    roles: string[];
};

const isCreateModalOpen = ref<boolean>(false);
const isEditModalOpen = ref<boolean>(false);
const users = ref<User[]>([]);
const roles = ref<string[]>([]);
const permissionError = ref<string | boolean>(false);
const toast = useToastStore();

const toggleCreateModal = () => {
    isCreateModalOpen.value = !isCreateModalOpen.value;
};

const toggleEditModal = () => {
    isEditModalOpen.value = !isEditModalOpen.value;
};

const editingUser = ref<User | null>(null);
const openEditModal = (user: User) => {
    isEditModalOpen.value = true;
    editingUser.value = user
}

const fetchUsers = async () => {
    const {data, error} = await useApiFetch<any>("/api/users");
    if (error.value) {
        if (error.value.statusCode == 403) {
            permissionError.value = "Bạn không có quyền truy cập mục này!"
        }
    } else {
        users.value = data.value.data as User[];
    }
}
const fetchRoleOptions = async () => {
    const {data} = await useApiFetch<any>('/api/get-role-options')
    // roles.value = data.value.roles
    roles.value = data.value.roles
}
await fetchUsers();
await fetchRoleOptions();
const handleUserCreated = async () => {
    isCreateModalOpen.value = !isCreateModalOpen.value;
    await fetchUsers();
};

const handleUserEdited = async () => {
    isEditModalOpen.value = !isEditModalOpen.value;
    await fetchUsers();
}

const deleteDialog = ref<InstanceType<typeof ConfirmDialog> | null>(null);
const deleteUser = async (user: User) => {
    const {isCanceled} = await deleteDialog.value?.reveal()
    if (isCanceled === true) {
        return;
    }
    const {data, error} = await useApiFetch<any>(`/api/users/${user.id}`, {
        method: 'DELETE'
    })
    if (error.value) {
        toast.error(error.value.data.message);
    } else {
        toast.success(data.value.message);
        await fetchUsers()
    }
}

const searchQuery = ref<string>('');
const queryTimeout = ref<any>(null);
const searchUser = async () => {
    clearTimeout(queryTimeout.value)
    queryTimeout.value = setTimeout(async () => {
        const {data, error} = await useApiFetch<any>(`/api/users?name=${searchQuery.value}`);
        if (error.value) {
            return
        }
        users.value = data.value.data;
        return;
    }, 500)
}
</script>
