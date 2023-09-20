---
layout: home

hero:
    name: Niu Tools
    text: 自用工具库
    tagline: 构建常用的函数，封装最优的解决方法
    image:
        src: /favicon.svg
        alt: VitePress
    actions:
        - theme: brand
          text: 开始
          link: /guide/introduction
        - theme: alt
          text: 查看GitHub
          link: https://github.com/npmrun/niu-tools
features:
    - icon: ⚡️
      title: changeset
      details: 管理多个库之间的版本依赖
    - icon: 🖖
      title: pnpm
      details: 提供workspace支持
    - icon: 🛠️
      title: typescript
      details: 给前端编程加一点料
---

<style>
    .VPFeatures.VPHomeFeatures .items .item{
        width: 100%;
        
    }
    @media (min-width: 640px){
        .VPFeatures.VPHomeFeatures .items .item{
            width: calc(100% / 2);
        }
    }
    @media (min-width: 768px){
        .VPFeatures.VPHomeFeatures .items .item{
            width: calc(100% / 3);
        }
    }
    :root {
        --vp-home-hero-name-color: transparent;
        --vp-home-hero-name-background: linear-gradient(120deg, #bd34fe, #41d1ff);

        --vp-home-hero-image-background-image: url(/favicon.svg);
        --vp-home-hero-image-filter: blur(40px)
    }
    @media (min-width: 640px) {
        :root {
            --vp-home-hero-image-filter: blur(56px)
        }
    }

    @media (min-width: 960px) {
        :root {
            --vp-home-hero-image-filter: blur(72px)
        }
    }
</style>
