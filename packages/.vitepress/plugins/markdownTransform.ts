// https://github.com/vueuse/vueuse/blob/main/packages/.vitepress/plugins/markdownTransform.ts

export function MarkdownTransform(): any {
    return {
        name: 'niu-tools-md-transform',
        enforce: 'pre',
        async transform(code, id) {
            if (!id.match(/\.md\b/))
                return null
            // const [pkg, _name, i] = id.split('/').slice(-3)
            // console.log(pkg, _name, i);
            // if (!i.startsWith("index.md")) {
                // const frontmatterEnds = code.indexOf('---\n\n')
                // const firstHeader = code.search(/\n#{2,6}\s.+/)
                // const sliceIndex = firstHeader < 0 ? frontmatterEnds < 0 ? 0 : frontmatterEnds + 4 : firstHeader

                // code = code.slice(0, sliceIndex) + "\n# " + _name + "\n" + code.slice(sliceIndex)
                // console.log(code, frontmatterEnds);
                
                // code = code
                //     .replace(/(# \w+?)\n/, `$1\n\n<div>aaa</div>\n`)
                //     .replace(/## (Components?(?:\sUsage)?)/i, '## $1\n<LearnMoreComponents />\n\n')
                //     .replace(/## (Directives?(?:\sUsage)?)/i, '## $1\n<LearnMoreDirectives />\n\n')
                // code += `\n# 哈哈`
            // }
            return code
        },
    }
}
