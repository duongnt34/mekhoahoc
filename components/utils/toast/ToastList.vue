<template>
  <div class="toast toast-end toast-top z-50">
    <ToastItem
      v-for="(item, index) in items"
      :key="item.key"
      :message="item.message"
      :intent="item.intent"
      :duration="item.duration?"
      @remove="remove(index)"
    />
  </div>
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
