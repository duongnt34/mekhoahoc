<template>
  <TransitionGroup
    tag="div"
    enter-from-class="translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-1"
    enter-active-class="transition duration-500 ease-in-out"
    leave-from-class="translate-x-0 opacity-1"
    leave-to-class="translate-x-full opacity-0"
    leave-active-class="transition duration-500 ease-in-out"
    class="toast toast-end toast-top z-50"
  >
    <ToastItem
      v-for="(item, index) in items"
      :key="item.key"
      :message="item.message"
      :intent="item.intent"
      :duration="item.duration ? item.duration : 2000"
      @remove="remove(index)"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import ToastItem from "./ToastItem.vue";
import { useToastStore } from "~/stores/useToastStore";

const toast = useToastStore();

const items = toast.items;

const remove = (index: number) => {
  toast.remove(index);
};
</script>
