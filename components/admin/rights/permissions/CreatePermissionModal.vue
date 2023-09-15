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
                >Tạo quyền</label
                >
            </div>

            <!-- Create Form -->
            <Form :validation-schema="schema" @submit="onSubmit">
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text font-semibold">Tên quyền</span>
                    </label>
                    <Field name="name" type="text" class="input input-bordered w-full"/>
                    <label class="label">
                        <span class="label-text-alt text-danger"><ErrorMessage name="name"/></span>
                    </label>
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text font-semibold">Mô tả</span>
                    </label>
                    <Field name="description" type="text" class="input input-bordered w-full"/>
                    <label class="label">
                        <span class="label-text-alt text-danger"><ErrorMessage name="description"/></span>
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

const props = defineProps(["isOpen"]);
const emit = defineEmits(["toggleCreateModal", "userCreated"]);
const formError = ref("");


const isModalOpen = computed(() => {
    return props.isOpen;
});
const toggleModal = () => {
    emit("toggleCreateModal");
};

const schema = useYupSchemas().adminCreatePermission


const onSubmit = () => {

}
</script>

<style scoped>

</style>