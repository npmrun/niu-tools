function toast(msg: string) {
    uni.showToast({
        icon: 'none',
        title: msg
    })
}
toast.success = function (msg: string) {
    uni.showToast({
        icon: 'success',
        title: msg
    })
}
toast.fail = function (msg: string) {
    uni.showToast({
        icon: "error",
        title: msg
    })
}

export {
    toast
}