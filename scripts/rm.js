import { deleteAsync } from 'del'

const deletedFilePaths = await deleteAsync([
    'packages/**/dist/*',
    '!packages/**/dist/node_modules',
    '!packages/**/dist/readme.md',
    '!packages/**/dist/CHANGELOG.md',
    '!packages/**/dist/package.json',
])

console.log("delete success");
