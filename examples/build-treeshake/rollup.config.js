import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/main.js',
    preserveSymlinks: true,
    output: {
        file: 'dist/bundle.js',
        format: 'es',
        name: 'app'
    },
    // treeshake: false,
    plugins: [nodeResolve({modulePaths: ['node_modules', '../../packages/core']}), commonjs()]
};