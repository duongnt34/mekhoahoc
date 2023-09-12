import { defineStore } from 'pinia'
export const useToastStore = defineStore('toast', () => {

    type Toast = {
        message: string;
        intent: ToastIntent;
        key: any;
        duration: number | null;
    }

    type ToastIntent = 'success' | 'error' | 'warning' | 'info';

    const items = ref<Toast[]>([]);

    const add = (message: string, intent: ToastIntent, duration: number|null) => {
        items.value.unshift({ message: message, intent: intent, key: Symbol(), duration })
    }

    const remove = (index: number) => {
        items.value.splice(index, 1)
    }

    const success = (message: string, duration?: number|null) => {
        add(message, 'success', duration as number|null)
    }

    const error = (message: string, duration?: number|null) => {
        add(message, 'error', duration as number)
    }

    const warning = (message: string, duration?: number|null) => {
        add(message, 'warning', duration as number)
    }

    const info = (message: string, duration?: number|null) => {
        add(message, 'info', duration as number)
    }

    return {items, success, error, warning, info, remove}
})