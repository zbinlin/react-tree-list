"use strict";

export default function compose(...funcs) {
    return (...args) => {
        if (funcs.length === 0) {
            return args[0];
        }
        const last = funcs[funcs.length - 1];
        const rest = funcs.slice(0, -1);
        return rest.reduceRight(
            (composed, func) => func(composed),
            last(...args)
        );
    };
}
