<template>
  <div>
    <h1>Quyền</h1>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from "nuxt/dist/pages/runtime";
definePageMeta({
  layout: "admin",
  middleware: ["logged-out"],
});
</script>

<style scoped></style>
