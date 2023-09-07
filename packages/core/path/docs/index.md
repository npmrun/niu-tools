---
title: 路径相关
---

## 清理文件名

本工具参考自[rollup源码](https://github.com/rollup/rollup/blob/fec513270c6ac350072425cc045db367656c623b/src/utils/sanitizeFileName.ts)，或者可以选择使用最多的一个[npm包](https://www.npmjs.com/package/sanitize-filename)

<preview path="./demo.vue" title="@niu-tools/core/path" description="转换结果"></preview>

## 斜杆统一

在做跨平台工具时，统一是最重要的，本工具会将`\`转化为`/`，主要用于路径处理，因为window和linux的分隔符不一样。

<preview path="./slash.vue" title="@niu-tools/core/path" description="转换结果"></preview>