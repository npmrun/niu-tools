/**
githb - Search
https://www.bing.com/search?pglt=43&q=githb&cvid=dda7fe6cf86a45a78b0f414fc4ed093a&aqs=edge..69i57j69i60j69i65.614j0j1&FORM=ANSPA1&PC=CNNDDB&mkt=zh-CN

npmrun/art-theme: Beautiful blog template with Astro.
https://github.com/npmrun/art-theme

vueuse/is.ts at main · vueuse/vueuse
https://github.com/vueuse/vueuse/blob/main/packages/shared/utils/is.ts

vueuse/vueuse · Discussions · GitHub
https://github.com/vueuse/vueuse/discussions

vitepress ReferenceError: navigator is not define - Search
https://www.bing.com/search?pglt=43&q=vitepress+ReferenceError%3A+navigator+is+not+define&cvid=e945f87f90b14affb3f3f0282262f14f&aqs=edge..69i57.2203j0j1&FORM=ANNTA1&PC=U531&mkt=zh-CN

Build: navigator is not defined · Issue #1690 · vuejs/vitepress
https://github.com/vuejs/vitepress/issues/1690

Code Tools | Code Tools
http://localhost:4173/core/browser/check/

vitepress渲染需要区分浏览器环境还是node环境
 */

export const isClient = typeof window !== 'undefined'

export const defaultWindow = /* #__PURE__ */ isClient ? window : undefined