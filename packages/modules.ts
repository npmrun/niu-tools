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
// 需要发布的模块，
export const publishModules = [...modules]
export const justPublish = ['tsconfig']

// export const docs = ['guide', ...modules]
// const json = getSideBar('./packages', {
//     startsDirs: docs,
//     ignoreMDFiles: ['CHANGELOG'],
//     ignoreDirectory: ['node_modules', 'dist'],
// })

function getTree(name: string[]) {
    const result: any[] = [
        {
            text: '总目录',
            link: '/guide/introduction',
            // items: getNav(),
        },
    ]
    result.push(
        ...(getSideBar('./packages', {
            startsDirs: name,
            ignoreMDFiles: ['CHANGELOG'],
            ignoreDirectory: ['node_modules', 'dist'],
        }) ?? [])
    )
    return result
}

export const getNav = () => ([
    {
        text: '工具模块',
        items: [
            {
                text: '通用',
                link: '/core/readme',
            },
            {
                text: '浏览器',
                link: '/browser/readme',
            },
            {
                text: 'node',
                link: '/node/readme',
            },
        ],
    },
    {
        text: 'vue3',
        link: '/vue3/readme',
    },
    {
        text: 'tsconfig',
        link: '/tsconfig/readme',
    },
    {
        text: 'request',
        link: '/request/readme',
    },
    {
        text: 'uniapp',
        link: '/uniapp/readme',
    },
])

export const getSidebar = () => ({
    '/guide/': [
        {
            text: '总目录',
            items: getNav(),
        },
    ],
    '/browser/': getTree(['browser']),
    '/node/': getTree(['node']),
    '/core/': getTree(['core']),
    '/uniapp/': getTree(['uniapp']),
    '/vue3/': getTree(['vue3']),
    '/request/': getTree(['request']),
    '/tsconfig/': getTree(['tsconfig']),
})
