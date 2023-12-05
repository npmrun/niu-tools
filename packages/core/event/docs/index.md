---
title: 发布者订阅者
---

## 推荐

```
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
```

## 其他

如果存在原生的发布者订阅者模块可以直接使用，比如 nodejs 中的 EventEmitter

```ts
import { EventEmitter } from 'events'

class MyEmiter extends EventEmitter {}

const myEmitter = new MyEmiter()

myEmitter.on('hello', () => {
    console.log('hello 有人喊你啦')
})

myEmitter.emit('hello')
```
