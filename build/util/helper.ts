import portfinder from 'portfinder';

/**
 * 获取可用端口
 * @returns
 * @param startPort
 */
export function findPort(startPort: number): Promise<number> {
  return portfinder.getPortPromise({ startPort, port: startPort });
}