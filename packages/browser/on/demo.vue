<template>
    <div>
        <div ref="targetRef">no bind click event</div>
        <div @click="onBindEvent">click bind event</div>
        <div @click="onRemoveEvent">click remove event</div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { on, off } from "@niu-tools/browser/on";

const targetRef = ref<HTMLElement>()

function clickNode() {
    alert("click")
}

function onBindEvent() {
    on(targetRef.value, "click", clickNode)
    targetRef.value!.innerText='already bind click event'
}

function onRemoveEvent() {
    off(targetRef.value, "click", clickNode)
    targetRef.value!.innerText='no bind click event'
}

</script>
<style lang="less" scoped>

</style>