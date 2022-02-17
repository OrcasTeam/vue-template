declare module 'vue' {
  export interface GlobalComponents {
    'config-provider': typeof import('./modules/config-provider/index.vue')['default'];
    'tsx-demo': typeof import('./modules/base/tsx-demo/index')['default'];
    'vue-demo': typeof import('./modules/base/vue-demo/index.vue')['default'];
  }
}
export {};
