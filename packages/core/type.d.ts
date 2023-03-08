export type IKey = string | symbol | number

export interface IObject<T> {
  [key: IKey]: T | IObject<any>
}
