import { createRequire } from 'module'

/**
 * 发布订阅者
 * 使用此模块需先安装tiny-emitter
 */
const require = createRequire(import.meta.url)

let TinyEmitter
let emitter

try {
    const mod = require('tiny-emitter')
    TinyEmitter = mod.TinyEmitter
    emitter = new TinyEmitter()
} catch (error) {
    console.error('请先安装tiny-emitter才可使用event模块')
}

export { TinyEmitter, emitter }
