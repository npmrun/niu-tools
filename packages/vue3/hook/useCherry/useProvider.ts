import { provide } from "vue";
import { FunctionalStore } from "./type";


//对原生provide进行封装

//由于inject函数只会从父组件开始查找，所以useProvider默认返回hook函数的调用结果，以防同组件层级需要使用
export function useProvider<T extends object>(func: FunctionalStore<T>): T {
  !func.token && (func.token = Symbol('functional store'));
  const depends = func();
  provide(func.token, depends);
  return depends;
}


