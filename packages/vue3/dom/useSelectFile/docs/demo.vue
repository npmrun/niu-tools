<script setup lang="ts">
import { ref } from 'vue'
import { useSelectFile } from '@niu-tools/vue3'

const { loading, error, execute } = useSelectFile()

const result = ref<File[]>()
async function readFile() {
    result.value = await execute(['*'], true)
    console.log(result.value)
}
</script>

<template>
    <div>
        <n-card title="选择多个文件">
            <n-button @click="readFile()">选择文件</n-button>
            <div>是否选择中：{{ loading }}</div>
            <div>选择失败原因：{{ error }}</div>
            <div>选择的文件</div>
            <ul>
                <li v-for="item in result">{{ item.name }}</li>
            </ul>
        </n-card>
    </div>
</template>
