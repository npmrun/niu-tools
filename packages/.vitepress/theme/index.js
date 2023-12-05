import DefaultTheme from 'vitepress/theme'
import { NaiveUIContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import naive from 'naive-ui'
import page404 from './page404.vue'
import { h } from 'vue'

export default {
    ...DefaultTheme,
    enhanceApp ({ app, router, siteData }) {
        app.use(naive)
        app.component('demo-preview', NaiveUIContainer)
    },
    Layout () {
        return h(DefaultTheme.Layout, null, {
            'not-found': () => h(page404)
        })
    }
}
