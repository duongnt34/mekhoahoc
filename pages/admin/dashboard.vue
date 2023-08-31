<template>
  <div>love</div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/useAuthStore";

definePageMeta({
  layout: "admin",
  middleware: ["logged-out"],
});
</script>

<style scoped></style>
