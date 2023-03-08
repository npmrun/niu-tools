/**
 * 发布订阅者
 * 使用此模块需先安装tiny-emitter
 */


let TinyEmitter;
let emitter;
try {
    const TinyEmitterModule = require("tiny-emitter")
    TinyEmitter = TinyEmitterModule.TinyEmitter
    emitter = new TinyEmitter();
} catch (error) {
    console.error("请先安装tiny-emitter才可使用event模块")
}

module.exports = exports = {
    emitter,
    TinyEmitter,
}