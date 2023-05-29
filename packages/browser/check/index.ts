import { isClient } from "@niu-tools/shared/browser";

export const UA = isClient && navigator.userAgent.toLowerCase();

/** 是不是企业微信 */
export const isWeCom: boolean = isClient && Boolean(UA) && (UA as string).indexOf('wxwork') > 0

/** 是不是支付宝 */
export const isAlipay: boolean = isClient && Boolean(UA) && (UA as string).indexOf('alipay') > 0

/** 是不是钉钉 */
export const isDingTalk: boolean = isClient && Boolean(UA) && (UA as string).indexOf('dingtalk') > 0

/**
 * 是否是微信浏览器
 */
export function isWeChat() {
    var ua = isClient && navigator.userAgent.toLowerCase()
    if (ua && ua.match(/MicroMessenger/i)?.toString() == 'micromessenger') {
        return true
    } else {
        return false
    }
}

export function isMobile() {
    if(!isClient){
        return false
    }
    let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    return flag;
}

export function isWxMp() {
    return new Promise<number>((resolve, reject) => {
        if (isWeChat()) {
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

export function isHtml5Plus() {
    if (typeof plus === 'object') {
        return true
    } else {
        return false
    }
}
