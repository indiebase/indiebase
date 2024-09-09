const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const workspaceTools = require('workspace-tools');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const swcDefaultConfig =
  require('@nestjs/cli/lib/compiler/defaults/swc-defaults').swcDefaultsFactory()
    .swcOptions;
const rspack = require('@rspack/core');

async function getWorkspacesPackageNameRegExps(cwd) {
  const ws = workspaceTools.getWorkspaces(cwd);
  const packageNames = ws.map((p) => p.name);

  // eslint-disable-next-line security/detect-non-literal-regexp
  return packageNames.map((p) => new RegExp(p));
}

/** @type {()=>import('@rspack/cli').Configuration} */
const config = async () => {
  const cwd = process.cwd();
  const workspacePkgs = await getWorkspacesPackageNameRegExps(cwd);

  return {
    context: __dirname,
    target: 'node',
    entry: {
      main: ['@rspack/core/hot/poll?100', './src/main.ts'],
    },
    resolve: {
      extensions: ['...', '.ts', '.tsx', '.mjs', '.js', '.jsx'],
    },
    module: {
      // hot: true,
      rules: [
        {
          test: /.([jt])sx?$/,
          use: {
            loader: 'builtin:swc-loader',
            options: {
              ...swcDefaultConfig,
              // jsc: {
              //   parser: {
              //     syntax: 'typescript',
              //     decorators: true,
              //   },
              //   transform: {
              //     legacyDecorator: true,
              //     decoratorMetadata: true,
              //   },
              // },
            },
          },
        },
      ],
    },
    optimization: {
      minimize: false,
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: 'tsconfig.json',
        },
      }),
      new RunScriptWebpackPlugin({
        name: 'main.js',
        autoRestart: false,
      }),
      new rspack.HotModuleReplacementPlugin(),
    ],
    // devServer: {
    //   devMiddleware: {
    //     writeToDisk: true,
    //   },
    // },
    externalsPresets: {
      node: true,
    },
    externals: [
      nodeExternals({
        allowlist: ['@rspack/core/hot/poll?100'].concat(workspacePkgs, [
          /^ky/,
          '@octokit/core',
          /^octokit/,
          /^universal-user-agent/,
          /^before-after-hook/,
          /^universal-github-app-jwt/,
        ]),
        modulesDir: path.resolve(cwd, '../node_modules'),
      }),
    ],
  };
};
module.exports = config;
