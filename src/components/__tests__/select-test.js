"use strict";
/* eslint-env jest */

jest.dontMock("../select");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

const { default: Select } = require("../select");

describe("Select Component", () => {
    function render(el) {
        let renderer = TestUtils.createRenderer();
        renderer.render(el);
        return renderer.getRenderOutput();
    }
    it("返回一个空的 select 元素", () => {
        let output = render(<Select />);
        expect(output.props.children).toEqual([]);
        expect(output.type).toBe("select");
    });

    it("返回三个 option 元素", () => {
        let output = render(<Select options={[1, 2, 3]} />);
        expect(output.props.children.length).toBe(3);
        expect(output.props.children[0].type).toBe("option");
    });

    it("返回两个 option 元素", () => {
        let output = render(
            <Select options={[
                {text: "foo", value: 1, selected: true},
                {text: "bar", value: 2},
            ]} />
        );
        expect(output.props.children.length).toBe(2);
        expect(output.props.value).toBe(1);
        expect(output.props.children[0].type).toBe("option");
        expect(output.props.children[0].props.value).toBe(1);
        expect(output.props.children[1].props.children).toBe("bar");
    });

    it("如果同时设置了 selectedIndex 和 options 中的 selected，selectedIndex 优先", () => {
        let output = render(
            <Select options={[
                {text: "foo", value: 1, selected: true},
                {text: "bar", value: 2},
            ]} selectedIndex={1} />
        );
        expect(output.props.value).toBe(2);
    });

    it("如果同时设置了 value 和 selectedIndex，value 更优先", () => {
        let output = render(
            <Select options={[1, 2, "bar"]} selectedIndex={1} value={"bar"} />
        );
        expect(output.props.value).toBe("bar");
    });
});
