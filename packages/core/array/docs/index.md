---
title: 数组相关
---

# 数组

## 随机值

用于数组的随机，将一个全部是数字的数组进行打乱。

用法：

```js
import { random } from '@niu-tools/core/array'

random([1, 2, 3])
// [3,1,2]
```

<!--code:random:code-->

## 去重

数组去重

用法：

```js
import { uniq } from '@niu-tools/core/array'

uniq([1, 1, 2, 3, 'aa', 'aa'])
// [1,2,3,'aa']
```

<!--code:uniq:code-->

## 数组拍平

数组拍平,将深层的数组排成一维数组

用法：

```js
import { demote } from '@niu-tools/core/array'

demote([1, 2, [3, 'aa', ['bb'], [false, ['ddd']]]])
// [1, 2, 3, 'aa', 'bb', false, 'ddd']
```

<!--code:demote:code-->
