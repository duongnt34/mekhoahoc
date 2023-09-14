<template>
  <div>
    <div class="relative overflow-x-auto sm:rounded-lg">
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
          <button
            id="dropdownActionButton"
            data-dropdown-toggle="dropdownAction"
            class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700"
            type="button"
          >
            <span class="sr-only">Action button</span>
            Action
            <Icon class="ml-2" size="14" name="fe:arrow-down"></Icon>
          </button>
          <!-- Dropdown menu -->
          <div
            id="dropdownAction"
            class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
          >
            <ul
              class="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownActionButton"
            >
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Reward</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Promote</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Activate account</a
                >
              </li>
            </ul>
            <div class="py-1">
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >Delete User</a
              >
            </div>
          </div>
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

      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th>
            <th>Tên</th>
            <th>Vị trí</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="user in users">
            <th>
              <label>
                <input type="checkbox" class="checkbox" />
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
            <td>
              Zemlak, Daniel and Leannon
              <br />
              <span class="badge badge-ghost badge-sm"
                >Desktop Support Technician</span
              >
            </td>
            <th>
              <button class="btn btn-ghost btn-xs">details</button>
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

<script setup>
import CreateUserModal from "~/components/admin/users/CreateUserModal.vue";

definePageMeta({
  layout: "admin",
  middleware: ["logged-out"],
});

const isCreateModalOpen = ref(false);
const users = ref(null);

const { data, error } = await useApiFetch("/api/users");
users.value = data.value.data;

const toggleCreateModal = () => {
  isCreateModalOpen.value = !isCreateModalOpen.value;
};

const userCreated = (dataUsers) => {
  isCreateModalOpen.value = !isCreateModalOpen.value;
  users.value = dataUsers;
};
</script>

<style scoped></style>
