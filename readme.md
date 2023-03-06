## 技术栈

`pnpm + changeset`

pnpm 用于库的编译运行以及发布，changeset 用于生成文档和版本管理

> 参考了[该文章](https://juejin.cn/post/7184392660939964474#heading-19)

## 两层 package.json

因为 npm 发布时无法做到修改 root，于是想用双包，对编译后的 dist 进行发布，需要注意的是版本依赖问题，需要两个都修改。

> 可参考[vueuse](https://github.com/vueuse/vueuse/blob/main/scripts/build.ts),思路是差不多的，它是在构建时会自动根据包进行生成`dist/package.json`,然后再`dist`中进行发布

## 发布流程

本地发布

```
pnpm run rm # 删除所有包的dist下的源码
pnpm run build # 构建所有包的源码
npx changeset # 版本文档生成
npx changeset version # 版本升级
pnpm run release # 包发布
```

因为用了 action,可以用 action 自动发布，可以使用以下两步：

```
npx changeset # 版本文档生成
npx changeset version # 版本升级
```

之后合并到 master 分支，再提交到 github 就行了
