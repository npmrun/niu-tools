import DefaultTheme from 'vitepress/theme'
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import './style.css'


export default {
    ...DefaultTheme,
    enhanceApp({ app, router, siteData }) {
        app.component('demo-preview', AntDesignContainer)
        console.log(__APP__)
    },
}
