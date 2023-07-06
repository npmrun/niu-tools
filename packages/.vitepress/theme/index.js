import DefaultTheme from 'vitepress/theme'
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

export default {
    ...DefaultTheme,
    enhanceApp({ app, router, siteData }) {
        app.component('demo-preview', AntDesignContainer)
        app.use(ArcoVue);
    },
}
