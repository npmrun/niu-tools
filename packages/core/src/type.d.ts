export type IKey = string | symbol | number

// 对象类型
export interface IObject<T> {
  [key: IKey]: T | IObject<any>
}