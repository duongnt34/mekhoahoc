<template>
  <div>User Page</div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["logged-out"],
});
</script>

<style scoped></style>
