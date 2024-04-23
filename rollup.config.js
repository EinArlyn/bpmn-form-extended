import svg from 'rollup-plugin-svg';
import postcss from 'rollup-plugin-postcss';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: './src/index.js',
    output: [
        {
            file: 'dist/index.es.js',
            format: 'esm',
            sourcemap: true,
        },
        {
            sourcemap: true,
            format: 'commonjs',
            file: 'dist/index.cjs',
        },
    ],
    external: [
        '@bpmn.io/form-js',
        'luxon',  // Поскольку luxon появляется в циклических зависимостях
        'flatpickr',  // Если вы не используете flatpickr напрямую
    ],
    plugins: [
        svg(),
        postcss({
            extensions: ['.css'],
            minimize: true,
            extract: 'assets/styles.css',
        }),
        alias({
            entries: [
                { find: 'react', replacement: 'preact/compat' },
                { find: 'react-dom', replacement: 'preact/compat' },
                { find: '../preact', replacement: 'preact' },
                { find: '../preact/hooks', replacement: 'preact/hooks' },
                { find: '../preact/jsx-runtime', replacement: 'preact/jsx-runtime' },
            ]
        }),
        resolve({
            resolveOnly: [
                // '@bpmn.io/form-js',
                '@bpmn-io/properties-panel',
                // 'diagram-js',
            ],
        }),
        babel({
            babelHelpers: 'bundled',
            plugins: [
                [
                  '@babel/plugin-transform-react-jsx',
                  {
                    importSource: 'preact',
                    runtime: 'automatic',
                  },
                ],
            ],
        }),
    ],
};