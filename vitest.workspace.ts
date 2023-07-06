import fs from 'fs-extra'
import path from 'path'
import { defineWorkspace } from 'vitest/config'
import { modules } from './packages/modules'

// let result = modules.filter((v) => {
//     return fs.pathExistsSync(path.resolve(`packages/${v}/vitest.config.ts`))
// })

export default defineWorkspace([
    // ...result.map((v) => `packages/${v}`),
    "packages/*/vitest.config.{e2e,unit}.ts"
])
