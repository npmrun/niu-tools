/**
 * 是否是微信浏览器
 */
export function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase()
    // @ts-ignore
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
    } else {
        return false
    }
}

/**
 * 是否是小程序
 */
export function isWxMp() {
    return new Promise<number>((resolve, reject) => {
        if (isWeiXin()) {
            wx.miniProgram.getEnv((res: any) => {
                if (res.miniprogram) {
                    resolve(0)
                } else {
                    reject(1)
                }
            })
        } else {
            reject(2)
        }
    })
}

/**
 * 是否在plus环境中
 */
export function isHtml5Plus() {
    if (typeof plus === 'object') {
        return true
    } else {
        return false
    }
}