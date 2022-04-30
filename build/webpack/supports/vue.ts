import type { WebpackPluginInstance } from 'webpack';
import { VueLoaderPlugin } from 'vue-loader';
import { resolve } from '../../util/path';
import type { SupportFn } from '../../type/webpack';

export const vueSupport: SupportFn = () => {
  return {
    module: {
      rules: [
        {
          test: /\.vue$/,
          include: resolve('src'),
          use: ['thread-loader', 'vue-loader']
        }
      ]
    },
    plugins: [new VueLoaderPlugin() as WebpackPluginInstance],

    resolve: { extensions: ['.vue'] }
  };
};
