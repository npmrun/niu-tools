// https://github.com/vueuse/vueuse/blob/main/packages/.vitepress/plugins/markdownTransform.ts

import path from "path";
import fs from "fs-extra";
import fg from "fast-glob";

export function MarkdownTransform(): any {
    return {
        name: 'niu-tools-md-transform',
        enforce: 'pre',
        async transform(code, id) {
            if (!id.match(/\.md\b/))
                return null
            const [pkg, _name, i] = id.split('/').slice(-3)
            const oneDir = path.parse(id).dir
            const oneName = oneDir.split("/").slice(-1)
            const allFiles = fg.sync('**/*.ts', { cwd: oneDir})
            if(_name!=="packages" && i === "index.md") {
                let source = ''
                for (let i = 0; i < allFiles.length; i++) {
                    const file = allFiles[i];
                    const p = path.resolve(oneDir, file)
                    if(fs.pathExistsSync(p)){
                        source += `::: details ${oneName}/${file} \n\`\`\`ts \n ${fs.readFileSync(p, "utf8")} \n\`\`\` \n:::\n` 
                    }
                }
                code += `\n ## 源码 \n :::: details 查看源码 \n ${source} \n :::: \n`
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
