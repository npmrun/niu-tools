import DefaultTheme from 'vitepress/theme'
import { NaiveUIContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

export default {
    ...DefaultTheme,
    enhanceApp({ app, router, siteData }) {
        app.component('demo-preview', NaiveUIContainer)
    },
}
