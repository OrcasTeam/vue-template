import { RouteConfig } from 'vue-router';
import { flatMap, isArray } from 'lodash-es';
import { moduleFilter } from '@/util/helper';

/**
 * 遍历moduleRoutes
 * @returns
 */
const findModuleRoutes = (): Array<RouteConfig> => {
  const modules = moduleFilter<Array<RouteConfig> | RouteConfig>(
    require.context('./modules/', true, /\.(ts|js)$/),
    // 只需要第一层目录下面的index文件作为router
    /^\.\/(\w+)\/index\.(ts|js)$/
  );

  return flatMap(
    Object.keys(modules).map((key) => {
      const module: Array<RouteConfig> | RouteConfig = modules[key] as
        | Array<RouteConfig>
        | RouteConfig;
      return isArray(module) ? module : [module];
    })
  );
};

const moduleRoutes = findModuleRoutes();

export const routes: Array<RouteConfig> = [
  ...moduleRoutes,
  {
    path: '/',
    redirect: '/home'
  }
];

export default routes;