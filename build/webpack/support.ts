import type { Configuration } from 'webpack';
import { merge as webpackMerge } from 'webpack-merge';
import type { Env } from '../type/env';
import type { Mode, SupportFn } from '../type/webpack';
import { uiSupport } from './supports/ui';
import { vueSupport } from './supports/vue';
import { htmlSupport } from './supports/html';
import { styleSupport } from './supports/style';
import { reportSupport } from './supports/report';
import { scriptSupport } from './supports/script';
import { chunksSupport } from './supports/chunks';
import { variableSupport } from './supports/variable';
import { compressionSupport } from './supports/compression';

export function support(mode: Mode, env: Env): Configuration {
  const supports: Array<SupportFn> = [vueSupport, scriptSupport, chunksSupport, styleSupport, uiSupport, variableSupport, htmlSupport, compressionSupport, reportSupport];

  return webpackMerge(supports.map(support => support(mode, env)));
}
