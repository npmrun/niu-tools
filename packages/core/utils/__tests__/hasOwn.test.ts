import { hasOwn } from '..'

describe('hasOwn函数测试', () => {
    it('空对象', async () => {
        const pureObject = Object.create(null)
        pureObject["test"] = "just-test"
        const  result = hasOwn(pureObject, "test")
        expect(result).toStrictEqual(true)
    })
    it('函数', async () => {
        const object = function(){}
        const  result = hasOwn(object, "prototype")
        expect(result).toStrictEqual(true)
    })
    it('普通对象', async () => {
        const object = {}
        const  result = hasOwn(object, "__proto__")
        expect(result).toStrictEqual(false)
        const example: any = {};
        expect(example.hasOwnProperty("prop")).toStrictEqual(false)
        example.prop = "exists";
        expect(example.hasOwnProperty("prop")).toStrictEqual(true)
        example.prop = null;
        expect(example.hasOwnProperty("prop")).toStrictEqual(true)
        example.prop = undefined;
        expect(example.hasOwnProperty("prop")).toStrictEqual(true)
    })
    it('delete操作', async () => {
        const object = {}
        const  result = hasOwn(object, "__proto__")
        expect(result).toStrictEqual(false)
        const example: any = {};
        example.prop = "exists";
        expect(example.hasOwnProperty("prop")).toStrictEqual(true)
        delete example.prop
        expect(example.hasOwnProperty("prop")).toStrictEqual(false)
    })
    it('Map', async () => {
        const map = new Map()
        expect(hasOwn(map, "size")).toStrictEqual(false)
        expect(hasOwn(map, "clear")).toStrictEqual(false)
    })
})
