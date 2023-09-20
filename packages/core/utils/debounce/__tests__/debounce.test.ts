import { debounce } from '..'

describe('防抖函数', () => {
    it('防抖', async () => {
        expect.assertions(2)
        vi.useFakeTimers()
        const fn = vi.fn(() => void 0)
        const callFn = debounce(fn, 200)
        callFn()
        // 200ms前调用了0次
        expect(fn).toHaveBeenCalledTimes(0)
        await vi.advanceTimersByTimeAsync(200)
        // 200ms后调用了1次
        expect(fn).toHaveBeenCalledTimes(1)
    })
})
