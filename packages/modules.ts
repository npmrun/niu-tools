import { getSideBar } from './.vitepress/getSideBar'

export const modules = [
    'shared',
    'core',
    'browser',
    'loadconfig',
    'node',
    'vue3',
    'uniapp',
    'request',
]
// 需要发布的模块，
export const publishModules = [...modules]
export const justPublish =  ["tsconfig"]

export const docs = ['guide', ...modules]
const json = getSideBar('./packages', {
    startsDirs: docs,
    ignoreMDFiles: ['CHANGELOG'],
    ignoreDirectory: ['node_modules', 'dist'],
})
export const sidebar = {
    '/guide/': json,
    '/browser/': json,
    '/node/': json,
    '/core/': json,
    '/loadconfig/': json,
    '/uniapp/': json,
    '/vue3/': json,
    '/request/': json,
}
