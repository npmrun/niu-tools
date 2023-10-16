import { asyncController as Controller } from '../index.new'

vi.setConfig({ testTimeout: 20_000 })

describe("异步控制", () => {
    it('asyncController', () => new Promise((done) => {
        
        const controller = new Controller();
        const fn = vi.fn(() => void 0)
        controller.and(end => {
            setTimeout(() => {
                console.log("并行1")
                fn()
                end();
            }, 2000);
        }).and(end => {
            setTimeout(() => {
                console.log("并行2")
                fn()
                end();
            }, 2000);
        }).and(end => {
            setTimeout(() => {
                console.log("并行3")
                fn()
                end();
            }, 2000);
        }).next(end => {
            setTimeout(() => {
                console.log("串行1")
                fn()
                end();
            }, 2000);
        }).next(end => {
            setTimeout(() => {
                console.log("串行2")
                fn()
                end();
            }, 2000);
        }).and(end => {
            setTimeout(() => {
                console.log("并行4")
                fn()
                end();
            }, 2000);
        }).and(end => {
            setTimeout(() => {
                console.log("并行5")
                fn()
                end();
            }, 2000);
        }).next(end => {
            setTimeout(() => {
                console.log("串行3")
                fn()
                end();
            }, 2000);
        }).finish(() => {
            setTimeout(() => {
                console.log("结束")
                fn()
                done(0)
                expect(fn).toHaveBeenCalledTimes(9)
            }, 2000);
        })
    }))
})