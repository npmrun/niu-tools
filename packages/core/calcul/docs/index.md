---
title: 数值计算
---

# 数值计算

在前端的数值计算时，时常会遇到无法预料的问题，例如最常见的`0.1+0.2≠0.3`。为了尽可能减少可能曾遇见的问题，有必要记录下每种无法预料的情况是该怎么处理。

## toFixed

将一个数字保留指定位数的小数

用法：

```js
import { toFixed } from '@niu-tools/core/calcul'

toFixed(1.333332, 2)
// 1.33
```

<!--code:toFixed:code-->

## accAdd

两个数的精确相加

用法：

```js
import { accAdd } from '@niu-tools/core/calcul'

accAdd(0.1, 0.2)
// 0.3
```

<!--code:accAdd:code-->
