<template>
  <div class="flex h-full flex-col rounded-2xl shadow-2xl">
    <div class="min-h-[220px] grow-0 overflow-hidden rounded-t-2xl">
      <NuxtImg format="webp" src="/images/news-7.jpg" alt="image"></NuxtImg>
    </div>
    <div class="flex grow flex-col justify-between p-10">
      <div class="flex grow flex-col">
        <div class="flex grow-0 gap-3">
          <h5 class="">Travel.</h5>
          <h5 class="">Food.</h5>
        </div>
        <div class="grow">
          <NuxtLink to="#">
            <h2 class="text-3xl font-semibold">
              Want fluffy Japanese pancakes but can’t fly to Tokyo?
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
</template>

<script setup lang="ts"></script>

<style scoped></style>
