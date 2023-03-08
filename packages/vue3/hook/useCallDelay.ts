import { IOptions } from "@/type";
import { computed, ref, watchEffect } from "vue";

export function useCallDelay(callback: Function, delay: number = 200, options?: IOptions) {
    let timeID = ref<ReturnType<typeof setTimeout>>()
    let last: number
    function cancel() {
        if (timeID.value) {
            clearTimeout(timeID.value)
            timeID.value = undefined
        }
    }
    function run(this: void, ...argu: any[]) {
        if (options?.debounce) {
            if (timeID.value) {
                cancel()
            }
            timeID.value = setTimeout(() => {
                timeID.value = undefined
                callback.apply(this, argu)
            }, delay)
        }
        if (options?.throttle) {
            const now = +new Date()
            if (last && now - last < delay) {
                cancel()
                timeID.value = setTimeout(() => {
                    timeID.value = undefined
                    last = now
                    callback.apply(this, argu)
                }, delay)
            } else {
                last = now
                callback.apply(this, argu)
            }
        }
        if (!options?.throttle && !options?.debounce) {
            timeID.value = setTimeout(() => {
                timeID.value = undefined
                callback.apply(this, argu)
            }, delay)
        }
    }

    watchEffect(onCleanup => {
        if (!delay && delay !== 0) {
            return
        }
        if (!options?.lazy) {
            run()
        }
        onCleanup(cancel)
    })

    const isWaiting = computed(() => {
        return !!timeID.value
    })
    return {
        run,
        stop,
        timeID,
        isWaiting,
    }
}
