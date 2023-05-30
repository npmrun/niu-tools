import { tryOnMounted } from '../tryOnMounted'
import { tryOnScopeDispose } from '../tryOnScopeDispose'

export function useEventListener(
    el: any,
    event: keyof HTMLElementEventMap,
    cb: any
) {
    tryOnMounted(() => {
        el.addEventListener(event, cb)
    })

    function stop() {
        el.removeEventListener(event, cb)
    }
    tryOnScopeDispose(() => {
        stop()
    })

    return stop
}
