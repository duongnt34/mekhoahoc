<template>
  <div>
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
  <ToastList />
</template>
<script setup>
import ToastList from "~/components/utils/toast/ToastList.vue";
</script>
