import fg from "fast-glob"
import path from "path";
import fs from "fs-extra";
import util from "util";
import { fileURLToPath, pathToFileURL } from "url";
import { execSync, exec } from 'node:child_process'
import { justPublish, publishModules } from "../packages/modules";
import { allpkgs, rootDir } from "./utils";

; (async () => {
    // 自行构建
    // execSync('npm run build', { stdio: 'inherit' })

    // let command = 'npm publish --access public'
    let command = 'pnpm publish --no-git-checks --access public'

    for (let i = 0; i < allpkgs.length; i++) {
        const pkg = allpkgs[i];
        const packageRootJSON = path.resolve(rootDir, "packages", pkg, "package.json")
        if (!fs.pathExistsSync(packageRootJSON)) continue
        const mod = (await import(pathToFileURL(packageRootJSON).toString())).default
        if (mod.private) continue
        if (justPublish.includes(pkg)) {
            try {
                execSync(command, { stdio: 'inherit', cwd: path.resolve(rootDir, "packages", pkg) })
                console.log(`Published ${mod.name}`)
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                // 因为存在相同的依赖，可能造成重复编译，因此采用turbo，如果重复编译会复用缓存。
                // execSync('turbo run build', { stdio: 'inherit', cwd: path.resolve(rootDir, "packages", pkg) })
                execSync(command, { stdio: 'inherit', cwd: path.resolve(rootDir, "packages", pkg, 'dist') })
                console.log(`Published ${mod.name}`)
            } catch (error) {
                console.error(error);
            }
        }
    }

})()