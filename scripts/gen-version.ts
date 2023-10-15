import fg from "fast-glob"
import fs from "fs-extra"
import path from "path";
import { justPublish } from "../packages/modules";
import { copyTo, eachPackage, EEachPackage } from "./utils";

eachPackage(async (opts: { pkgRoot: string, pkgJson: object, pkgName: string }) => {
    if (justPublish.includes(opts.pkgName)) return EEachPackage.continue  // e 只发布的不需要经过处理
    const packageRoot = opts.pkgRoot
    // e 生成dist发布包
    const packageDist = path.resolve(packageRoot, 'dist')
    fs.ensureDirSync(packageDist)

    await copyTo(path.join(packageRoot, 'CHANGELOG.md'), path.join(packageDist, 'CHANGELOG.md'))
    await copyTo(path.join(packageRoot, 'readme.md'), path.join(packageDist, 'readme.md'))

    await fs.writeJSON(path.join(packageDist, 'package.json'), opts.pkgJson, { spaces: 4 })
    return EEachPackage.pass
})