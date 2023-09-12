<template>
  <nav
    class="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <NuxtLink
            :to="{ name: 'admin-dashboard' }"
            class="ml-2 flex md:mr-24"
          >
            <NuxtImg
              src="/images/logo.png"
              class="mr-3 h-8"
              alt="Mê khoa học Logo"
            />
          </NuxtLink>
        </div>
        <div class="flex items-center">
          <div class="ml-3 flex items-center">
            <div>
              <button
                type="button"
                class="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false"
                data-dropdown-toggle="dropdown-user"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user photo"
                />
              </button>
            </div>
            <div
              class="z-50 my-4 hidden list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
              id="dropdown-user"
            >
              <div class="px-4 py-3" role="none">
                <p class="text-sm text-gray-900 dark:text-white" role="none">
                  Neil Sims
                </p>
                <p
                  class="truncate text-sm font-medium text-gray-900 dark:text-gray-300"
                  role="none"
                >
                  neil.sims@flowbite.com
                </p>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                    >Dashboard</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                    >Settings</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                    >Earnings</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                    >Sign out</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <aside
    id="sidebar-multi-level-sidebar"
    class="fixed left-0 top-14 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="h-full overflow-y-auto bg-gray-100 px-3 py-4 dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li v-for="item in navigation">
          <NuxtLink
            :to="{ name: item.name }"
            class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
            :class="{ 'bg-gray-300': $route.name === item.name }"
          >
            <Icon size="24" :name="item.icon"></Icon>
            <span class="ml-3">{{ item.title }}</span>
          </NuxtLink>
        </li>
        <li>
          <button
            type="button"
            class="group flex w-full items-center rounded-lg p-2 text-base text-gray-900 transition duration-75 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
            aria-controls="dropdown-example"
            data-collapse-toggle="dropdown-example"
          >
            <Icon size="24" name="fe:cart"></Icon>
            <span class="ml-3 flex-1 whitespace-nowrap text-left"
              >E-commerce</span
            >
            <Icon size="24" name="fe:arrow-down"></Icon>
          </button>
          <ul id="dropdown-example" class="hidden space-y-2 py-2">
            <li>
              <a
                href="#"
                class="group flex w-full items-center rounded-lg p-2 pl-11 text-gray-900 transition duration-75 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                >Products</a
              >
            </li>
            <li>
              <a
                href="#"
                class="group flex w-full items-center rounded-lg p-2 pl-11 text-gray-900 transition duration-75 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                >Billing</a
              >
            </li>
            <li>
              <a
                href="#"
                class="group flex w-full items-center rounded-lg p-2 pl-11 text-gray-900 transition duration-75 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                >Invoice</a
              >
            </li>
          </ul>
        </li>

        <li v-if="!auth.isLoggedIn">
          <NuxtLink
            href="/admin/login"
            class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
          >
            <Icon size="24" name="fe:login"></Icon>
            <span class="ml-3 flex-1 whitespace-nowrap">Đăng nhập</span>
          </NuxtLink>
        </li>
        <li v-if="auth.isLoggedIn" @click="logout">
          <a
            href="#"
            class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
          >
            <Icon size="24" name="fe:logout"></Icon>
            <span class="ml-3 flex-1 whitespace-nowrap">Đăng xuất</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>

  <div class="mt-14 p-4 sm:ml-64">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "~/stores/useAuthStore";
const route = useRoute();

const auth = useAuthStore();
const logout = async () => {
  const logout = await auth.logout();
  if (!logout.error.value) {
    auth.user = null;
    navigateTo("/admin/login");
  }
};

const navigation = [
  {
    name: "admin-dashboard",
    title: "Dashboard",
    icon: "fe:app-menu",
  },
  {
    name: "admin-users",
    title: "Tài khoản",
    icon: "fe:users",
  },
];

onMounted(() => {
});
</script>

<style scoped></style>
