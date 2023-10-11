<script setup lang="ts">
import { useEChart } from '@niu-tools/vue3'
import { useResizeObserver } from '@vueuse/core'
import { onMounted, ref } from 'vue'

const data: number[][] = []

for (let i = 0; i <= 100; i++) {
    let theta = (i / 100) * 360
    let r = 5 * (1 + Math.sin((theta / 180) * Math.PI))
    data.push([r, theta])
}

function getOptions(data) {
    return {
        title: {
            text: 'Two Value-Axes in Polar',
        },
        legend: {
            data: ['line'],
        },
        polar: {},
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            },
        },
        angleAxis: {
            type: 'value',
            startAngle: 0,
        },
        radiusAxis: {},
        series: [
            {
                coordinateSystem: 'polar',
                name: 'line',
                type: 'line',
                data: data,
            },
        ],
    }
}

function handleClick(num: number) {
    const data: number[][] = []

    for (let i = 0; i <= num; i++) {
        let theta = (i / 100) * 360
        let r = 5 * (1 + Math.sin((theta / 180) * Math.PI))
        data.push([r, theta])
    }
    setOption(getOptions(data))
}

const targetEl = ref<HTMLElement | null>(null)
const { init, clear, dispose, resize, setOption } = useEChart({
    el: targetEl,
    option: getOptions(data),
})

onMounted(() => {
    useResizeObserver(targetEl, () => {
        resize()
    })
})
</script>

<template>
    <div>
        <n-space>
            <n-button @click="handleClick(50)">50数据</n-button>
            <n-button @click="handleClick(100)">100数据</n-button>
            <n-button @click="clear">清除图表</n-button>
            <n-button @click="dispose">销毁图表</n-button>
            <n-button @click="init">初始化图表</n-button>
        </n-space>
        <div
            style="height: 500px; resize: horizontal; overflow: auto"
            ref="targetEl"
        ></div>
    </div>
</template>
