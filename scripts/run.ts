import { execa } from 'execa'
import path from 'path'

const argv = process.argv.slice(2)

if (argv.length && argv[0]) {
    execa('pnpm', ['--filter', `${argv[0]}`, 'dev'], {
        stdio: 'inherit',
        cwd: path.resolve(__dirname, `../packages/${argv[0]}`)
    })
}
