import { deleteSync } from 'del'
import path from 'node:path'
import fs from "fs-extra"
import { justPublish } from "../packages/modules";
import { execa } from 'execa';
import { EEachPackage, copyTo, eachPackage } from './utils';

const argv = process.argv.slice(2)

if (argv.length && argv[0]) {

    const dirName = argv[0];
    deleteSync([
        `packages/${dirName}/dist`
    ])

    eachPackage(async (opts: { pkgRoot: string, pkgJson: any, pkgName: string }) => {
        if (opts.pkgName !== argv[0]) {
            return EEachPackage.pass
        }
        const packageRoot = opts.pkgRoot
        const pkg = opts.pkgName
        const mod = opts.pkgJson
        if (justPublish.includes(dirName)) return EEachPackage.pass
        const packageDist = path.resolve(packageRoot, 'dist')
        fs.ensureDirSync(packageDist)

        await copyTo(path.join(packageRoot, 'CHANGELOG.md'), path.join(packageDist, 'CHANGELOG.md'))
        await copyTo(path.join(packageRoot, 'readme.md'), path.join(packageDist, 'readme.md'))
        await fs.writeJSON(path.join(packageDist, 'package.json'), mod, { spaces: 4 })

        await execa('pnpm', ['--filter', `${pkg}`, 'build'], {
            stdio: 'inherit',
            cwd: packageRoot
        })

        await execa('pnpm', ['publish', '--no-git-checks', '--access', 'public'], {
            stdio: 'inherit',
            cwd: path.resolve(packageRoot, 'dist')
        })

        return EEachPackage.pass
    });
}
