<template>
  <div class="flex flex-col gap-5 py-5">
    <div class="flex justify-between">
      <h1 class="self-center text-2xl font-semibold uppercase">Nổi bật</h1>
      <div class="flex items-center gap-3">
        <p><Icon name="ph:tag"></Icon> Hot tags:</p>
        <ul class="flex items-center gap-3">
          <li v-for="tag in 5">
            <button type="button" class="rounded-md bg-[#e5e5e5] px-2 py-1">
              #Work
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-10">
      <div
        class="relative col-span-2 min-h-[520px] overflow-hidden rounded-2xl shadow-2xl"
      >
        <NuxtImg
          class="h-full w-full object-cover"
          format="webp"
          fit="cover"
          src="/images/news-4.jpg"
          alt="Feature"
        ></NuxtImg>
        <div
          class="absolute inset-0 flex w-full flex-col justify-end gap-10 bg-opacity-0 bg-gradient-to-t from-black/50 to-transparent p-10 text-white"
        >
          <div class="flex flex-col">
            <div class="flex gap-3">
              <h5 class="">Travel.</h5>
              <h5 class="">Food.</h5>
            </div>
            <div class="">
              <NuxtLink to="#">
                <h2 class="text-3xl font-semibold">
                  Beachmaster Elephant Seal Fights off Rival Male, The match is
                  uncompromising
                </h2>
              </NuxtLink>
            </div>
          </div>
          <div class="flex flex-row text-sm uppercase">
            <span>27 August</span>. <span>12 Mins Read</span>.
            <span>23K Views</span>
          </div>
        </div>
      </div>
      <div v-for="post in 4" class="min-h-[520px]">
        <FeatureCard></FeatureCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FeatureCard from "./FeatureCard.vue";
</script>

<style scoped></style>
