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
                <label class="font-semibold uppercase" for="create-user-form">
                    Sửa vai trò
                </label>
            </div>

            <!-- Edit Form -->
            <Form ref="editForm" :validation-schema="schema" v-slot="{setValues}" @submit="onSubmit">
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
                    <a-tree-select
                        v-model:value="selectedPermissions"
                        style="width: 100%"
                        :tree-data="treeData"
                        tree-checkable
                        allow-clear
                        :show-checked-strategy="SHOW_SCHEME"
                        placeholder="Please select"
                        tree-node-filter-prop="label"

                    />
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
import type {TreeSelectProps} from 'ant-design-vue';
import {TreeSelect} from 'ant-design-vue';
import {useToastStore} from "~/stores/useToastStore";
import {Form} from "vee-validate";

const SHOW_SCHEME = TreeSelect.SHOW_CHILD;

const props = defineProps(["isOpen", "role", "permissions"]);
const emit = defineEmits(["toggleEditModal", "roleUpdated"]);
const toast = useToastStore();
const formError = ref<string>("");
const schema = useYupSchemas().adminCreateRole;
const selectedPermissions = ref<string[]>([]);
const selectPermissionError = ref<string>('');
const treeData = ref<TreeSelectProps['treeData']>();

treeData.value = props.permissions;


const isModalOpen = computed(() => props.isOpen);
const toggleModal = () => {
    emit("toggleEditModal");
};

const onSubmit = async (values: any) => {
    if (selectedPermissions.value.length < 1) {
        selectPermissionError.value = "Vui lòng chọn thông tin!"
        return;
    }

    const {error} = await useApiFetch<any>('/api/roles/' + props.role.id, {
        method: 'POST',
        params: {
            _method: 'PUT'
        },
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

    toast.success('Sửa vai trò thành công!')
    emit('roleUpdated');
}

const editForm = ref<InstanceType<typeof Form> | null>(null);
watch(
    () => props.role,
    async () => {
        editForm.value?.setValues({
            name: props.role.name,
        })
        selectedPermissions.value = props.role.permissions;
    }
);

</script>