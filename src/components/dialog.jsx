"use strict";
/* eslint-env jquery */

import React, { Component, PropTypes } from "react";

export default class Dialog extends Component {
    show() {
        if (!this.props.open || this.opened) return;
        $(this.refs.dialog)
            .on("shown.bs.modal", evt => {
                this.opened = true;
            })
            .modal("show")
            .one("hidden.bs.modal", evt => {
                this.close();
            });
    }
    hide() {
        $(this.refs.dialog).modal("hide");
    }
    close() {
        this.opened = false;
        if (!this.props.onClose) return;
        this.props.onClose();
    }
    handleConfirm() {
        this.hide();
        if (typeof this.props.onConfirm === "function")
            this.props.onConfirm();
    }
    handleCancel() {
        this.hide();
        if (typeof this.props.onCancel === "function")
            this.props.onConfirm();
    }
    componentDidUpdate() {
        this.show();
    }
    componentDidMount() {
        this.show();
    }
    render() {
        let {
            type = "message", open = false, isShowCloseButton = true,
            header, body, footer, children,
            ...props,
        } = this.props;
        if (!open) {
            return null;
        }
        if (type === "confirm" || type === "prompt") {
            footer = [
                <a key="0" style={{width: "6em"}} className="btn btn-secondary" data-dismiss="modal" role="button">取消</a>,
                <a key="1" style={{width: "6em", marginLeft: "0.67em"}} className="btn btn-primary" onClick={this.handleConfirm.bind(this)} role="button">确定</a>,
            ];
        } else if (type === "alert") {
            isShowCloseButton = false;
            footer = (
                <a style={{width: "6em"}} className="btn btn-primary center-block" data-dismiss="modal" role="button">确定</a>
            );
        }
        return (
            <div ref="dialog" className="modal" role="dialog" {...props}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        {isShowCloseButton || header ?
                            <div className="modal-header">
                                { isShowCloseButton ?
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                  : null
                                }
                                {header}
                            </div>
                        : null}
                        <div className="modal-body">
                            {body || children}
                        </div>
                        {footer ?
                            <div className="modal-footer">
                                {footer}
                            </div>
                        : null}
                    </div>
                </div>
            </div>
        );
    }
}

Dialog.propTypes = {
    header: PropTypes.node,
    body: PropTypes.node,
    footer: PropTypes.node,
    isShowCloseButton: PropTypes.bool,
    onClose: PropTypes.func,
    type: PropTypes.oneOf([
        "message", "alert", "confirm", "prompt",
    ]),
};
