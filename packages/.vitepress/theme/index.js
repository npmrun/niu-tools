import DefaultTheme from 'vitepress/theme'
import { NaiveUIContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import naive from 'naive-ui'

export default {
    ...DefaultTheme,
    enhanceApp({ app, router, siteData }) {
        app.use(naive)
        app.component('demo-preview', NaiveUIContainer)
    },
}
