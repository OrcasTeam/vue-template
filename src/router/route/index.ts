import { flatMap, isArray } from 'lodash-es';
import { RouteRecordRaw } from 'vue-router';
import { moduleFilter } from '@/util/helper';
import { HomeRouteName } from './modules/home/const';
import { ErrorRouteName } from './modules/home/error/const';

/**
 * 遍历moduleRoutes
 * @returns
 */
const findModuleRoutes = (): Array<RouteRecordRaw> => {
  const modules = moduleFilter<Array<RouteRecordRaw> | RouteRecordRaw>(
    require.context('./modules/', true, /\.(ts|js)$/),
    // 只需要第一层目录下面的index文件作为router
    /^\.\/(\w+)\/index\.(ts|js)$/
  );

  return flatMap(
    Object.keys(modules).map((key) => {
      const module: Array<RouteRecordRaw> | RouteRecordRaw = modules[key] as Array<RouteRecordRaw> | RouteRecordRaw;
      return isArray(module) ? module : [module];
    })
  );
};

const moduleRoutes = findModuleRoutes();

export const routes: Array<RouteRecordRaw> = [
  ...moduleRoutes,
  {
    path: '/',
    redirect: HomeRouteName.DEFAULT_ROUTER
  },
  {
    path: '/:catchAll(.*)',
    redirect: {
      name: ErrorRouteName.NOT_FOUND_ROUTER
    }
  }
];

export default routes;
