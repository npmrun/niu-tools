import path from "path";
import { execSync, exec } from 'node:child_process'
import { justPublish, publishModules } from "../packages/modules";
import { EEachPackage, allpkgs, eachPackage, rootDir } from "./utils";

// let command = 'npm publish --access public'
let command = 'pnpm publish --no-git-checks --access public'

eachPackage(async (opts: { pkgRoot: string, pkgJson: any, pkgName: string }) => {
    const packageRoot = opts.pkgRoot
    const pkg = opts.pkgName
    const mod = opts.pkgJson
    if (justPublish.includes(pkg)) {
        try {
            execSync(command, { stdio: 'inherit', cwd: packageRoot })
            console.log(`Published ${mod.name}`)
        } catch (error) {
            console.error(error);
        }
    } else {
        try {
            // 因为存在相同的依赖，可能造成重复编译，因此采用turbo，如果重复编译会复用缓存。
            // execSync('turbo run build', { stdio: 'inherit', cwd: packageRoot })
            execSync(command, { stdio: 'inherit', cwd: path.resolve(packageRoot, 'dist') })
            console.log(`Published ${mod.name}`)
        } catch (error) {
            console.error(error);
        }
    }
    return EEachPackage.pass
})
