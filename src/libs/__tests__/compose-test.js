"use strict";
/* eslint-env jest */

jest.dontMock("../compose");

const { default: compose } = require("../compose");

describe("compose()", () => {
    it("returns the first given argument if given no functions", () => {
        expect(compose()(10)).toBe(10);
        expect(compose()(10, 20)).toBe(10);
        expect(compose()()).toBe(undefined);
    });
    it("composes from right to left", () => {
        expect(compose((a, b) => a + b)(10, 20)).toBe(30);
    });
    it("composes functions from right to left", () => {
        let a = next => x => next(x + x);
        let b = next => x => next(x * 2);
        let f = a => a / a;
        expect(
            compose(a, b)(f)(1)
        ).toBe(1);
    });
    it("can be seeded with multiple arguments", () => {
        expect(
            compose(
                a => 2 * a,
                (a, b) => a + b
            )(10, 20)
        ).toBe((10 + 20) * 2);
    });
});
