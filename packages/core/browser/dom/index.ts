const hasClass = function (obj: HTMLElement, cls: string) {
    const result = obj.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
    return !!result
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

function setStyle(el: HTMLElement, css: Partial<CSSStyleDeclaration>) {
    for (const key in css) {
        if (Object.prototype.hasOwnProperty.call(css, key)) {
            const prop = css[key]
            el.style[key] = prop as string
        }
    }
}

function getStyle(el: HTMLElement, cssName: keyof CSSStyleDeclaration) {
    const cs = getComputedStyle(el, null)
    return cs.getPropertyValue(cssName as string)
}

export { hasClass, addClass, removeClass, toggleClass, setStyle, getStyle };
