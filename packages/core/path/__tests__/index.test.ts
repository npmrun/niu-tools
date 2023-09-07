import { sanitizeFileName, slash } from '..'

describe('sum', () => {
    it('sanitizeFileName', () => {
        expect(sanitizeFileName("~/.$@%^&*\u0000ssh/author$%%&$#ized_keys")).toEqual("~/._@%____ssh/author_%%___ized_keys")
    })
    it('slash', () => {
        expect(slash("D:\\\\a\\b\\c\\d\\e")).toEqual("D://a/b/c/d/e")
    })
})
