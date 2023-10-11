import { ref, Ref, unref } from "vue"
import * as echarts from "echarts"
import type { } from "echarts"
import { useEventListener, tryOnMounted, tryOnBeforeUnmount } from "@vueuse/core";

export function useEChart(opts: { el: Ref<HTMLElement | null>; option?: any, cloneNode?: boolean }) {
    const originOption = opts.option ?? {}
    let myChart: ReturnType<typeof echarts.init> | null = null
    let pureEl: Node | undefined
    let curOption = ref(originOption)

    const stop = useEventListener(window, "resize", () => {
        if (!myChart) return
        myChart?.resize()
    })
    function clear() {
        if (!myChart) return
        myChart?.clear()
    }

    function dispose() {
        if (!myChart) return
        if (myChart.isDisposed()) return
        // curOption.value = originOption
        myChart?.dispose()
        if (pureEl) {
            const el = unref(opts.el)
            el?.replaceWith(pureEl)
            opts.el.value = pureEl as any
            pureEl = undefined
        }
        myChart = null
    }

    function resize() {
        myChart?.resize()
    }

    tryOnMounted(init)
    tryOnBeforeUnmount(() => {
        stop()
        dispose()
        myChart = null
        pureEl = undefined
        curOption.value = undefined
    })
    function setOption(option: object | null = null) {
        if (option) curOption.value = option
        myChart && myChart.setOption(curOption.value)
    }
    function init() {
        if (myChart) return
        const el = unref(opts.el)
        if (!el) {
            return
        }
        if (opts.cloneNode) {
            pureEl = el.cloneNode(true)
        }
        myChart = echarts.init(el)
        setOption()
    }
    return {
        init,
        dispose,
        clear,
        resize,
        setOption,
    }
}
