"use strict";

export function nest(ary) {
    if (!Array.isArray(ary)) {
        throw new TypeError("Argument 0 must be an array");
    }
    let obj = ary.reduce((obj, el) => {
        obj[el.id] = Object.assign({}, el);
        return obj;
    }, {});
    let keys = Object.keys(obj);
    let nestedAry = [];
    for (let i = 0, len = ary.length; i < len; i++) {
        let key = ary[i].id;
        let val = obj[key];
        if (!val.parentId) {
            nestedAry.push(val);
        } else {
            let parent = obj[val.parentId];
            if (!parent) {
                console.warn("detached element, id:", keys[i]);
            } else {
                if (!parent.__children__) {
                    Object.defineProperty(parent, "__children__", {
                        value: [],
                        configurable: true,
                    });
                }
                Object.defineProperty(val, "__parent__", {
                    value: parent,
                    configurable: true,
                });
                parent.__children__.push(val);
            }
        }
    }
    return nestedAry;
}

export function flat(ary) {
    if (!Array.isArray(ary)) {
        throw new TypeError("Argument 0 must be an array");
    }
    function __flat__(ary, flattedAry, parentId) {
        for (let i = 0, len = ary.length; i < len; i++) {
            let val = ary[i];
            flattedAry.push(Object.assign({}, val, { parentId }));
            if ("__children__" in val) {
                __flat__(val.__children__, flattedAry, val.id);
            }
        }
        return flattedAry;
    }
    return __flat__(ary, []);
}
