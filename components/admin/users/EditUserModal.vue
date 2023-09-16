<template>
    <dialog class="modal" :class="{ 'modal-open': isCreateModalOpen }">
        <div class="modal-box w-11/12 max-w-5xl">
            <button
                class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                @click="toggleCreateModal"
            >
                ✕
            </button>
            <div class="border-b pb-2">
                <label class="font-semibold uppercase" for="create-user-form"
                >Tạo tài khoản</label
                >
            </div>

            <!-- Create Form -->
            <Form :validation-schema="schema" @submit="onSubmit">
                <div class="grid grid-cols-2 gap-x-5">
                    <div
                        v-if="formError"
                        class="col-span-2 mt-3 rounded-lg bg-red-50 p-4 text-sm text-red-800"
                        role="alert"
                    >
                        {{ formError }}
                    </div>
                    <!-- Name -->
                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text font-semibold">Họ và tên:</span>
                        </label>
                        <Field
                            type="text"
                            name="name"
                            placeholder=""
                            class="input input-bordered w-full"
                        />
                        <label class="label">
              <span class="label-text-alt text-danger">
                <ErrorMessage name="name"/>
              </span>
                        </label>
                    </div>

                    <!-- Avatar Preview -->
                    <div class="row-span-2">
                        <div class="flex h-full w-full items-center justify-center">
                            <div
                                v-if="!avatarPreview"
                                class="flex h-40 w-40 items-center justify-center rounded-full bg-dark-mutted text-4xl text-white"
                            >
                                MKH
                            </div>
                            <img
                                class="h-40 w-40 rounded-full object-cover"
                                v-if="avatarPreview"
                                :src="avatarPreview"
                                alt="preview your avatar"
                            />
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text font-semibold">Email:</span>
                        </label>
                        <Field
                            type="text"
                            name="email"
                            class="input input-bordered w-full"
                        />
                        <label class="label">
              <span class="label-text-alt text-danger">
                <ErrorMessage name="email"/>
              </span>
                        </label>
                    </div>

                    <!-- Password -->
                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text font-semibold">Mật khẩu:</span>
                        </label>
                        <Field
                            type="password"
                            name="password"
                            placeholder=""
                            class="input input-bordered w-full"
                        />
                        <label class="label">
              <span class="label-text-alt text-danger">
                <ErrorMessage name="password"/>
              </span>
                        </label>
                    </div>

                    <!-- Avatar -->
                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text font-semibold">Avatar:</span>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            class="file-input file-input-bordered w-full"
                            @change="handleAvatarChange"
                        />
                        <label class="label">
              <span class="label-text-alt text-danger">
                {{ avatarError }}
              </span>
                        </label>
                    </div>
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
import {useToastStore} from "~/stores/useToastStore";

const props = defineProps(["isOpen"]);
const emit = defineEmits(["toggleCreateModal", "userCreated"]);
const toast = useToastStore();
const formError = ref("");
const avatar = ref("");
const avatarError = ref("");
const avatarPreview = ref<any>(null);

const isCreateModalOpen = computed(() => {
    return props.isOpen;
});
const toggleCreateModal = () => {
    emit("toggleCreateModal");
};

const schema = useYupSchemas().adminCreateUser;

const onSubmit = async (values: any) => {
    if (!avatar.value) {
        avatarError.value = "Vui lòng chọn file";
        return;
    }

    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("avatar", avatar.value);

    const {data, error} = await useApiFetch<any>("/api/users", {
        method: "POST",
        body: formData,
    });
    if (error.value?.data.message) {
        formError.value = error.value?.data.message;
        toast.error('Có lỗi khi tạo tài khoản!')
        return;
    } else {
        toast.success(data.value.message)
        emit('userCreated');
    }
};

const handleAvatarChange = (e: any) => {
    avatar.value = e.target.files[0];
    const file = e.target.files[0];
    const maxSize = 2 * 1024 * 1024; //2MB

    if (!file) {
        avatarError.value = "Vui lòng chọn file";
        return;
    }

    if (!file.type.startsWith("image/")) {
        avatarError.value = "Vui lòng chọn file ảnh";
        return;
    }

    if (file.size > maxSize) {
        avatarError.value = "Vui lòng chọn file nhỏ hơn 5MB";
        return;
    }

    avatarError.value = "";
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
        avatarPreview.value = e.target?.result;
        avatar.value = file;
    };

    reader.readAsDataURL(file);
};
</script>