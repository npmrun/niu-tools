import { isArray } from "./index";

function random(arr: any[]) {
  return arr.sort(() => Math.random() - 0.5);
}

function uniq(arr: any[]) {
  return Array.from(new Set(arr));
}

function demote(arr: any[], result: any[] = []) {
  arr.forEach((i) => (isArray(i) ? demote(i, result) : result.push(i)));
  return result
}

export { random, uniq, demote };
