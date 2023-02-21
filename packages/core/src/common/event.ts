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
    throw new Error("请先安装tiny-emitter才可使用此模块");
}

module.exports = exports = {
    emitter,
    TinyEmitter,
}