<template>
    <dialog class="modal" :class="{ 'modal-open': isModalOpen }">
        <div class="modal-box">
            <button
                class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                @click="toggleModal"
            >
                ✕
            </button>
            <div class="border-b pb-2">
                <label class="font-semibold uppercase" for="create-user-form"
                >Tạo vai trò</label
                >
            </div>

            <!-- Create Form -->
            <Form :validation-schema="schema" @submit="onSubmit">
                <div v-if="formError"
                     class="p-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                     role="alert">
                    {{ formError }}
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text font-semibold">Tên vai trò:</span>
                    </label>
                    <Field name="name" type="text" class="input input-bordered w-full input-sm rounded-md"/>
                    <label class="label">
                        <span class="label-text-alt text-danger"><ErrorMessage name="name"/></span>
                    </label>
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text font-semibold">Danh sách quyền:</span>
                    </label>
                    <client-only>
                        <el-tree-select
                            v-model="selectedPermissions"
                            :data="data"
                            multiple
                            :render-after-expand="true"
                            show-checkbox
                        />
                    </client-only>
                    <label class="label">
                        <span class="label-text-alt text-danger">{{ selectPermissionError }}</span>
                    </label>
                </div>
                <div class="border-t pt-3">
                    <button type="submit" class="btn btn-neutral btn-sm text-xs">Xác nhận</button>
                </div>
            </Form>
        </div>
    </dialog>
</template>

<script setup lang="ts">
import {useYupSchemas} from "~/composables/useYupSchemas";
import {useApiFetch} from "~/composables/useApiFetch";
import {useToastStore} from "~/stores/useToastStore";


const props = defineProps(["isOpen", "permissions"]);
const emit = defineEmits(["toggleCreateModal", "roleCreated"]);
const toast = useToastStore();
const formError = ref("");
const schema = useYupSchemas().adminCreateRole;
const selectedPermissions = ref<string[]>([]);
const selectPermissionError = ref<string>('');
const data = ref();
data.value = props.permissions

const isModalOpen = computed(() => props.isOpen);
const toggleModal = () => {
    emit("toggleCreateModal");
};

const onSubmit = async (values: any) => {
    if (selectedPermissions.value.length < 1) {
        selectPermissionError.value = "Vui lòng chọn thông tin!"
        return;
    }

    const {error} = await useApiFetch<any>('/api/roles', {
        method: 'POST',
        body: {
            ...values,
            permissions: selectedPermissions.value
        }
    })

    if (error.value) {
        toast.error('Có lỗi khi tạo quyền');
        formError.value = error.value.data.message
        return;
    }

    toast.success('Tạo vai trò thành công!')
    emit('roleCreated');
}

</script>

<style>
.el-input__wrapper {
    min-height: 3rem !important;
}
</style>