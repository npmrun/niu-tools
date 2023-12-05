<script setup lang="ts">
import { ref } from 'vue'
import { useReadyResolve } from '@niu-tools/vue3'

const { callFn, onReady, isLoading } = useReadyResolve()

setTimeout(() => {
    callFn(1)
}, 1000)

const result = ref()
onReady((num) => {
    result.value = num
})
</script>

<template>
    <div>运行结果：</div>
    <div>
        {{ isLoading ? '加载中' : result }}
    </div>
</template>
