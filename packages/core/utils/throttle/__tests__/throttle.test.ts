import { throttle } from '..'

describe('节流函数', () => {
    it('节流', async () => {
        expect.assertions(2)
        vi.useFakeTimers()
        const fn = vi.fn(() => void 0)
        const callFn = throttle(fn, 200)
        callFn()
        callFn()
        callFn()
        callFn()
        callFn()
        callFn()
        callFn()
        callFn()
        callFn()
        // 200ms前调用了1次
        expect(fn).toHaveBeenCalledTimes(1)
        await vi.advanceTimersByTimeAsync(200)
        // 200ms后调用了1次
        expect(fn).toHaveBeenCalledTimes(2)
    })
})
