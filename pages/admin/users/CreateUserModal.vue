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
      <form
        name="create-user-form"
        @submit.prevent="handleCreateSubmit"
        action="#"
        autocomplete="off"
      >
        <div class="mb-4 mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              for="name"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >Tên</label
            >
            <input
              v-bind="name"
              type="text"
              name="name"
              id="name"
              class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              placeholder="Họ và tên"
              autocomplete="new-name"
            />
            <div class="text-sm text-danger">
              {{ formErrors.name }}
            </div>
          </div>
          <div
            class="col-span-1 row-span-4 flex w-full items-center justify-center"
          >
            <label
              for="dropzone-file"
              class="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div class="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  class="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" class="hidden" />
            </label>
          </div>
          <div>
            <label
              for="email"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >Email</label
            >
            <input
              v-bind="email"
              type="email"
              name="email"
              id="email"
              class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              placeholder="user@mekhoahoc.com"
              autocomplete="new-email"
            />
            <div class="text-sm text-danger">
              {{ formErrors.email }}
            </div>
          </div>
          <div>
            <label
              for="password"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >Password</label
            >
            <input
              v-bind="password"
              type="password"
              name="password"
              id="password"
              class="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              placeholder=""
              autocomplete="new-password"
            />
            <div class="text-sm text-danger">
              {{ formErrors.password }}
            </div>
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center space-x-2 rounded-b border-t border-gray-200 pt-4 dark:border-gray-600"
        >
          <button
            type="submit"
            class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { useYupSchemas } from "~/composables/useYupSchemas";
import { useForm } from "vee-validate";

const props = defineProps(["isOpen"]);
const emit = defineEmits(["toggleCreateModal"]);

const isCreateModalOpen = computed(() => {
  return props.isOpen;
});
const toggleCreateModal = () => {
  emit("toggleCreateModal");
};

const schema = useYupSchemas().adminCreateUser;

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

const handleCreateSubmit = () => {
  const response = useApiFetch("/api/users", {
    method: "POST",
    body: {
      name: values.name,
      email: values.email,
      password: values.password,
    },
  });

  emit("toggleCreateModal");
};
</script>

<style scoped></style>
