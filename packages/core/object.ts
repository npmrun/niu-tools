export function createObject(source: object) {
  function F() {}
  F.prototype = source;
  return new (F as any)();
}

export function inherit(source: Function, target = function () {}) {
  target.prototype = createObject(source.prototype);
  target.prototype.super = source;
  target.prototype.constructor = target;
  return target;
}

export function myNew(func: Function, ...argus: any[]) {
  var obj = {};
  // @ts-ignore
  obj.__proto__ = func.prototype;
  let res = func.apply(obj, argus);
  if (res !== undefined) {
    return res;
  }
  return obj;
}
