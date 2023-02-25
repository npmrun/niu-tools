/**
 * 用于检测包的安装
 * @param name 包名
 * @returns node_modules是否安装了该包
 */
export function module_exist(name: string): boolean {
  try {
    require.resolve(name);
  } catch (err: any) {
    console.log("err ", err.code);
    if (err.code === "MODULE_NOT_FOUND") {
      return false;
    }
  }
  return true;
}
