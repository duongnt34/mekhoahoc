<template>
  <!-- POST folder -->
  <div>
    <div class="container mx-auto flex flex-row gap-10 py-5">
      <!-- Left Column -->
      <div class="w-3/4">
        <Post />
      </div>

      <!-- Right Column -->
      <aside class="w-1/4">
        <RightSide />
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import Post from "~/components/client/post/Post.vue";
import RightSide from "~/components/client/post/RightSide.vue";
</script>

<style scoped></style>
