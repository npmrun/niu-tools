/**
 * 将一个数字保留指定位数的小数
 */
export function toFixed(number: any, m: any) {
    if (typeof number !== 'number') {
        throw new Error('number不是数字')
    }
    let result: any = Math.round(Math.pow(10, m) * number) / Math.pow(10, m)
    result = String(result)
    if (result.indexOf('.') == -1) {
        if (m != 0) {
            result += '.'
            result += new Array(m + 1).join('0')
        }
    } else {
        let arr = result.split('.')
        if (arr[1].length < m) {
            arr[1] += new Array(m - arr[1].length + 1).join('0')
        }
        result = arr.join('.')
    }
    return result
}

/**
 * 两个数的精确相加
 */
export function accAdd(arg1: any, arg2: any) {
    var r1
    var r2
    var m
    var c

    try {
        r1 = arg1.toString().split('.')[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split('.')[1].length
    } catch (e) {
        r2 = 0
    }
    c = Math.abs(r1 - r2)
    m = Math.pow(10, Math.max(r1, r2))
    if (c > 0) {
        var cm = Math.pow(10, c)
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace('.', ''))
            arg2 = Number(arg2.toString().replace('.', '')) * cm
        } else {
            arg1 = Number(arg1.toString().replace('.', '')) * cm
            arg2 = Number(arg2.toString().replace('.', ''))
        }
    } else {
        arg1 = Number(arg1.toString().replace('.', ''))
        arg2 = Number(arg2.toString().replace('.', ''))
    }
    return (arg1 + arg2) / m
}
