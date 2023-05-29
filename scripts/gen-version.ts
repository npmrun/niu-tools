import fg from "fast-glob"
import fs from "fs-extra"
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { justPublish, publishModules } from "../packages/modules";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, "..")

const allpkgs = await fg(["*"], { cwd: path.resolve(rootDir, "packages"), onlyDirectories: true })

const pkgVersions = {}
for (let i = 0; i < allpkgs.length; i++) {
    const pkg = allpkgs[i];
    const packageRootJSON = path.resolve(rootDir, "packages", pkg, "package.json")
    if (!fs.pathExistsSync(packageRootJSON)) continue
    const mod = (await import(pathToFileURL(packageRootJSON).toString())).default
    if (mod.private) continue
    pkgVersions[mod.name] = mod.version
}
for (let i = 0; i < allpkgs.length; i++) {
    const pkg = allpkgs[i];
    const packageRoot = path.resolve(rootDir, "packages", pkg)
    const packageRootJSON = path.resolve(rootDir, "packages", pkg, "package.json")
    if (!fs.pathExistsSync(packageRootJSON)) continue
    if (justPublish.includes(pkg)) continue
    const mod = (await import(pathToFileURL(packageRootJSON).toString())).default
    if (mod.private) continue
    for (const key of Object.keys(mod.dependencies || {})) {
        if (key in pkgVersions)
            mod.dependencies[key] = pkgVersions[key]
    }
    const packageDist = path.resolve(packageRoot, 'dist')
    fs.ensureDirSync(packageDist)
    if (fs.pathExistsSync(path.join(packageRoot, 'CHANGELOG.md'))) {
        await fs.copyFile(path.join(packageRoot, 'CHANGELOG.md'), path.join(packageDist, 'CHANGELOG.md'))
    }
    if (fs.pathExistsSync(path.join(packageRoot, 'readme.md'))) {
        await fs.copyFile(path.join(packageRoot, 'readme.md'), path.join(packageDist, 'readme.md'))
    }
    mod.scripts = {}
    await fs.writeJSON(path.join(packageDist, 'package.json'), mod, { spaces: 4 })
}