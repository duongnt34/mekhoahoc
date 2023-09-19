<template>
    <!--    <teleport to="body">-->
    <dialog class="modal" :class="{'modal-open' : isRevealed}">
        <div class="modal-box">
            <div class="flex flex-col gap-10">
                <slot name="modal-content"></slot>
                <div class="flex flex-row justify-end gap-3">
                    <button class="btn btn-sm btn-success" @click="confirm">Đồng ý</button>
                    <button class="btn btn-sm btn-error" @click="cancel">Hủy</button>
                </div>
            </div>
        </div>
    </dialog>
    <!--    </teleport>-->
</template>

<script setup lang="ts">
const {
    isRevealed,
    reveal,
    confirm,
    cancel,
} = useConfirmDialog()

defineExpose({
    reveal,
})
</script>