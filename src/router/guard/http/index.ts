import Router from 'vue-router';
import { useHttp } from '@/service';

export function createHttpGuard(router: Readonly<Router>): void {
  router.beforeEach(async (to, from, next) => {
    const http = useHttp();
    http?.canceler?.removeAllPending();
    next();
  });
}
