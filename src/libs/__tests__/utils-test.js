"use strict";
/* eslint-env jest */

jest.dontMock("../utils");

const { nest, flat } = require("../utils");

describe("nest function", () => {
    it("throws a TypeError that the argument 0 is not array", () => {
        expect(() => nest()).toThrow();
    });
    it("converts a flatted array to nested array", () => {
        const flattedAry = [
            { id: 1, name: "first", parentId: null },
            { id: 2, name: "second", parentId: 1 },
        ];
        expect(nest(flattedAry)[0].__children__[0].name).toBe("second");
    });
});

describe("flat function", () => {
    it("throws a TypeError that the argument 0 is not array", () => {
        expect(() => flat()).toThrow();
    });
    it("converts a nested array to flatted array", () => {
        const nestedAry = [
            { id: 1, name: "first", parentId: null, __children__: [
                { id: 2, name: "second" },
            ]},
        ];
        expect(flat(nestedAry).length).toBe(2);
    });
});

describe("nest & flat", () => {
    it("is nest(flat(nestedAry)) == nestedAry", () => {
        const nestedAry = [
            { id: 1, name: "first", __children__: [
                { id: 2, name: "second" },
            ]},
        ];
        expect(nest(flat(nestedAry))).toEqual(nestedAry);
    });
    it("is flat(nest(flattedAry)) == flattedAry", () => {
        const flattedAry = [
            { id: 1, name: "first", parentId: undefined },
            { id: 2, name: "second", parentId: 1 },
        ];
        expect(flat(nest(flattedAry))).toEqual(flattedAry);
    });
});
