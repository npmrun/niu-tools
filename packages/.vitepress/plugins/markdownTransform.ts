// https://github.com/vueuse/vueuse/blob/main/packages/.vitepress/plugins/markdownTransform.ts

import path from "path";
import fs from "fs-extra";
import fg from "fast-glob";
import grayMatter from "gray-matter";

export function MarkdownTransform(): any {
    return {
        name: 'niu-tools-md-transform',
        enforce: 'pre',
        async transform(code, id) {
            if (!id.match(/\.md\b/))
                return null
            const [pkg, _name, i] = id.split('/').slice(-3)
            const oneDir = path.parse(id).dir.endsWith("docs") ? path.parse(path.parse(id).dir).dir : path.parse(id).dir
            const oneName = oneDir.split("/").slice(-1)
            const allFiles = fg.sync('**/*.ts', { cwd: oneDir, ignore: ["**/*.test.ts"] })
            if (_name !== "packages" && i === "index.md") {
                const matter = grayMatter(fs.readFileSync(id, "utf8"));
                const { data, content } = matter

                if (data.category) {
                    code = grayMatter.stringify(`${data.category ? `分类：\`${data.category}\`` : ''}` + content, data)
                }

                let source = ""

                let rawcodeArray = (Array.from(code.matchAll(/<\!--code\:(.*?)\:code-->/g) ?? []) as any).map(([_, name]) => name)



                for (let i = 0; i < allFiles.length; i++) {
                    const file = allFiles[i];
                    const p = path.resolve(oneDir, file)
                    let name = `${oneName}/${file}`
                    let str = ''
                    if (fs.pathExistsSync(p)) {
                        let rawcode = fs.readFileSync(p, "utf8")
                        if (rawcodeArray.length) {
                            for (let i = 0; i < rawcodeArray.length; i++) {
                                const symbol = rawcodeArray[i];
                                let startLen = `//${symbol}===== Start`.length
                                let startIndex = rawcode.indexOf(`//${symbol}===== Start`)
                                let endIndex = rawcode.indexOf(`//${symbol}===== End`)
                                // console.log(`<\!--code\:${symbol}\:code-->`);
                                if (startIndex !== -1 && endIndex !== -1) {
                                    code = code.replace(`<\!--code\:${symbol}\:code-->`, `:::: details ${symbol}源码\n\`\`\`ts` + rawcode.slice(startIndex + startLen, endIndex) + "\`\`\`\n ::::")
                                }
                            }
                        }
                        str = `::: details ${name.replace(/\\/g, "/")}源码 \n\`\`\`ts \n ${rawcode} \n\`\`\` \n:::\n`
                    }
                    code = code.replace('$' + name + '$', str)
                    source += str
                }
                if (source) code += `\n ## 源码 \n :::: details 查看源码 \n ${source} \n :::: \n`
            }
            // if (!i.startsWith("index.md")) {
            //     const frontmatterEnds = code.indexOf('---\n\n')
            //     const firstHeader = code.search(/\n#{2,6}\s.+/)
            //     const sliceIndex = firstHeader < 0 ? frontmatterEnds < 0 ? 0 : frontmatterEnds + 4 : firstHeader

            //     code = code.slice(0, sliceIndex) + "\n# " + _name + "\n" + code.slice(sliceIndex)
            //     console.log(code, frontmatterEnds);

            //     code = code
            //         .replace(/(# \w+?)\n/, `$1\n\n<div>aaa</div>\n`)
            //         .replace(/## (Components?(?:\sUsage)?)/i, '## $1\n<LearnMoreComponents />\n\n')
            //         .replace(/## (Directives?(?:\sUsage)?)/i, '## $1\n<LearnMoreDirectives />\n\n')
            //     code += `\n# 哈哈`
            // }
            return code
        },
    }
}

// [...`fsd
// /**-----start:main-----**/
// sadada
// /**-----end:mai1n-----**/
// sadasdad
// /**-----start:test-----**/
// sadada
// /**-----end:test-----**/
// sadasdad`.matchAll(/\/\*\*-----start:(.*?)-----\*\*\/\n(.*?)\n\/\*\*-----end:(.*?)-----\*\*\//g)]