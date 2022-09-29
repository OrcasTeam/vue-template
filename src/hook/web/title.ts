import { unref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useTitle } from '@vueuse/core';

export function usePageTitle(): void {
  const { currentRoute } = useRouter();

  const title = useTitle();

  const appTitle = GLOBAL_APP_TITLE;

  watch(() => currentRoute.value.path,
    () => title.value = unref(currentRoute)?.meta?.title || appTitle,
    { immediate: true }
  );
}
