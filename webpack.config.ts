import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration } from 'webpack';
import { merge as webpackMerge } from 'webpack-merge';
import packageJson from './package.json';
import { loadEnv } from './build/config';
import { support } from './build/webpack/support';
import { createDevServer } from './build/webpack/dev';
import { chunkFilename } from './build/webpack/output';
import { configPath, resolve, wrapperEnv } from './build/utils';

export default async (option: { WEBPACK_BUNDLE: boolean; WEBPACK_BUILD: boolean; WEBPACK_SERVE: boolean; development: boolean }): Promise<Configuration> => {
  //  环境判断
  const isBuild = option.WEBPACK_BUILD;

  const mode = isBuild ? 'production' : 'development';

  // 设置版本号
  process.env.GLOBAL_VERSION = packageJson.version;

  // 根据webpack命令设置NODE环境变量
  process.env.NODE_ENV = mode;

  const env = loadEnv(mode, configPath);

  const webpackEnv = wrapperEnv(env);

  webpackEnv.WEBPACK_VERSION = process.env.GLOBAL_VERSION || '';

  const baseConf: Configuration = {
    target: 'web',

    mode: mode,

    cache: typeof webpackEnv.WEBPACK_CATCH === 'boolean' ? webpackEnv.WEBPACK_CATCH : { type: webpackEnv.WEBPACK_CATCH },

    devtool: webpackEnv.WEBPACK_DEVTOOL,

    entry: resolve('src/main.ts'),

    output: {
      path: path.isAbsolute(webpackEnv.WEBPACK_OUTPUT_DIR) ? webpackEnv.WEBPACK_OUTPUT_DIR : resolve(webpackEnv.WEBPACK_OUTPUT_DIR),
      filename: isBuild ? 'js/name_[contenthash].js' : 'js/[name].js',
      chunkFilename: chunkFilename,
      clean: true
    },

    devServer: (!isBuild && (await createDevServer(webpackEnv))) || {},

    optimization: {
      minimize: isBuild,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: webpackEnv.WEBPACK_DROP_CONSOLE
            }
          }
        })
      ]
    },

    resolve: {
      mainFiles: ['index', 'module', 'jsnext:main', 'jsnext'],
      alias: {
        '@': resolve('src')
      }
    }
  };

  return webpackMerge(baseConf, support(isBuild, webpackEnv));
};
