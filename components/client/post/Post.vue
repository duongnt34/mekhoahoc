<template>
  <section class="mb-5">
    <h1 class="text-5xl font-semibold">
      {{ post?.title }}
    </h1>
  </section>

  <!-- Author info -->
  <section class="flex w-full items-center justify-between">
    <div class="flex items-center gap-3">
      <figure class="h-10 w-10 overflow-hidden rounded-full">
        <NuxtImg
          width="100%"
          height="100%"
          src="/images/author-3.jpg"
        ></NuxtImg>
      </figure>
      <div class="flex flex-col text-mutted">
        <p>By <span class="font-semibold text-mutted">John Doe</span></p>
        <p><span>27 August 2021</span> . <span>12 Mins Read</span></p>
      </div>
    </div>
    <div class="flex flex-row items-center gap-3">
      <span>Share this:</span>
      <ul class="flex flex-row gap-3">
        <li><Icon size="30" name="mdi:facebook-box"></Icon></li>
        <li><Icon size="30" name="mdi:twitter-box"></Icon></li>
        <li><Icon size="30" name="mdi:pinterest-box"></Icon></li>
      </ul>
    </div>
  </section>
  <article>
    {{ post?.body }}
  </article>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
const route = useRoute();
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const post = ref<Post | null>(null);

onMounted(() => {
  //   console.log(post);
});
try {
  const { data, pending, error, refresh } = await useFetch<Post>(
    "https://dummyjson.com/posts/2",
  );
  if (data) {
    post.value = data.value;
  }
} catch (error) {
  console.log(error);
}
</script>

<style scoped></style>
