<template>
  <section>
    <h2
      class="border-b border-b-mutted-border pb-3 font-semibold uppercase text-dark-mutted-border"
    >
      Most Popular
    </h2>
    <ul class="mt-5 flex flex-col gap-5">
      <li v-for="card in 5">
        <SideCard></SideCard>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import SideCard from "~/components/client/post/SideCard.vue";
</script>

<style scoped></style>
