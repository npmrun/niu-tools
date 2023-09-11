import { deleteAsync } from 'del'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import fs from "fs-extra"
import { justPublish } from "../packages/modules";
import { execa, execaSync } from 'execa';

const argv = process.argv.slice(2)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, "..");

(async () => {
    if (argv.length && argv[0]) {
        const dirName = argv[0];
        await deleteAsync([
            `packages/${dirName}/dist`
        ])

        const packageRoot = path.resolve(rootDir, "packages", dirName)
        const packageRootJSON = path.resolve(rootDir, "packages", dirName, "package.json")
        if (!fs.pathExistsSync(packageRootJSON)) return
        const mod = (await import(pathToFileURL(packageRootJSON).toString())).default
        if (mod.private) return
        if (justPublish.includes(dirName)) return

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
        
        execaSync('pnpm', ['--filter', `${argv[0]}`, 'build'], {
            stdio: 'inherit',
            cwd: path.resolve(__dirname, `../packages/${dirName}`)
        })
        
        execaSync('pnpm', ['--filter', `${argv[0]}`, 'publish'], {
            stdio: 'inherit',
            cwd: path.resolve(__dirname, `../packages/${dirName}`)
        })
    }
})()
