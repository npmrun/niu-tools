import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import path from 'path'
import { defineConfig } from 'vitepress'
import { getSideBar } from './getSideBar';
import { MarkdownTransform } from './plugins/markdownTransform';

const json = getSideBar("./packages", {
    startsDirs: ["guide", "core", "browser", "node", "vue3", "uniapp", "request"],
    ignoreMDFiles: ['CHANGELOG'],
    ignoreDirectory: ['node_modules', 'dist'],
})

export default defineConfig({
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
        sidebar: {
            '/guide/': json,
            '/browser/': json,
            '/node/': json,
            '/core/': json,
            '/uniapp/': json,
            '/vue3/': json,
            '/request/': json,
            // [
            //     {
            //         text: '导引',
            //         items: [
            //             { text: '介绍', link: '/guide/introduction' },
            //         ],
            //     },
            //     {
            //         text: 'CC',
            //         items: [
            //             { text: '介绍', link: '/core/browser/README' },
            //         ],
            //     },
            // ]
        },
    },
    markdown: {
        theme: 'github-dark',
        config(md) {
            md.use(containerPreview)
            md.use(componentPreview)
        },
    },
    vite: {
        publicDir: path.resolve(__dirname, "../../public"),
        plugins: [
            MarkdownTransform()
        ],
        define: {
            __APP__: "'aaa'"
        },
        // server: {
        //     fs: {
        //          allow: ["../../node_modules"]
        //     }
        // }
    },
})