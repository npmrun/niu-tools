<script setup lang="ts">
import { ref } from 'vue'
import { useReadFileContent } from '@niu-tools/vue3'

const { loading, error, execute } = useReadFileContent()

const result = ref()
async function readFile() {
    result.value = await execute()
    console.log(result.value);
}
</script>

<template>
    <div>
        <n-button @click="readFile()">读取文件</n-button>
        <div>是否读取中：{{ loading }}</div>
        <div>读取失败原因：{{ error }}</div>
        <div>读取结果：</div>
        <n-input
            readonly
            placeholder="空"
            v-model:value="result"
            type="textarea"
        />
    </div>
</template>
