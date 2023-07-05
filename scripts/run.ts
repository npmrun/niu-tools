import { execa } from 'execa'
import { fileURLToPath } from 'node:url'
import path from 'path'

const argv = process.argv.slice(2)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, "..")

if (argv.length && argv[0]) {
    execa('pnpm', ['--filter', `${argv[0]}`, 'dev'], {
        stdio: 'inherit',
        cwd: path.resolve(__dirname, `../packages/${argv[0]}`)
    })
}
