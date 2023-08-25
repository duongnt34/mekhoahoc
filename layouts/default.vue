<template>
  <div>
    <TheHeader></TheHeader>
    <slot></slot>
    <TheFooter>xyz</TheFooter>
  </div>
</template>
<script setup lang="ts">
import TheFooter from "~/components/client/layouts/TheFooter.vue";
import TheHeader from "~/components/client/layouts/TheHeader.vue";
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
