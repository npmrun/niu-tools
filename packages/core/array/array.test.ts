import { random, uniq, demote } from '.'

describe('数组随机', () => {
    it('随机数 0.1', () => {
        vi.spyOn(global.Math, 'random').mockReturnValue(0.1)
        expect(random([2, 1])).toStrictEqual([1, 2])
        vi.spyOn(global.Math, 'random').mockRestore()
    })
    it('随机数 0.2', () => {
        vi.spyOn(global.Math, 'random').mockReturnValue(0.2)
        expect(random([2, 1])).toStrictEqual([1, 2])
        vi.spyOn(global.Math, 'random').mockRestore()
    })

    it('随机数 0.5', () => {
        vi.spyOn(global.Math, 'random').mockReturnValue(0.5)
        expect(random([2, 1])).toStrictEqual([2, 1])
        vi.spyOn(global.Math, 'random').mockRestore()
    })
    it('随机数 0.6', () => {
        vi.spyOn(global.Math, 'random').mockReturnValue(0.6)
        expect(random([2, 1])).toStrictEqual([2, 1])
        vi.spyOn(global.Math, 'random').mockRestore()
    })
    it('随机数 0.9', () => {
        vi.spyOn(global.Math, 'random').mockReturnValue(0.9)
        expect(random([2, 1])).toStrictEqual([2, 1])
        vi.spyOn(global.Math, 'random').mockRestore()
    })
    it('随机数 1', () => {
        vi.spyOn(global.Math, 'random').mockReturnValue(1)
        expect(random([2, 1])).toStrictEqual([2, 1])
        vi.spyOn(global.Math, 'random').mockRestore()
    })
})

describe('数组去重', () => {
    it('去重 数字+字符串', () => {
        expect(uniq([1, 1, 2, 3, 'aa', 'aa'])).toStrictEqual([1, 2, 3, 'aa'])
    })
    it('去重 内含对象', () => {
        expect(uniq([1, 1, 2, 3, {}, {}])).toStrictEqual([1, 2, 3, {}, {}])
    })
})

describe('数组拍平', () => {
    it('拍平 数字+字符串', () => {
        expect(demote([1, 2, [3, 'aa']])).toStrictEqual([1, 2, 3, 'aa'])
    })
    it('拍平 深层', () => {
        expect(
            demote([1, 2, [3, 'aa', ['bb'], [false, ['ddd']]]])
        ).toStrictEqual([1, 2, 3, 'aa', 'bb', false, 'ddd'])
    })
})
