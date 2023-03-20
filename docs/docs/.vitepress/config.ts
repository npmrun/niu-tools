import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import { defineConfig } from 'vitepress'
import fs from 'fs-extra'

export default defineConfig({
    lang: 'zh-CN',
    lastUpdated: true,
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
            '/guide/': [
                {
                    text: '导引',
                    items: [
                        { text: '介绍', link: '/guide/introduction' },
                    ],
                },
            ]
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
        server: {
            fs: {
                // allow: ["../../node_modules"]
            }
        }
    },
})