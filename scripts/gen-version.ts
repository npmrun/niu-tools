import fg from "fast-glob"
import fs from "fs-extra"
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, "..")

const allpkgs = await fg(["*"], { cwd: path.resolve(rootDir, "packages"), onlyDirectories: true })
const pkgVersions = {}
for (let i = 0; i < allpkgs.length; i++) {
    const pkg = allpkgs[i];
    const packageRootJSON = path.resolve(rootDir, "packages", pkg, "package.json")
    const mod = (await import(pathToFileURL(packageRootJSON).toString())).default
    pkgVersions[mod.name] = mod.version
}
for (let i = 0; i < allpkgs.length; i++) {
    const pkg = allpkgs[i];
    const packageRoot = path.resolve(rootDir, "packages", pkg)
    const packageRootJSON = path.resolve(rootDir, "packages", pkg, "package.json")
    const packageDist = path.resolve(packageRoot, 'dist')
    fs.ensureDirSync(packageDist)
    const mod = (await import(pathToFileURL(packageRootJSON).toString())).default
    if (fs.pathExistsSync(path.join(packageRoot, 'CHANGELOG.md'))) {
        await fs.copyFile(path.join(packageRoot, 'CHANGELOG.md'), path.join(packageDist, 'CHANGELOG.md'))
    }
    if (fs.pathExistsSync(path.join(packageRoot, 'readme.md'))) {
        await fs.copyFile(path.join(packageRoot, 'readme.md'), path.join(packageDist, 'readme.md'))
    }
    if (fs.pathExistsSync(packageRootJSON)) {
        for (const key of Object.keys(mod.dependencies || {})) {
            if (key in pkgVersions)
                mod.dependencies[key] = pkgVersions[key]
        }
        await fs.writeJSON(path.join(packageDist, 'package.json'), mod, { spaces: 4 })
    }
}