<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue'
import { asyncController as Controller } from '@niu-tools/core'

const outout: string[] = ref([])

console.log = (str) => {
    outout.value.push(str)
}
const controller = new Controller();
function run() {
    outout.value = []
    controller.and(end => {
        setTimeout(() => {
            console.log("并行1")
            end();
        }, 2000);
    }).and(end => {
        setTimeout(() => {
            console.log("并行2")
            end();
        }, 2000);
    }).and(end => {
        setTimeout(() => {
            console.log("并行3")
            end();
        }, 2000);
    }).next(end => {
        setTimeout(() => {
            console.log("串行1")
            end();
        }, 2000);
    }).next(end => {
        setTimeout(() => {
            console.log("串行2")
            end();
        }, 2000);
    }).and(end => {
        setTimeout(() => {
            console.log("并行4")
            end();
        }, 2000);
    }).and(end => {
        setTimeout(() => {
            console.log("并行5")
            end();
        }, 2000);
    }).next(end => {
        setTimeout(() => {
            console.log("串行3")
            end();
        }, 2000);
    }).finish(() => {
        setTimeout(() => {
            console.log("结束")
        }, 2000);
    })
}
</script>

<template>
    <div>
        <n-button @click="run">运行</n-button>
        <div>输出：</div>
        <div v-for="i in outout">
            {{ i }}
        </div>
    </div>
</template>
