<template>
    <div v-if="permissionError" class="w-full flex justify-center text-center items-center">
        <div
            class="w-1/2 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert">
            <Icon size="24" name="heroicons:information-circle-20-solid" class="mr-1"></Icon>
            {{ permissionError }}
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps(['permissionError']);
</script>