这个一个操作 Dom 的 class 属性的工具

## Demo

<preview path="./demo.vue" title="@niu-tools/core/browser/class" description="操作Dom的class"></preview>

## setStyle

```ts
import { setStyle } from "@niu-tools/core/browser/class";

setStyle(targetRef.value!, {
    color: 'green'
})
```
采用遍历方法一个个设置的值,使用还是简单

## getStyle

```ts
import { getStyle } from "@niu-tools/core/browser/class";

const value = getStyle(targetRef.value!, "color")
```

`getStyle`使用了`getComputedStyle`,兼容性如下:

https://caniuse.com/?search=getComputedStyle

可以看出还是不错的。
这个函数是返回当前的样式的值，[点击查看文档](https://developer.mozilla.org/zh-CN/docs/web/api/window/getcomputedstyle)。
根据文档还能获取伪元素的值，因此该函数需要修改