const hasClass = function (obj: HTMLElement, cls: string) {
    return obj.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
};

const addClass = function (obj: HTMLElement, cls: string) {
    if (!hasClass(obj, cls)) obj.className += " " + cls;
};

const removeClass = function (obj: HTMLElement, cls: string) {
    if (hasClass(obj, cls)) {
        const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        obj.className = obj.className.replace(reg, " ");
    }
};

const toggleClass = function (obj: HTMLElement, cls: string) {
    if (hasClass(obj, cls)) {
        removeClass(obj, cls);
    } else {
        addClass(obj, cls);
    }
};

export { hasClass, addClass, removeClass, toggleClass };
