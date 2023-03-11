// @ts-nocheck

var client = function () {
    // 用户代理引擎
    var engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,

        ver: null
    };
    //用户浏览器类型
    var browser = {
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,

        ver: null
    }

    //用户平台、设备、操作系统
    var system = {
        win: false,
        mac: false,
        xll: false,

        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,

        wii: false,
        ps: false,

    };

    /*
        按顺序检测：opera,webkit,khtml,gecko,ie
    */
    var ua = navigator.userAgent;
    if (window.opera) {
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {    //S+表示非空格的特殊字符
        engine.ver = RegExp["$1"];  //捕获正则表达式匹配的第一个字符串
        engine.webkit = parseFloat(engine.ver);

        //chrome or safari
        if (/Chrome\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.chrome = parseFloat(browser.ver);
        } else if (/Version\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.safari = parseFloat(browser.ver);
        } else {
            //近似确定版本
            var safariVersion = 1;
            if (engine.webkit < 100) {
                safariVersion = 1;
            } else if (engine.webkit < 312) {
                safariVersion = 1.2;
            } else if (engine.webkit < 412) {
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            }
        }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp["$1"];
        engine.khtml = browser.konq = parseFloat(engine.ver);
    } else if (/rv:([^\)]+))\) Gecko\/\d{8}/.test(ua)) {
        engine.ver = RegExp["$1"];
        engine.gecko = parseFloat(engine.ver);
        //firefox?
        if (/FireFox\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.firefox = parseFloat(browser.ver);
        }
    } else if (/MSIE ([^;]+)/.test(ua)) {
        engine.ver = browser.ver = RegExp["$1"];
        engine.ie = browser.ie = parseFloat(engine.ver);
    };

    //检测平台
    var plaform = navigator.plaform;
    system.win = plaform.indexOf("Win") == 0;
    system.mac = plaform.indexOf("Mac") == 0;
    system.xll = (plaform.indexOf("Xll") == 0) || (plaform.indexOf("Linux") == 0);

    //检测Windows操作系统
    if (system.win) {
        if (/WIn(?:dows)?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
            if (RegExp["$1"] == "NT") {
                switch (RegExp["$2"]) {
                    case "5.0": {
                        system.win = "2000";
                        break;
                    }
                    case "5.1": {
                        system.win = "XP";
                        break;
                    }
                    case "6.0": {
                        system.win = "Vista";
                        break;
                    }
                    case "6.1": {
                        system.win = "7";
                        break;
                    }
                    default: {
                        system.win = "NT";
                        break;
                    }
                }
            } else if (RegExp["$1"] == "9x") {
                system.win = "ME";
            } else {
                system.win = RegExp["$1"];
            }
        }

    }

    //移动设备
    system.iphone = ua.indexOf("iPhone") > -1;
    system.ipod = ua.indexOf("iPod") > -1;
    system.ipad = ua.indexOf("iPad") > -1;
    system.NokiaN = ua.indexOf("NokiaN") > -1;

    //windowsMobile
    if (system.win == "CE") {
        system.winMobile = system.win;
    } else if (system.win == "Ph") {
        if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
            system.win = "Phone";
            system.winMobile = parseFloat(RegExp["$1"]);
        }
    }

    //检测ios版本
    if (system.mac && ua.indexOf("Mobile") > -1) {
        if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
            system.ios = parseFloat(RegExp.$1.replace("_", "."));
        } else {
            system.ios = 2;
        }
    }

    //检测安卓版本
    if (/Android (\d+\.+\d)/.test(ua)) {
        system.android = parseFloat(RegExp.$1);
    }

    //游戏系统
    system.wii = ua.indexOf("Wii") > -1;
    system.ps = /playstation/i.test(ua);


    return {
        engine: engine,
        browser: browser,
        system: system
    };
}(); 

export default client