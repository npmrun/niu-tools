import fs from "fs-extra"
import path from "path"

interface IOpts {
    base?: string,
    include?: RegExp,
    ignore?: RegExp,
    exculeFolder?: string[]
}
interface IOutput {
    absoultePath: string,
    relativePath: string
    baseRelativePath: string
    isFile: boolean
    isDirectory: boolean
}
function walkDir(dir: string = ".", cb?: (output: IOutput) => void, opts: IOpts = {
    include: undefined,
    ignore: undefined,
    exculeFolder: undefined
}) {
    if (!dir) return;
    function _walk(dir: string) {
        const files = fs.readdirSync(dir);
        const len = files.length
        for (var i = 0; i < len; i++) {
            const file = files[i]
            const pathname = path.resolve(dir, file); // 绝对路径
            const filename = path.join(dir, file); // 相对路径
            var stat = fs.lstatSync(pathname);
            const isFile = stat.isFile()
            const isDirectory = stat.isDirectory()
            if (isDirectory && (opts.exculeFolder ?? ["node_modules", ".git"]).includes(file)) {
                continue;
            }
            if (opts.ignore && opts.ignore.test(pathname)) {
                continue;
            }
            const callback = () => cb && cb({
                absoultePath: pathname,
                relativePath: filename,
                baseRelativePath: opts.base ? path.relative(opts.base, filename) : filename,
                isDirectory,
                isFile
            })
            if (isFile && opts.include && opts.include.test(pathname)) {
                callback()
            } else if (!opts.include) {
                callback()
            }
            if (stat.isDirectory()) {
                _walk(filename)
            }
        }
    }
    _walk(dir)
}

const allMenu: any[] = []
walkDir("packages", function ({ baseRelativePath, isFile }) {
    if (isFile) {
        const menuList = baseRelativePath.split(path.sep)
        let index = 0
        let len = menuList.length
        let curList = allMenu
        while (index < len) {
            let curText = menuList[index]
            let child = curList.find(node => node.text === curText)
            if (!child) {
                child = {
                    text: curText,
                    items: []
                }
                curList.push(child)
            }
            curList = child.items
            index++
            if (index < len && menuList[index] === "index.md") {
                child.link = baseRelativePath.replace(/index\.md$/, "")
                // Reflect.deleteProperty(child, "items")
                index++ // 跳过index.md
            }
            if (index < len && menuList[index] === "readme.md") {
                child.link = baseRelativePath.replace(/readme\.md$/, "readme.html")
                // Reflect.deleteProperty(child, "items")
                index++ // 跳过index.md
            }
        }
    }
}, {
    base: "packages",
    include: /\.md$/,
    ignore: /(CHANGELOG)\.md/,
    exculeFolder: ["node_modules", ".git", "dist"]
})

fs.writeFileSync("./aa.json", JSON.stringify(allMenu, null, 2))