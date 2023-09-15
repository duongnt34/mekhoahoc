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
            <Form>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text font-semibold">Tên vai trò</span>
                    </label>
                    <Field name="name" type="text" class="input input-bordered w-full"/>
                    <label class="label">
                        <span class="label-text-alt text-danger">Lỗi</span>
                    </label>
                </div>
            </Form>
        </div>
    </dialog>
</template>

<script setup lang="ts">

import {useApiFetch} from "~/composables/useApiFetch";

const props = defineProps(["isOpen"]);
const emit = defineEmits(["toggleCreateModal", "userCreated"]);
const formError = ref("");


const isModalOpen = computed(() => {
    return props.isOpen;
});
const toggleModal = () => {
    emit("toggleCreateModal");
};

const permissions = ref();

const {data, error} = await useApiFetch<any>('/api/get-permissions-options')
permissions.value = data.value.data;

const onSubmit = () => {

}
</script>

<style scoped>

</style>