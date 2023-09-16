<template>
    <details class="dropdown dropdown-end">
        <summary>
            <div class="btn m-1 btn-xs">
                <Icon size="16" name="heroicons:trash-20-solid"></Icon>
            </div>
        </summary>
        <div
            class="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-base-300">
            <div class="card-body flex flex-col gap-10">
                <p>Bạn chắc chắn muốn xóa?</p>
                <div class="flex flex-row justify-between">
                    <button class="btn btn-xs btn-success">Đồng ý</button>
                    <button class="btn btn-xs btn-error" @click="">Hủy</button>
                </div>
            </div>
        </div>
    </details>
</template>

<script setup lang="ts">
</script>