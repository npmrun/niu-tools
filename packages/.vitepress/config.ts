import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import path from 'path'
import { defineConfig } from 'vitepress'
import { sidebar } from '../modules';
import { MarkdownTransform } from './plugins/markdownTransform';

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
        sidebar,
    },
    markdown: {
        // theme: {
        //     light: 'vitesse-light',
        //     dark: 'vitesse-dark',
        // },
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
    },
})