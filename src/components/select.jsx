"use strict";

import React, { Component, PropTypes } from "react";

import classnames from "classnames/bind";
import styles from "./select.scss";

const cx = classnames.bind(styles);

export default class Select extends Component {
    handleSelect(evt) {
        let id = +evt.target.value;
        if (!isNaN(id)) {
            this.props.select(id);
        }
    }
    render() {
        let { options = [], selectedIndex = -1, ...props } = this.props;
        let opts = options.map((opt, idx) => {
            if (opt && typeof opt === "object") {
                return {
                    value: opt.hasOwnProperty("value") ? opt.value : opt.text,
                    text: opt.hasOwnProperty("text") ? opt.text : opt.value,
                    selected: !!opt.selected,
                };
            } else {
                return {value: opt, text: opt, selected: false};
            }
        });
        let selectedOption = opts[selectedIndex] || opts.filter(opt => opt.selected)[0];
        let value = selectedOption ? selectedOption.value : null;
        let optionElems = opts.map((opt, idx) => (
            <option key={idx} value={opt.value}>{opt.text}</option>
        ));
        return (
            <select className={`${cx("root")} form-control`} onChange={this.handleSelect.bind(this)}
                    value={value} {...props}>{optionElems}</select>
        );
    }
}

Select.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.any.isRequired,
            PropTypes.shape({
                value: PropTypes.any.isRequired,
                text: PropTypes.string,
                selected: PropTypes.bool,
            }),
        ]).isRequired
    ),
    selectedIndex: PropTypes.number,
    select: PropTypes.func.isRequired,
};
