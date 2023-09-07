export function throttle<T extends any[], R = void>(
    fn: (...argu: T) => R,
    interval: number
) {
    let last: number
    let timer: ReturnType<typeof setInterval> | void
    return function (this: void, ...argu: T) {
        const now = +new Date()
        if (last && now - last < interval) {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                last = now
                fn.apply(this, argu)
            }, interval)
        } else {
            last = now
            fn.apply(this, argu)
        }
    }
}
