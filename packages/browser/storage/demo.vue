<template>
    <div>
        <input v-model="key" style="border: 1px solid black;padding: 0 5px;" placeholder="key" type="text">
        <input v-model="value" style="border: 1px solid black;padding: 0 5px;" placeholder="value" type="text">
        <div>
            <button style="border: 1px solid black;padding: 0 6px;" @click="handleSetStorage">setStorage</button>
            <button style="border: 1px solid black;padding: 0 6px;" @click="handleGetStorage">getStorage</button>
            <button style="border: 1px solid black;padding: 0 6px;" @click="handleClearStorage">clearStorage</button>
            <button style="border: 1px solid black;padding: 0 6px;" @click="handleGetAllStorage">getAllStorage</button>
        </div>
        <div style="max-height: 200px;overflow-y: auto;">
            <div v-for="log in logs">{{ log }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { getStorage, getAllStorage, clearStorage, setStorage } from "@niu-tools/browser/storage";
import { ref } from "vue";

const logs = ref<string[]>([])
const key = ref<string>('')
const value = ref<any>()
function clear() {
    key.value = ''
    value.value = ''
}
function handleSetStorage() {
    if(!key.value || !value.value) return
    setStorage(key.value, value.value)
    logs.value.push(`key: ${key.value}, value: ${value.value}`)
    clear()
}

function handleGetStorage() {
    if(!key.value) return
    let result = getStorage(key.value)
    logs.value.push(`key: ${key.value}, value: ${result}`)
    clear()
}
function handleClearStorage() {
    clearStorage(key.value)
    clear()
}
function handleGetAllStorage() {
    const result = getAllStorage()
    console.log(JSON.stringify(result, null, 2));
    logs.value.push(JSON.stringify(result, null, 2))
}

</script>
<style lang="less" scoped>

</style>