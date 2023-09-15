<template>
    <div class="drawer lg:drawer-open">
        <input id="admin-aside" type="checkbox" class="drawer-toggle"/>
        <div class="drawer-content w-screen sm:w-full">
            <nav class="h-12 w-full shadow-sm flex items-center justify-end gap-5 px-4">
                <span>{{ user.name }}</span>
                <ul v-if="user.roles" class="flex gap-x-3">
                    <li v-for="(role, index) in user.roles" class="badge badge-neutral">{{ role }}</li>
                </ul>
                <div class="avatar">
                    <div class="w-10 rounded-full">
                        <NuxtImg class="w-full h-full" src="/images/author-3.jpg"/>
                    </div>
                </div>
            </nav>
            <div class="p-4 w-full">
                <slot></slot>
            </div>

        </div>
        <aside class="drawer-side">
            <div for="admin-aside" class="h-12 w-64 ">
                <div class="w-full h-full flex items-center justify-center bg-base-200">
                    <NuxtImg class="h-8"
                             alt="Mê khoa học Logo" src="/images/logo.png"></NuxtImg>
                </div>
            </div>
            <ul class="menu h-full w-64 space-y-2 overflow-y-auto bg-base-200">
                <li v-for="(item, index) in navigation" :key="index">
                    <NuxtLink
                        v-if="!item.children"
                        :to="{ name: item.name }"
                        :class="{ active: $route.name === item.name }"
                    >
                        <Icon size="24" :name="item.icon"></Icon>
                        {{ item.title }}
                    </NuxtLink
                    >
                    <details
                        v-if="item.children"
                        :[isCurrentMenu]="$route.name.includes(item.name)"
                    >
                        <summary>
                            <Icon size="24" :name="item.icon"></Icon>
                            {{ item.title }}
                        </summary>
                        <ul>
                            <li v-for="child in item.children">
                                <NuxtLink
                                    :to="{ name: child.name }"
                                    :class="{ active: $route.name === child.name }"
                                >
                                    {{ child.title }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </details>
                </li>

                <li v-if="!auth.isLoggedIn">
                    <NuxtLink to="/admin/login" class="">
                        <Icon
                            size="24"
                            name="heroicons:arrow-left-on-rectangle-20-solid"
                        ></Icon>
                        <span class="ml-3 flex-1 whitespace-nowrap">Đăng nhập</span>
                    </NuxtLink>
                </li>
                <li v-if="auth.isLoggedIn" @click="logout">
                    <a href="#" class="">
                        <Icon
                            size="24"
                            name="heroicons:arrow-right-on-rectangle-20-solid"
                        ></Icon>
                        <span class="ml-3 flex-1 whitespace-nowrap">Đăng xuất</span>
                    </a>
                </li>
            </ul>

        </aside>
    </div>
</template>

<script setup>
import {useToastStore} from "~/stores/useToastStore";
import {useAuthStore} from "~/stores/useAuthStore";

const toast = useToastStore();
const auth = useAuthStore();

const user = await auth.user;
const logout = async () => {
    const logout = await auth.logout();
    if (!logout.error.value) {
        auth.user = null;
        toast.success("Đăng xuất thành công");
        navigateTo("/admin/login");
    }
};

const isCurrentMenu = "open";

const navigation = [
    {
        name: "admin-dashboard",
        title: "Dashboard",
        icon: "heroicons:home-20-solid",
    },
    {
        name: "admin-users",
        title: "Tài khoản",
        icon: "heroicons:user-group-20-solid",
    },
    {
        name: "admin-rights",
        title: "Phân quyền",
        icon: "heroicons:key-20-solid",
        children: [
            {
                name: "admin-rights-permissions",
                title: "Quyền",
            },
            {
                name: "admin-rights-roles",
                title: "Vai trò",
            },
        ],
    },
];
</script>

<style scoped></style>
