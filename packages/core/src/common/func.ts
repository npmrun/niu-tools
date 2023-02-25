// http://localhost:8080/#/pages/index/index?a=123
export function parstURL(url: string) {
  let queryIndex = url.indexOf("?") == -1 ? url.length : url.indexOf("?");
  const path = url.slice(0, queryIndex);
  const search = url.slice(queryIndex);
  return {
    path,
    search,
  };
}

export function bytesToSize(bytes: number) {
  if (bytes === 0) {
    return "0 B";
  }
  var k = 1024;
  var sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toPrecision(4) + " " + sizes[i];
}

export function addMethod(
  obj: { [propsKey: string]: Function },
  name: string,
  fnc: Function
) {
  var old = obj[name];
  obj[name] = function () {
    if (arguments.length === fnc.length) {
      return fnc.apply(this, arguments);
    } else if (typeof old === "function") {
      return old.apply(this, arguments);
    }
  };
}

/**
 * 防抖
 */
export function debounce<T extends any[], R = void>(
  fn: (...argu: T) => R,
  duration: number
) {
  let timer: ReturnType<typeof setTimeout> | void;
  return function f(this: void, ...argu: T) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = undefined;
      fn.apply(this, argu);
    }, duration);
  };
}

/**
 * 节流
 */
export function throttle<T extends any[], R = void>(
  fn: (...argu: T) => R,
  interval: number
) {
  let last: number;
  let timer: ReturnType<typeof setInterval> | void;
  return function (this: void, ...argu: T) {
    const now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(last);
      timer = setTimeout(() => {
        last = now;
        fn.apply(this, argu);
      }, interval);
    } else {
      last = now;
      fn.apply(this, argu);
    }
  };
}

export function defer() {
  let resolve, reject;
  return {
    promise: new Promise<void>((_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
    }),
    resolve,
    reject,
  };
}

export function catchAwait(defer: Promise<any>) {
  return defer.then((res) => [null, res]).catch((err) => [err]);
}
