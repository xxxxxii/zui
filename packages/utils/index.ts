import { uuidv4 } from "./uuid";
export { uuidv4 };
// 深度克隆。
deepClone.cached = new WeakMap();
export function deepClone(obj) {
    // obj 不是引用数据类型 不需要处理，直接返回
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }

    if (deepClone.cached.has(obj)) {
        return deepClone.cached.get(obj);
    }

    let temp;
    if (obj instanceof Map) {
        temp = new Map();
        deepClone.cached.set(obj, temp);
        for (let [key, val] of obj) {
            temp.set(deepClone(key), deepClone(val));
        }
    } else if (obj instanceof Set) {
        temp = new Set();
        deepClone.cached.set(obj, temp);
        for (let val of obj) {
            temp.add(deepClone(val));
        }
    } else if (obj instanceof RegExp) {
        temp = new RegExp(obj);
        deepClone.cached.set(obj, temp);
    } else {
        temp = new obj.constructor();
        deepClone.cached.set(obj, temp);
        for (let key in obj) {
            temp[key] = deepClone(obj[key]);
        }
    }
    return temp;
}

// 节流
export function throttle(callback, delay) {
    // 判断依据
    let flag = true;
    return function () {
        if (flag) {
            setTimeout(() => {
                callback.call(this);
                flag = true;
            }, delay);
        }
        flag = false;
    };
}

// 防抖
export function debounce(callback, delay) {
    // 使用闭包外部变量来定义定时器
    let timer;
    return function () {
        if (timer) {
            // 定时器存在，清除创建新的定时任务
            clearTimeout(timer);
        }
        // timer 生成新的定时任务
        timer = setTimeout(() => {
            callback.call(this);
        }, delay);
    };
}

// 去重数组
export function toRepeat(array) {
    let newArray = [];
    newArray = array.filter((item, index) => array.indexOf(item, 0) === index);
    return newArray;
}

// 数据类型检测
export function getType(obj) {
    let type = typeof obj;
    // 是基础类型数据直接返回
    if (type !== "object") {
        return type;
    }
    // 是引用类型数据使用原型链方式判断
    return Object.prototype.toString
        .call(obj)
        .replace(/^\[object (\S+)\]$/, "$1");
}

export function groupBy(arr, generateKey) {
    if (typeof generateKey === "string") {
        const propName = generateKey;
        generateKey = (item) => item[propName];
    }
    const result = {};
    for (let item of arr) {
        const key = generateKey(item);
        if (!result[key]) result[key] = [];
        result[key].push(item);
    }
    return result;
}
