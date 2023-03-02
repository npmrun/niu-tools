import { whichPlatform } from "@/util"
import { showLoading, hideLoading } from "@/loading"
import { parstURL } from "@niu-tools/core/common/func"

/**
 * 通过下载线上文档，然后在本地打开，支持app和微信小程序
 * @param src : 线上文档链接;
 */
export function showDoc(src: string, filename?: string, fileType?: string) {
    showLoading("正在加载文档", true)
    const downloadTask = uni.downloadFile({
        url: src,
        success: function (res) {
            const tempFilePath = res.tempFilePath
            let ext = ""
            if (filename) {
                ext = filename.split(".").slice(-1)[0]
            } else {
                ext = parstURL(src).path.split(".").slice(-1)[0]
                filename = parstURL(src).path.split("/").slice(-1)[0]
            }
            if (!tempFilePath) {
                hideLoading()
                return
            }
            if (whichPlatform() === "mp-weixin" || whichPlatform() === "app-plus") {
                // app端和小程序端可以使用openDocument
                const filePath = tempFilePath
                uni.openDocument({
                    filePath: filePath,
                    fileType: fileType ? fileType : ext,
                    success: function () {
                        uni.showToast({
                            icon: "none",
                            title: "打开文档成功",
                        })
                    },
                    fail() {
                        uni.showToast({
                            icon: "none",
                            title: "文档打开失败",
                        })
                    },
                    complete() {
                        hideLoading()
                    },
                })
            } else {
                // h5直接下载文件
                var link = document.createElement("a") // Or maybe get it from the current document
                link.href = tempFilePath
                link.download = filename
                link.innerHTML = "download file"
                document.body.appendChild(link) // Or append it whereever you want
                link.click()
                document.body.removeChild(link)
                hideLoading()
            }
        },
        fail() {
            uni.showToast({
                icon: "none",
                title: "文档下载失败",
            })
            hideLoading()
        },
    })
    downloadTask.onProgressUpdate(res => {
        console.log("下载进度" + res.progress)
        console.log("已经下载的数据长度" + res.totalBytesWritten)
        console.log("预期需要下载的数据总长度" + res.totalBytesExpectedToWrite)
    })
}
