/**
 * 滚动到固定位置
 */
export function scrollIntoView(traget: string | number) {
    let isNum = false
    if (typeof traget == "number") {
        isNum = true
    }
    let tragetElem: HTMLDivElement | null = null;
    let tragetElemPostition: number = 0;
    if (isNum) {
        tragetElemPostition = traget as number
    } else {
        tragetElem = document.querySelector(traget as string)
        tragetElemPostition = tragetElem?.offsetTop ?? 0
    }
    // 判断是否支持新特性
    if (
        typeof window.getComputedStyle(document.body).scrollBehavior ==
        "undefined" || isNum
    ) {
        // 当前滚动高度
        let scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
        // 滚动step方法
        const step = function () {
            // 距离目标滚动距离
            let distance = tragetElemPostition - scrollTop;

            // 目标需要滚动的距离，也就是只走全部距离的五分之一
            scrollTop = scrollTop + distance / 5;
            if (Math.abs(distance) < 1) {
                window.scrollTo(0, tragetElemPostition);
            } else {
                window.scrollTo(0, scrollTop);
                setTimeout(step, 20);
            }
        };
        step();
    } else if (tragetElem) {
        tragetElem.scrollIntoView({
            behavior: "smooth",
            inline: "nearest"
        });
    }
}