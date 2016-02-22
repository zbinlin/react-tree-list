"use strict";

import React, { Component, PropTypes } from "react";
import { findDOMNode } from "react-dom";
import classNames from "classnames/bind";
import compose from "../../libs/compose";
import { DragSource, DropTarget } from "react-dnd";

import styles from "./tree-item.scss";

const cx = classNames.bind(styles);

class TreeItem extends Component {
    handleToggle(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        let id = this.props.id;
        if (this.props.expanded) {
            this.props.treeOp.collapse(id);
        } else {
            this.props.treeOp.expand(id);
        }
    }
    handleAdd(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        let id = this.props.id;
        let name = window.prompt("Please Enter Item Name:");
        if (name) {
            this.props.treeOp.add(name, id);
        }
    }
    handleChange(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        let { id, text: oldName } = this.props;
        let name = window.prompt("Change The Value:", oldName);
        if (name && name !== oldName) {
            this.props.treeOp.change(id, name);
        }
    }
    handleDelete(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        let id = this.props.id;
        if (window.confirm("Do You Delete This Item:")) {
            this.props.treeOp.del(id);
        }
    }
    handleSelect(evt) {
        this.props.treeOp.select(this.props.id);
    }
    render() {
        let { text, children, expanded = false, selected = false, level = 0,
              connectDragSource, connectDropTarget, isDragging, insert, isOver,
              ...props } = this.props;
        let classSet = {
            root: true,
            expandable: !!children,
            expanded: !!expanded,
            selected: !!selected,
        };
        return (
            <div {...props} className={cx(classSet)} role="treeitem">
                {connectDropTarget(connectDragSource(
                    <div style={{paddingLeft: `${level * 2 + 0.5}rem`, opacity: isDragging ? 0.5 : 1}}
                         className={cx("label", isOver && insert ? `append-${insert}` : "")} onClick={this.handleSelect.bind(this)}>
                        {children ?
                            <a className={cx("expand-btn")} onClick={this.handleToggle.bind(this)}
                                aria-label={expanded ? "Collapse" : "Expand"}>
                                <span aria-hidden="true">{expanded ? "\u25BF" : "\u25B8"}</span>
                            </a>
                        : null}
                        <span className={cx("text")}>{text}</span>
                        <div className={`${cx("extral")} pull-xs-right`}>
                            <a className={cx("add-btn")} onClick={this.handleAdd.bind(this)} aria-label="Add">
                                <span aria-hidden="true">Add</span>
                            </a>
                            {" "}
                            <a className={cx("change-btn")} onClick={this.handleChange.bind(this)} aria-label="Change">
                                <span aria-hidden="true">Change</span>
                            </a>
                            {" "}
                            <a className={cx("delete-btn")} onClick={this.handleDelete.bind(this)} aria-label="Delete">
                                <span aria-hidden="true">Delete</span>
                            </a>
                        </div>
                    </div>
                ))}
                {children ? <div className={cx("subtree")}>{children}</div> : null}
            </div>
        );
    }
}

TreeItem.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    children: PropTypes.element,
    expanded: PropTypes.bool,
    selected: PropTypes.bool,
    treeOp: PropTypes.shape({
        select: PropTypes.func.isRequired,
        change: PropTypes.func.isRequired,
        add: PropTypes.func.isRequired,
        del: PropTypes.func.isRequired,
        expand: PropTypes.func.isRequired,
        collapse: PropTypes.func.isRequired,
    }).isRequired,
    level: PropTypes.number,

    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
};


const DND_TYPE = "TREE_ITEM";

let dragSourceSpec = {
    beginDrag(props, monitor) {
        return {
            id: props.id,
        };
    },
    endDrag(props, monitor) {
        let result = monitor.getDropResult();
        if (!result) return;
        let id = monitor.getItem().id;
        if (id === result.targetId) return;
        let { targetId, pos } = result;
        props.treeOp.move(id, targetId, pos);
    },
};
let dropTargetSpec = {
    hover(props, monitor, cmpt) {
        let id = monitor.getItem().id;
        if (props.id === id) {
            return;
        }
        let rect = findDOMNode(cmpt).getBoundingClientRect();
        let hoverTop = rect.top + rect.height / 4;
        let hoverBottom = rect.bottom - rect.height / 4;
        let clientY = monitor.getClientOffset().y;
        if (clientY < hoverTop) {
            cmpt.setState({
                insert: "before",
            });
        } else if (clientY >= hoverTop && clientY <= hoverBottom) {
            cmpt.setState({
                insert: "current",
            });
        } else {
            cmpt.setState({
                insert: "after",
            });
        }
    },
    drop(props, monitor, cmpt) {
        let pos;
        switch (cmpt.state.insert) {
            case "before":
                pos = -1;
                break;
            case "current":
                pos = 0;
                break;
            case "after":
                pos = 1;
                break;
        }
        cmpt.setState({
            insert: "",
        });
        return {
            targetId: props.id,
            pos,
        };
    },
};

let dragSourceCollect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
};
let dropTargetCollect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({shallow: true}),
    };
};

export default compose(
   DropTarget(DND_TYPE, dropTargetSpec, dropTargetCollect),
   DragSource(DND_TYPE, dragSourceSpec, dragSourceCollect)
)(TreeItem);
