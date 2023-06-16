import { ref, Ref, unref } from "vue"
import * as echarts from "echarts"
import { useEventListener, tryOnMounted, tryOnBeforeUnmount } from "@vueuse/core";

export function useEChart(opts: { el: Ref<HTMLElement>; option?: any }) {
    let myChart: echarts.ECharts | null = null
    let curOption = ref(opts.option ?? {})

    const stop = useEventListener(window, "resize", () => {
        if (!myChart) return
        myChart?.resize()
    })
    function clear() {
        if (!myChart) return
        if (myChart.isDisposed()) return
        curOption.value = undefined
        myChart?.dispose()
        myChart = null
    }

    function resize() {
        myChart?.resize()
    }
    tryOnMounted(() => {
        const el = unref(opts.el)
        if (!el) {
            clear()
            return
        }
        myChart = echarts.init(el)
        setOption()
    })
    tryOnBeforeUnmount(() => {
        stop()
        clear()
    })
    function setOption(option: object | null = null) {
        if (option) curOption.value = option
        myChart && myChart.setOption(curOption.value)
    }
    return {
        clear,
        resize,
        setOption,
    }
}
