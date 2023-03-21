import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import path from 'path'
import { defineConfig } from 'vitepress'
import { getSideBar } from './getSideBar';
import { MarkdownTransform } from './plugins/markdownTransform';

const json = getSideBar("./packages", {
    startsDirs: ["guide", "core/common", "core/browser", "core/node", "vue3", "uniapp"],
    ignoreMDFiles: ['CHANGELOG'],
    ignoreDirectory: ['node_modules', 'dist'], 
})

export default defineConfig({
    lang: 'zh-CN',
    // lastUpdated: true,
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
            '/core/': json,
            '/uniapp/': json,
            '/vue3/': json,
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
        // theme: 'dracula',
        config(md) {
            md.use(containerPreview)
            md.use(componentPreview)
        },
    },
    vite: {
        publicDir: path.resolve(__dirname, "../../public"),
        plugins: [
            MarkdownTransform()
        ]
        // server: {
        //     fs: {
        //          allow: ["../../node_modules"]
        //     }
        // }
    },
})