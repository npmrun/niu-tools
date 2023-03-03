import { computed, ref, watchEffect } from "vue";

export function useSetTimeout(callback: Function, delay: number = 200) {
    let timeID = ref<ReturnType<typeof setTimeout>>()
    function cancel() {
        if (timeID.value) {
            clearTimeout(timeID.value)
            timeID.value = undefined
        }
    }
    function run() {
        timeID.value = setTimeout(() => {
            timeID.value = undefined
            callback()
        }, delay);
    }

    watchEffect((onCleanup) => {
        if (!delay && delay !== 0) {
            return
        }
        run()
        onCleanup(cancel)
    })

    const isWaiting = computed(() => {
        return !!timeID.value
    })
    return {
        stop,
        timeID,
        isWaiting
    }
}