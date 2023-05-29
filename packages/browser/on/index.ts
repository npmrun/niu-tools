function on(ele: any, event: string, fn: Function) {
    if (ele.addEventListener) {
        ele.addEventListener(event, fn, false);
    } else if (ele.attachEvent) {
        ele!.attachEvent("on" + event, fn);
    } else {
        ele["on" + event] = fn;
    }
}

//对应的解绑方法如下：
function off(el: any, event: string, fn: Function) {
    if (el.removeEventListener) {
        el.removeEventListener(event, fn, false);
    } else if (el.detachEvent) {
        el.detachEvent("on" + event, fn.bind(el));
    } else {
        el["on" + event] = null;
    }
}

export { on, off };
