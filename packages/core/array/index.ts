import { isArray } from '../utils'

//random===== Start
function random(arr: any[]) {
    return arr.sort(() => Math.random() - 0.5)
}
//random===== End

//uniq===== Start
function uniq(arr: any[]) {
    return Array.from(new Set(arr))
}
//uniq===== End

//demote===== Start
function demote(arr: any[], result: any[] = []) {
    arr.forEach((i) => (isArray(i) ? demote(i, result) : result.push(i)))
    return result
}
//demote===== End

export { random, uniq, demote }
