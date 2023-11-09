export * from './object'
export * from './tree'
export * from "./debounce"
export * from "./throttle"

export const extend = Object.assign

export const remove = <T>(arr: T[], el: T) => {
    const i = arr.indexOf(el)
    if (i > -1) {
        arr.splice(i, 1)
    }
}

/**
 * 返回一个布尔值，表示对象自有属性（而不是继承来的属性）中是否具有指定的属性。
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
/**
 * 返回一个布尔值，表示对象自有属性（而不是继承来的属性）中是否具有指定的属性。
 */
export const hasOwn = (
    val: object,
    key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key)

export const isArray = Array.isArray
export const isMap = (val: unknown): val is Map<any, any> =>
    toTypeString(val) === '[object Map]'
export const isSet = (val: unknown): val is Set<any> =>
    toTypeString(val) === '[object Set]'

export const isDate = (val: unknown): val is Date =>
    toTypeString(val) === '[object Date]'
export const isRegExp = (val: unknown): val is RegExp =>
    toTypeString(val) === '[object RegExp]'
export const isFunction = (val: unknown): val is Function =>
    typeof val === 'function'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export const isObject = (val: unknown): val is Record<any, any> =>
    val !== null && typeof val === 'object'

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export const objectToString = Object.prototype.toString
export const toTypeString = (value: unknown): string =>
    objectToString.call(value)

export const toRawType = (value: unknown): string => {
    // extract "RawType" from strings like "[object RawType]"
    return toTypeString(value).slice(8, -1)
}

export const isPlainObject = (val: unknown): val is object =>
    toTypeString(val) === '[object Object]'

export const isIntegerKey = (key: unknown) =>
    isString(key) &&
    key !== 'NaN' &&
    key[0] !== '-' &&
    '' + parseInt(key, 10) === key

// http://localhost:8080/#/pages/index/index?a=123
export function parstURL(url: string) {
    let queryIndex = url.indexOf('?') == -1 ? url.length : url.indexOf('?')
    const path = url.slice(0, queryIndex)
    const search = url.slice(queryIndex)
    return {
        path,
        search,
    }
}

export function bytesToSize(bytes: number) {
    if (bytes === 0) {
        return '0 B'
    }
    var k = 1024
    var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    var i = Math.floor(Math.log(bytes) / Math.log(k))
    return (bytes / Math.pow(k, i)).toPrecision(4) + ' ' + sizes[i]
}

export function addMethod(
    obj: { [propsKey: string]: Function },
    name: string,
    fnc: Function
) {
    var old = obj[name]
    obj[name] = function () {
        if (arguments.length === fnc.length) {
            return fnc.apply(this, arguments)
        } else if (typeof old === 'function') {
            return old.apply(this, arguments)
        }
    }
}

/***
const {promise,resolve,reject} = defer()

;(async ()=>{
  console.log(11111)
  const data = await promise // 等resolve之后才会执行后面的代码
  console.log(data)
})()

setTimeout(()=>{
  resolve(123) 
},2000)
 */
export function defer() {
    let resolve, reject
    return {
        promise: new Promise<void>((_resolve, _reject) => {
            resolve = _resolve
            reject = _reject
        }),
        resolve,
        reject,
    }
}

export function catchAwait(defer: Promise<any>) {
    return defer.then((res) => [null, res]).catch((err) => [err])
}
