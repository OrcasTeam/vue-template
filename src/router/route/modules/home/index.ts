import { RouteConfig } from 'vue-router';
import Demo1Router from './demo1';
import { HomeRouterName } from './const';
import Demo2Page from '@/page/home/demo2/index.vue';

const router: RouteConfig = {
  path: '/home',
  name: HomeRouterName.HOME_ROUTER,
  component: () => import(/* webpackChunkName: "home" */ '@/page/home/index.vue'),
  meta: {
    auth: true
  },
  children: [
    {
      path: '',
      redirect: { name: HomeRouterName.HOME_DEMO1_ROUTER }
    },
    Demo1Router,
    {
      path: 'demo2',
      name: HomeRouterName.HOME_DEMO2_ROUTER,
      meta: {
        title: 'demo2'
      },
      component: Demo2Page
    }
  ]
};

export default router;