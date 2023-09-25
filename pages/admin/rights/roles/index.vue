<template>
    <ClientOnly>
        <PermissionError :permission-error="permissionError"></PermissionError>
        <div v-if="!permissionError" class="relative overflow-x-auto sm:rounded-lg">
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
            <table class="table table-zebra">
                <!-- head -->
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                <!-- row 1 -->
                <tr v-for="(role, index) in roles" :key="index">
                    <th>{{ index + 1 }}</th>
                    <td>{{ role.name }}</td>
                    <th class="space-x-3">
                        <!--Edit-->
                        <div class="tooltip" data-tip="Sửa">
                            <button class="text-info hover:scale-125 transition" @click="openEditModal(role)">
                                <Icon size="22" name="heroicons:pencil-square-20-solid"></Icon>
                            </button>
                        </div>

                        <!--Delete-->
                        <div class="tooltip" data-tip="Xóa">
                            <button class="text-danger hover:scale-125 transition" @click="deleteRole(role)">
                                <Icon size="22" name="heroicons:trash-20-solid"></Icon>
                            </button>
                        </div>
                    </th>
                </tr>
                </tbody>
            </table>

            <CreateRoleModal v-if="isCreateModalOpen" :isOpen="isCreateModalOpen"
                             @toggle-create-modal="toggleCreateModal"
                             :permissions="permissions"
                             @role-created="handleRoleCreated"/>

            <EditRoleModal v-if="isEditModalOpen" :isOpen="isEditModalOpen" :role="editingRole"
                           :permissions="permissions"
                           @toggle-edit-modal="toggleEditModal" @role-updated="toggleEditModal"></EditRoleModal>
            <ConfirmDialog ref="deleteDialog">
                <template #modal-content>
                    Bạn có chắc muốn xoá vai trò này?
                </template>
            </ConfirmDialog>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import CreateRoleModal from "~/components/admin/rights/roles/CreateRoleModal.vue";
import PermissionError from "~/components/utils/PermissionError.vue";
import EditRoleModal from "~/components/admin/rights/roles/EditRoleModal.vue";
import ConfirmDialog from "~/components/utils/confirm-dialog/ConfirmDialog.vue";
import {useToastStore} from "~/stores/useToastStore";
import {useApiFetch} from "~/composables/useApiFetch";

definePageMeta({
    layout: "admin",
    middleware: ["logged-out"],
});

type Role = {
    id: number
    name: string;
    permissions: string[] | null;
}
const toast = useToastStore();
const roles = ref<Role | null>(null);
const permissionError = ref<string | boolean>(false);
const permissions = ref<any>(null);
const isCreateModalOpen = ref<boolean>(false);
const isEditModalOpen = ref<boolean>(false);
const toggleCreateModal = () => {
    isCreateModalOpen.value = !isCreateModalOpen.value;
}

const toggleEditModal = () => {
    isEditModalOpen.value = !isEditModalOpen.value;
}

const fetchRoles = async () => {
    const {data, error} = await useApiFetch<any>('/api/roles')
    if (error.value) {
        if (error.value.statusCode == 403) {
            permissionError.value = "Bạn không có quyền truy cập mục này!"
        }
    } else {
        roles.value = data.value?.data
    }
}

const fetchPermissionOptions = async () => {
    const {data} = await useApiFetch<any>('/api/get-permission-options')
    permissions.value = data.value.data;
}

await fetchRoles()
await fetchPermissionOptions()

const handleRoleCreated = async () => {
    isCreateModalOpen.value = !isCreateModalOpen.value;
    await fetchRoles()
}

const deleteDialog = ref<InstanceType<typeof ConfirmDialog> | null>(null);
const deleteRole = async (role: Role) => {
    const {isCanceled} = await deleteDialog.value?.reveal()
    if (isCanceled === true) {
        return;
    }
    const {data, error} = await useApiFetch<any>(`/api/roles/${role.id}`, {
        method: 'DELETE'
    })
    if (error.value) {
        toast.error(error.value.data.message);
    } else {
        toast.success(data.value.message);
        await fetchRoles()
    }
}

const editingRole = ref<Role | null>(null);
const openEditModal = (role: Role) => {
    isEditModalOpen.value = !isEditModalOpen.value;
    editingRole.value = role
}

</script>
