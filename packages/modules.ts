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
export const justPublish = ["tsconfig"]

// export const docs = ['guide', ...modules]
// const json = getSideBar('./packages', {
//     startsDirs: docs,
//     ignoreMDFiles: ['CHANGELOG'],
//     ignoreDirectory: ['node_modules', 'dist'],
// })

function getTree(name: string[]) {
    const result: any[] = [
        {
            text: "总目录",
            link: '/guide/introduction'
        }
    ]
    result.push(...getSideBar('./packages', {
        startsDirs: name,
        ignoreMDFiles: ['CHANGELOG'],
        ignoreDirectory: ['node_modules', 'dist'],
    }) ?? [])
    return result
}

export const sidebar = {
    '/guide/': [
        {
            text: "总目录",
            items: [
                {
                    text: "浏览器",
                    link: '/browser/readme'
                },
                {
                    text: "通用",
                    link: '/core/readme'
                },
            ],
        }
    ],
    '/browser/': getTree(['browser']),
    '/node/': getTree(['node']),
    '/core/': getTree(['core']),
    '/loadconfig/': getTree(['loadconfig']),
    '/uniapp/': getTree(['uniapp']),
    '/vue3/': getTree(['vue3']),
    '/request/': getTree(['request']),
}
