"use strict";

import React, { Component, PropTypes } from "react";
import TreeItem from "./tree-item";

import classnames from "classnames/bind";
import styles from "./index.scss";
const cx = classnames.bind(styles);

export default class Tree extends Component {
    render() {
        let { data, treeOp, level = 0 } = this.props;
        let trees = data.map((item, idx) => {
            return (
                <TreeItem key={idx} id={item.id} value={item.value} text={item.name}
                    level={level}
                    selected={item.selected}
                    expanded={item.expanded}
                    treeOp={treeOp}
                    children={item.__children__ ? <Tree {...this.props} level={level + 1} data={item.__children__} /> : null} />
            );
        });
        return (
            <div className={cx("tree")} role="tree">
                {trees}
            </div>
        );
    }
}

Tree.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            value: PropTypes.string,
            name: PropTypes.string,
            pid: PropTypes.number,
        })
    ).isRequired,
    level: PropTypes.number,
};
