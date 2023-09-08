import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import path from 'path'
import { defineConfig } from 'vitepress'
import { getSidebar, getNav } from '../modules';
import { MarkdownTransform } from './plugins/markdownTransform';

let oldSidebar: string
let isRestarting: boolean = false

const userConfig = defineConfig({
    lang: 'zh-CN',
    // lastUpdated: true,
    head: [
        ['link', { rel: 'icon', href: '/favicon.svg' }]
    ],
    title: 'Code Tools',
    description: 'Build Tools For Code',
    themeConfig: {
        siteTitle: 'Niu-Tools',
        footer: {
            message: 'Released under the MIT License.',
            copyright: `Copyright © ${new Date().getFullYear()}-present NPMRUN`,
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/npmrun/niu-tools' },
        ],
        // https://juejin.cn/post/7227358177489961018#heading-5
        // sidebar,
    },
    markdown: {
        theme: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
        },
        config(md) {
            md.use(containerPreview)
            md.use(componentPreview)
        },
    },
    vite: {
        publicDir: path.resolve(__dirname, "../../public"),
        plugins: [
            MarkdownTransform(),
            {
                name: "refresh-tree",
                enforce: "post",
                config(config) {
                    let curSidebar = getSidebar()
                    // @ts-ignore
                    config.vitepress.site.themeConfig.sidebar = curSidebar;
                    // @ts-ignore
                    config.vitepress.site.themeConfig.nav = getNav()
                    oldSidebar = JSON.stringify(curSidebar)
                    return config;
                },
                async handleHotUpdate(ctx) {
                    const { file, read, server, modules } = ctx
                    if (file.endsWith('.md')) {
                        let curSidebar = getSidebar()
                        if (JSON.stringify(curSidebar) !== oldSidebar) {
                            if (userConfig.themeConfig) {
                                userConfig.themeConfig.sidebar = curSidebar
                                oldSidebar = JSON.stringify(curSidebar)
                            }
                            server.moduleGraph.onFileChange('/@siteData')
                        }
                        // const mod = server.moduleGraph.getModuleById(
                        //     '/@siteData'
                        // )
                        // if (!mod) return
                        // if (userConfig.themeConfig) {
                        //     let curSidebar = getSidebar()
                        //     if (JSON.stringify(curSidebar) !== oldSidebar) {
                        //         userConfig.themeConfig.sidebar = curSidebar
                        //         // server.ws.send({
                        //         //     type: 'custom',
                        //         //     event: '/@siteData',
                        //         //     data: {
                        //         //         default: userConfig
                        //         //     }
                        //         // })
                        //         server.ws.send({
                        //             type: 'update',
                        //             updates: [
                        //                 {
                        //                     acceptedPath: mod.url,
                        //                     path: mod.url,
                        //                     timestamp: Date.now(),
                        //                     type: 'js-update'
                        //                 }
                        //             ]
                        //         })
                        //     }
                    }
                },
                configureServer(server) {
                    // const { moduleGraph, watcher, ws, restart } = server
                    // function reload() {
                    //     let curSidebar = getSidebar()
                    //     if (JSON.stringify(curSidebar) !== oldSidebar) {
                    //         console.log("侧边栏更新");
                    //         if (isRestarting) {
                    //             return
                    //         }
                    //         isRestarting = true
                    //         restart().then(() => {
                    //             setTimeout(() => {
                    //                 isRestarting = false
                    //             }, 0);
                    //         })
                    //     }
                    // }
                    // watcher
                    //     .add(["**/*.md"])
                    //     .on('add', reload)
                    //     .on('change', reload)
                    //     .on('unlink', reload)
                }
            }
        ]
    },
})

export default userConfig