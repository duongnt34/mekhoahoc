<template>
  <div>
    <div class="relative overflow-x-auto sm:rounded-lg">
      <div class="flex items-center justify-between bg-white pb-4 dark:bg-gray-900">
        <div>
          <button data-modal-toggle="defaultModal"
            class="mr-2 inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700">
            Thêm
            <Icon class="ml-2" size="14" name="fe:plus"></Icon>
          </button>
          <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction"
            class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700"
            type="button">
            <span class="sr-only">Action button</span>
            Action
            <Icon class="ml-2" size="14" name="fe:arrow-down"></Icon>
          </button>
          <!-- Dropdown menu -->
          <div id="dropdownAction"
            class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700">
            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
              <li>
                <a href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
              </li>
              <li>
                <a href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
              </li>
              <li>
                <a href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate
                  account</a>
              </li>
            </ul>
            <div class="py-1">
              <a href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Delete
                User</a>
            </div>
          </div>
        </div>
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="text" id="table-search-users"
            class="text-gray-90 block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm outline-none focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="Search for users" />
        </div>
      </div>
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input id="checkbox-all-search" type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800" />
                <label for="checkbox-all-search" class="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Position</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index"
            class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800" />
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" class="flex items-center whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white">
              <img class="h-10 w-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="Jese image" />
              <div class="pl-3">
                <div class="text-base font-semibold">{{ user.name }}</div>
                <div class="font-normal text-gray-500">
                  {{ user.email }}
                </div>
              </div>
            </th>
            <td class="px-6 py-4">React Developer</td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div class="mr-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
                Online
              </div>
            </td>
            <td class="px-6 py-4">
              <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Edit user</a>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Main modal -->
      <div id="defaultModal" tabindex="-1" aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
        <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <!-- Modal content -->
          <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <!-- Modal header -->
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Thêm người dùng
              </h3>
              <button type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal">
                <Icon size="24" name="fe:close"></Icon>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <CreateForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CreateForm from './CreateForm.vue';


definePageMeta({
  layout: "admin",
  middleware: ["logged-out"],
});

const { data, error } = await useApiFetch("/api/users");
const users = data.value.data;
</script>

<style scoped></style>
