import { toFixed, accAdd } from '.'

describe('数字工具', () => {
    it('toFixed 非数字', () => {
        expect(() => toFixed('11.22', 1)).toThrowError('number不是数字')
    })
    it('toFixed 保留2位小数', () => {
        expect(toFixed(0.22332, 2)).toStrictEqual('0.22')
    })
    it('0.1 + 0.2 ≠ 0.3', () => {
        expect(0.1 + 0.2).toStrictEqual(0.30000000000000004)
    })
    it('accAdd 精确相加 0.1+0.2', () => {
        expect(accAdd(0.1, 0.2)).toStrictEqual(0.3)
    })
})
