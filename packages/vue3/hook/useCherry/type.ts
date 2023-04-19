//定义一个用于状态共享的hook函数的标准接口
export interface FunctionalStore<T extends object> {
    (...args: any[]): T;
    token?: symbol;
    root?: T;
  }
  