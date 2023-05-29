export const setStorage = (key: string, val: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(val));
    } catch (error) {
        console.error(error);
    }
};

export const getStorage = (key: string) => {
    const str = localStorage.getItem(key);
    if (str === null || str === undefined) {
        return null;
    }
    try {
        return JSON.parse(str);
    } catch (error) {
        return str;
    }
};

export function getAllStorage() {
    let len = localStorage.length
    let result = Object.create(null)
    for (var i = 0; i < len; i++) {
        var getKey = localStorage.key(i);
        if (getKey) {
            let getVal = localStorage.getItem(getKey);
            result[getKey] = getVal
        }
    }
    return result
}

export const clearStorage = (key?: string) => {
    try {
        key && localStorage.removeItem(key);
        !key && localStorage.clear();
    } catch (error) {
        console.error(error);
    }
};
