<template>
    <div>
        <div ref="targetRef">target node</div>
        <a-space>
            <a-button style="border: 1px solid black;padding: 0 6px;" @click="clickHasClass">hasClass</a-button>
            <a-button style="border: 1px solid black;padding: 0 6px;" @click="clickAddClass">addClass</a-button>
            <a-button style="border: 1px solid black;padding: 0 6px;" @click="clickRemoveClass">removeClass</a-button>
            <a-button style="border: 1px solid black;padding: 0 6px;" @click="clickToggleClass">toggleClass</a-button>
            <a-button style="border: 1px solid black;padding: 0 6px;" @click="clickSetStyle">setStyle</a-button>
            <a-button style="border: 1px solid black;padding: 0 6px;" @click="clickGetStyle">getStyle</a-button>
        </a-space>
        <div style="max-height: 200px;overflow-y: auto;">
            <div v-for="log in logs">{{ log }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { hasClass, addClass, removeClass, toggleClass, setStyle, getStyle } from "@niu-tools/browser/dom";
import { ref } from "vue";

const targetRef = ref<HTMLElement>()

const logs = ref<string[]>([])

function clickHasClass() {
    const result = hasClass(targetRef.value!, "test")
    logs.value.unshift(`hasClass: ${result}`)
}

function clickAddClass() {
    addClass(targetRef.value!, "test")
    logs.value.unshift(`addClass: test`)
}

function clickRemoveClass() {
    removeClass(targetRef.value!, "test")
    logs.value.unshift(`removeClass: test`)
}

function clickToggleClass() {
    toggleClass(targetRef.value!, "test")
    logs.value.unshift(`toggleClass: test`)
}

function clickSetStyle() {
    setStyle(targetRef.value!, {
        color: 'green'
    })
    logs.value.unshift(`setStyle: color green`)
}

function clickGetStyle() {
    const value = getStyle(targetRef.value!, "color")
    logs.value.unshift(`color: ${value}`)
}
</script>
<style scoped>
.test{
    color: red !important;
}
</style>