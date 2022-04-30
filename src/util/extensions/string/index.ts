import { isEmpty } from 'lodash-es';

/***
 * TODO: 命名问题
 * @param value
 * @param sym
 */
export const toCamelCase = (value: string, sym = '-'): string => {
  if (isEmpty(value))
    throw new Error('value is null');
  return value.replace(/([A-Z])/g, (a, b, index) => (index > 0 ? sym : '') + b.toLowerCase());
};
