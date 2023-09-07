//debounce===== Start
/**
 * 防抖
 * @param fn 函数
 * @param duration 时常
 * @returns 执行函数
 */
export function debounce<T extends any[], R = void>(
    fn: (...argu: T) => R,
    duration: number
) {
    let timer: ReturnType<typeof setTimeout> | void
    return function f(this: void, ...argu: T) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            timer = undefined
            fn.apply(this, argu)
        }, duration)
    }
}
//debounce===== End