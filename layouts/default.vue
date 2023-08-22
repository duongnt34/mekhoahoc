<template>
  <div>
    <header>
      <div class="container mx-auto flex justify-between">
        <NuxtImg src="/images/logo.png"></NuxtImg>
        <ul class="flex gap-1">
          <li>
            <NuxtLink to="/"
              ><Icon size="30" name="mdi:facebook-box"></Icon
            ></NuxtLink>
          </li>
          <li>
            <NuxtLink to="/"
              ><Icon size="30" name="mdi:twitter-box"></Icon
            ></NuxtLink>
          </li>
          <li>
            <NuxtLink to="/"
              ><Icon size="30" name="mdi:pinterest-box"></Icon
            ></NuxtLink>
          </li>
        </ul>
      </div>
      <nav class="container relative mx-auto">
        <ul class="flex w-full gap-10">
          <li
            v-for="(menu, index) in menuLists"
            :key="index"
            @mouseover="selectMenu(index)"
            @mouseleave="hoveredMenu = null"
          >
            <NuxtLink :to="menu.link">{{ menu.title }}</NuxtLink>
          </li>
        </ul>
        <Transition name="slide-fade">
          <div
            v-if="hoveredMenu && hoveredMenu.length > 0"
            class="absolute left-0 top-6 h-44 w-full bg-white shadow-xl transition-all duration-300 ease-in-out"
          >
            <ul>
              <li v-for="(menu, index) in hoveredMenu" :key="index">
                <NuxtLink :to="menu.link">{{ menu.title }}</NuxtLink>
              </li>
            </ul>
          </div>
        </Transition>
      </nav>
    </header>
    <NuxtPage />
    <footer>xyz</footer>
  </div>
</template>
<script setup lang="ts">
type SubmenuItem = {
  title: string;
  link: string;
};
type Menu = {
  title: string;
  link: string;
  subMenu: SubmenuItem[];
};
const hoveredMenu = ref<SubmenuItem[] | null>(null);
const menuLists = ref<Menu[]>([
  {
    title: "Home",
    link: "/",
    subMenu: [
      {
        title: "Home",
        link: "/",
      },
      {
        title: "Home",
        link: "/",
      },
    ],
  },
  {
    title: "About",
    link: "/about",
    subMenu: [
      {
        title: "About",
        link: "/about",
      },
      {
        title: "About",
        link: "/about",
      },
    ],
  },
  {
    title: "Contact",
    link: "/contact",
    subMenu: [],
  },
  {
    title: "Blog",
    link: "/blog",
    subMenu: [],
  },
]);

const selectMenu = (menuIndex: number) => {
  hoveredMenu.value = menuLists.value[menuIndex].subMenu;
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
