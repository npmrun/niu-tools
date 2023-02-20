// http://localhost:8080/#/pages/index/index?a=123
export function parstURL(url: string) {
    let queryIndex = url.indexOf("?") == -1 ? url.length : url.indexOf("?")
    const path = url.slice(0, queryIndex)
    const search = url.slice(queryIndex)
    return {
        path,
        search,
    }
}

export function bytesToSize(bytes: number) {
    if (bytes === 0) {
        return '0 B'
    }
    var k = 1024;
    var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(4) + ' ' + sizes[i];
}

export function addMethod(obj: { [propsKey: string]: Function }, name: string, fnc: Function) {
    var old = obj[name];
    obj[name] = function () {
        if (arguments.length === fnc.length) {
            return fnc.apply(this, arguments);
        } else if (typeof old === "function") {
            return old.apply(this, arguments);
        }
    }
}