import { ref } from 'vue'

export function useReadyResolve() {
    let readyResolve: (value: any) => void
    const isLoading = ref(false)
    const promise = new Promise(resolve => {
        isLoading.value = true
        readyResolve = resolve
    })

    function callFn(value?: any) {
        readyResolve(value)
    }

    function onReady(cb: (value: unknown) => unknown) {
        promise.then((res) => {
            isLoading.value = false
            cb(res)
        })
    }

    return {
        isLoading,
        callFn,
        onReady,
    }
}