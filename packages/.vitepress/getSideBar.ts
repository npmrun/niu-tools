import startCase from 'lodash-es/startCase';
import sortBy from 'lodash-es/sortBy';
import remove from 'lodash-es/remove';
import path, { sep } from 'path';
import glob from 'fast-glob';
import fs from 'fs-extra';
import grayMatter from "gray-matter";

type Sidebar = SidebarGroup[] | SidebarMulti;

interface SidebarMulti {
    [path: string]: SidebarGroup[]
}

interface SidebarGroup {
    text: string
    items: SidebarItem[]
    collapsible?: boolean
    collapsed?: boolean
}

interface SidebarItem {
    text: string
    link: string
}

interface Options {
    startsDirs?: Array<string>, // Directoty path to ignore from being captured.
    ignoreDirectory?: Array<string>, // Directoty path to ignore from being captured.
    ignoreMDFiles?: Array<string>, // File path to ignore from being captured.
}

// handle md file name
const getName = (path: string) => {
    let name = path.split(sep).pop() || path;
    const argsIndex = name.lastIndexOf('--');
    if (argsIndex > -1) {
        name = name.substring(0, argsIndex);
    }

    // "001.guide" or "001-guide" or "001_guide" or "001 guide" -> "guide"
    name = name.replace(/^\d+[.\-_ ]?/, '');

    return startCase(name);
};

// handle dir name
const getDirName = (path: string) => {
    let name = path.split(sep).shift() || path;
    name = name.replace(/^\d+[.\-_ ]?/, '');

    return startCase(name);
};

// Load all MD files in a specified directory
const getChildren = function (parentPath: string, ignoreMDFiles: Array<string> = []) {
    const pattern = '/**/*.md';
    const files = glob.sync(parentPath + pattern, {ignore: ["**/node_modules/**", "**/dist/**"]}).map((path) => {
        let end = -3
        const newPath = path.slice(parentPath.length + 1, end);
        if (ignoreMDFiles?.length && ignoreMDFiles.findIndex(item => newPath.endsWith(item)) !== -1) {
            return undefined;
        }
        return { path: newPath };
    });

    remove(files, file => file === undefined);
    // Return the ordered list of files, sort by 'path'
    return sortBy(files, ['path']).map(file => file?.path || '');
};

// Return sidebar config for given baseDir.
function side(baseDir: string, options?: Options) {
    const mdFiles = getChildren(baseDir, options?.ignoreMDFiles);
    const sidebars: Sidebar = [];
    const dirs = options?.startsDirs ?? []

    mdFiles.forEach((item) => {
        if (options?.ignoreDirectory?.length
            && options?.ignoreDirectory.findIndex(one => item.includes(one)) !== -1) {
            return;
        }
        let index = dirs.findIndex(text => item.startsWith(text))
        if (index != -1) {
            let curDir = dirs[index]
            const filePath = path.resolve(baseDir, item)
            let p = filePath + ".md"
            const {
                data: { title, first, name },
            } = grayMatter(fs.readFileSync(p, "utf8"));
            const [pkg, _name, i] = item.split('/').slice(-3)
            
            let _title = title ?? _name
            
            // @ts-ignore
            const sidebarItemIndex = sidebars.findIndex(sidebar => sidebar._realtext === curDir);

            if (sidebarItemIndex !== -1) {
                if (first!=undefined) {
                    sidebars[sidebarItemIndex].items.splice(first,0,{
                        text: _title,
                        link: '/' + item.replace('index', ''),
                    })
                    if (name) {
                        sidebars[sidebarItemIndex].text = name
                    } 
                }else{
                    sidebars[sidebarItemIndex].items.push({
                        text: _title,
                        link: '/' + item.replace('index', ''),
                    });
                }
                sidebars[sidebarItemIndex].items.sort((a,b)=>{
                    // @ts-ignore
                    return a._sort - b._sort
                })
            } else {
                sidebars.push({
                    text: name || curDir,
                    // @ts-ignore
                    _sort: index,
                    // @ts-ignore
                    _realtext: curDir,
                    items: [{
                        text: _title,
                        link: '/' + item.replace('index', ''),
                    }],
                });
            }
        }
    })
    
    sidebars.sort((a,b)=>{
        // @ts-ignore
        return a._sort - b._sort
    })

    // const sidebars: Sidebar = [];
    // // strip number of folder's name
    // mdFiles.forEach((item) => {
    //     const dirName = getDirName(item);
    //     if (options?.ignoreDirectory?.length
    //         && options?.ignoreDirectory.findIndex(one => item.includes(one)) !== -1) {
    //         return;
    //     }
    //     const mdFileName = getName(item);

    //     const filePath = path.resolve(baseDir, item)
    //     const {
    //         data: { title },
    //         content,
    //     } = grayMatter(fs.readFileSync(filePath+".md", "utf8"));
    //     console.log(item);

    //     const sidebarItemIndex = sidebars.findIndex(sidebar => sidebar.text === mdFileName);

    //     if (sidebarItemIndex !== -1) {
    //         sidebars[sidebarItemIndex].items.push({
    //             text: title ?? mdFileName,
    //             link: '/'+item,
    //         });
    //     } else {
    //         sidebars.push({
    //             text: dirName,
    //             items: [{
    //                 text: title ?? mdFileName,
    //                 link: '/'+item,
    //             }],
    //         });
    //     }
    // });

    // console.info('sidebar is create:', JSON.stringify(sidebars));
    return sidebars;
}

/**
 * Returns `sidebar` configuration for VitePress calculated using structure of directory and files in given path.
 * @param   {String}    rootDir   - Directory to get configuration for.
 * @param   {Options}    options   - Option to create configuration.
 */
export const getSideBar = (rootDir = './', options?: Options) => side(rootDir, options);
