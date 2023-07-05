import { isFunction, isObject, isString } from "@niu-tools/core"
import { whichPlatform } from "../util"

if (whichPlatform() === "h5") {
    function fileDownLoad(data: any) {
        var linkElement = document.createElement('a')
        linkElement.setAttribute('href', data.blob)
        linkElement.setAttribute('downLoad', data.name)
        linkElement.click()
    }
    // https://uniapp.dcloud.net.cn/api/media/image.html#saveimagetophotosalbum
    // 此api尚未兼容h5,故处理以下
    uni.saveImageToPhotosAlbum = uni.saveVideoToPhotosAlbum = function (options: any) {
        let emptyFun = function () { }
        let config: any = {
            filePath: null,
            success: emptyFun,
            fail: emptyFun,
            complete: emptyFun
        }
        if (options && isObject(options)) {
            config = Object.assign({}, config, options)
        }
        if (options && isString(options)) {
            config = Object.assign({}, config, {
                filePath: options
            })
        }
        let filePath = config.filePath
        let success = config.success || emptyFun
        let fail = config.fail || emptyFun
        let complete = config.complete || emptyFun
        if (!filePath) {
            fail && isFunction(fail) && fail({
                msg: 'no File'
            })
            complete && isFunction(complete) && complete()
            return
        }
        let names = filePath.split('/')
        let name = names[names.length - 1]
        uni.downloadFile({
            url: filePath,
            success: function (res) {
                let tempFilePath = res.tempFilePath
                fileDownLoad({
                    name: name,
                    blob: tempFilePath
                })
                success && isFunction(success) && success({
                    filePath: filePath
                })
            },
            fail: function (err) {
                fail && isFunction(fail) && fail({
                    msg: err
                })
            },
            complete: function () {
                complete && isFunction(complete) && complete()
            }
        })
    }
}
