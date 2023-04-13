import fg from "fast-glob"
import path from "path";
import fs from "fs-extra";
import util from "util";
import { fileURLToPath, pathToFileURL } from "url";
import { execSync, exec } from 'node:child_process'
import jsonPublish from "./jsonPublish";
const execPromise = util.promisify(exec);

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, "..")

const allpkgs = await fg(["*"], { cwd: path.resolve(rootDir, "packages"), onlyDirectories: true })

// 自行构建
// execSync('npm run build', { stdio: 'inherit' })

let command = 'npm publish --access public'

for (let i = 0; i < allpkgs.length; i++) {
    const pkg = allpkgs[i];
    const packageRootJSON = path.resolve(rootDir, "packages", pkg, "package.json")
    if (!fs.pathExistsSync(packageRootJSON)) continue
    const mod = (await import(pathToFileURL(packageRootJSON).toString())).default
    if (mod.private) continue
    const curRemoteVersionPath = path.resolve(rootDir, "packages", pkg, "version")
    if (fs.pathExistsSync(curRemoteVersionPath)) {
        const curRemoteVersion = fs.readFileSync(curRemoteVersionPath, "utf-8")
        if (`${curRemoteVersion}` === `${mod.version}`) {
            console.log(`${mod.name}版本与线上一致`)
            fs.writeFileSync("./a.txt", mod.version, "utf-8")
            continue
        }
    }
    if (jsonPublish.includes(pkg)) {
        try {
            execSync(command, { stdio: 'inherit', cwd: path.resolve(rootDir, "packages", pkg) })
            console.log(`Published ${mod.name}`)
        } catch (error) {
            console.error(error);
        }
    } else {
        try {
            execSync(command, { stdio: 'inherit', cwd: path.resolve(rootDir, "packages", pkg, 'dist') })
            console.log(`Published ${mod.name}`)
            fs.writeFileSync(curRemoteVersionPath, mod.version, "utf-8")
        } catch (error) {
            console.error(error);
        }
    }
}
