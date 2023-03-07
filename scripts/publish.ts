import fg from "fast-glob"
import path from "path";
import util from "util";
import { fileURLToPath, pathToFileURL } from "url";
import { execSync, exec } from 'node:child_process'
const execPromise = util.promisify(exec);

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, "..")

const allpkgs = await fg(["*"], { cwd: path.resolve(rootDir, "packages"), onlyDirectories: true })

execSync('npm run build', { stdio: 'inherit' })

let command = 'npm publish --access public'

for (let i = 0; i < allpkgs.length; i++) {
    const pkg = allpkgs[i];
    const packageRootJSON = path.resolve(rootDir, "packages", pkg, "package.json")
    const mod = (await import(pathToFileURL(packageRootJSON).toString())).default
    try {
        execSync(command, { stdio: 'inherit', cwd: path.resolve(rootDir, "packages", pkg, 'dist') })
        console.log(`Published ${mod.name}`)
    } catch (error) {
        console.error(error);
    }
}
