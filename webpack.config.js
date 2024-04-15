const path = require('path');
const { NormalModuleReplacementPlugin } = require('webpack');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      library: {
        type: 'module',
      },
      globalObject: 'this',
    },
    externals: {
      '@bpmn.io/form-js': {
        commonjs: '@bpmn.io/form-js',
        commonjs2: '@bpmn.io/form-js',
        amd: '@bpmn.io/form-js',
        root: 'FormJS'
      }
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: 'raw-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
        }
      ]
    },
    plugins: [
      new NormalModuleReplacementPlugin(
        /^(..\/preact|preact)(\/[^/]+)?$/,
        function(resource) {
          const replMap = {
            'preact/hooks': path.resolve('node_modules/preact/hooks/dist/hooks.module.js'),
            'preact/jsx-runtime': path.resolve('node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js'),
            'preact': path.resolve('node_modules/preact/dist/preact.module.js'),
            '../preact/hooks': path.resolve('node_modules/preact/hooks/dist/hooks.module.js'),
            '../preact/jsx-runtime': path.resolve('node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js'),
            '../preact': path.resolve('node_modules/preact/dist/preact.module.js')
          };
  
          const replacement = replMap[resource.request];
  
          if (replacement) {
            resource.request = replacement;
          }
        }
      )
    ],
    experiments: {
      outputModule: true,
    }
};