<template>
  <div :class="containerClass">
    <div class="flex shrink-0 items-center">
      <Icon :class="iconClass" size="20" :name="iconName"></Icon>
    </div>
    <div :class="messageClass">{{ message }}</div>
    <div class="flex shrink-0 cursor-pointer items-center">
      <Icon
        :class="iconClass"
        size="20"
        name="heroicons:x-mark-20-solid"
        @click="emit('remove')"
      ></Icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cva } from "class-variance-authority";
const props = defineProps({
  message: {
    type: String,
  },

  intent: {
    type: String as PropType<"info" | "success" | "warning" | "error">,
    default: "info",
    validator(value: string) {
      return ["info", "success", "warning", "error"].includes(value);
    },
  },
  key: {
    type: Symbol,
  },
  duration: {
    type: Number,
    default: 2000,
  },
});

onMounted(() => {
  setTimeout(() => emit("remove"), props.duration);
});
const emit = defineEmits(["remove"]);

const containerClass = computed(() => {
  return cva("w-[400px] flex gap-3 rounded-md p-4 items-center", {
    variants: {
      intent: {
        info: "bg-blue-100",
        success: "bg-green-100",
        warning: "bg-orange-100",
        error: "bg-red-100",
      },
    },
  })({
    intent: props.intent,
  });
});

const iconClass = computed(() => {
  return cva("", {
    variants: {
      intent: {
        info: "text-blue-500",
        success: "text-green-500",
        warning: "text-orange-500",
        error: "text-red-500",
      },
    },
  })({
    intent: props.intent,
  });
});

const iconName = computed(() => {
  return cva("", {
    variants: {
      intent: {
        info: "heroicons:information-circle-20-solid",
        success: "heroicons:check-circle-20-solid",
        warning: "heroicons:question-mark-circle-20-solid",
        error: "heroicons:question-mark-circle-20-solid",
      },
    },
  })({
    intent: props.intent,
  });
});

const messageClass = computed(() => {
  return cva("flex-1 whitespace-break-spaces", {
    variants: {
      intent: {
        info: "text-blue-500",
        success: "text-green-500",
        warning: "text-orange-500",
        error: "text-red-500",
      },
    },
  })({
    intent: props.intent,
  });
});
</script>
