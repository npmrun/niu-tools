import fg from "fast-glob"
import path from "path";
import fs from "fs-extra";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export const rootDir = path.resolve(__dirname, "../..")

/**
    * 获取packages的包
    */
export const allpkgs = await fg(["*"], { cwd: path.resolve(rootDir, "packages"), onlyDirectories: true })


export const enum EEachPackage {
    continue,
    break,
    return,
    pass
}

export async function eachPackage(cb: (opts: { pkgRoot: string, pkgJson: object, pkgName: string }) => Promise<EEachPackage>) {
    const pkgVersions = getPacakgesVersion()
    for (let i = 0; i < allpkgs.length; i++) {
        const pkg = allpkgs[i];
        const packageRoot = path.resolve(rootDir, "packages", pkg)
        const packageRootJSON = path.resolve(rootDir, "packages", pkg, "package.json")
        if (!fs.pathExistsSync(packageRootJSON)) continue
        const mod = (await import(pathToFileURL(packageRootJSON).toString())).default
        mod.scripts = {}
        if (mod.private) continue // e 私有包不处理
        // e 将各个包中的版本替换掉，替换成最新的版本
        for (const key of Object.keys(mod.dependencies || {})) {
            if (key in pkgVersions)
                mod.dependencies[key] = pkgVersions[key]
        }
        const curType = await cb({ pkgJson: mod, pkgRoot: packageRoot, pkgName: pkg })
        if (curType === EEachPackage.continue) continue
        else if (curType === EEachPackage.break) break
        else if (curType === EEachPackage.return) return
    }
}

export async function copyTo(fromFile: string, toFile: string) {
    if (fs.pathExistsSync(fromFile)) {
        await fs.copyFile(fromFile, toFile)
    }
}

export async function getPacakgesVersion() {
    const pkgVersions = {}
    // 检测可用的包，将包的版本历史临时存储
    for (let i = 0; i < allpkgs.length; i++) {
        const pkg = allpkgs[i];
        const packageRootJSON = path.resolve(rootDir, "packages", pkg, "package.json")
        if (!fs.pathExistsSync(packageRootJSON)) continue
        const mod = (await import(pathToFileURL(packageRootJSON).toString())).default
        if (mod.private) continue
        pkgVersions[mod.name] = mod.version
    }
}