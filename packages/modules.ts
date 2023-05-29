import { getSideBar } from './.vitepress/getSideBar'

export const modules = [
    'shared',
    'core',
    'browser',
    'node',
    'vue3',
    'uniapp',
    'request',
]

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
    '/uniapp/': json,
    '/vue3/': json,
    '/request/': json,
}
