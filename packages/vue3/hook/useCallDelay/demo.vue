<template>
    <div>{{text}}</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCallDelay } from "./useCallDelay"
const text = ref("value")
useCallDelay(()=>{
    text.value = "wait done"
}, 2000)
</script>