"use strict";


import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import compose from "../../libs/compose";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import * as actionCreators from "../../actions";
import * as utils from "../../libs/utils";

import Tree from "../../components/tree";
import Select from "../../components/select";
import Dialog from "../../components/dialog";

class Root extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            dialog: {
                open: false,
                type: "message",
                header: null,
                body: null,
                footer: null,
                isShowCloseButton: true,
                onClose: () => {
                    this.close();
                },
            },
        };
    }
    show(dialog = {}) {
        let oldDialog = this.state.dialog;
        this.setState({
            dialog: Object.assign({}, oldDialog, dialog, {
                open: true,
                onClose: (...args) => {
                    this.close();
                    return dialog.onClose && dialog.onClose(...args);
                },
            }),
        });
    }
    close(dialog = {}) {
        let oldDialog = this.state.dialog;
        this.setState({
            dialog: Object.assign({}, oldDialog, dialog, {
                open: false,
            }),
        });
    }
    render() {
        let data = utils.nest(this.props.treeContents);
        let select = this.props.treeOp.select;
        function* travel(ary) {
            let selectedItem = ary.filter(item => item.selected)[0];
            if (!selectedItem) return;
            let children = ary.filter(item => item.parentId === selectedItem.id)
                              .map(item => ({
                                  text: item.name,
                                  value: item.id,
                                  selected: item.selected,
                              }));
            if (children.length) {
                children.unshift({text: "请选择"});
                yield (
                    <Select select={select} options={children} selectedIndex={0} />
                );
            }
            while (true) {/*eslint no-constant-condition: [0]*/
                if (!selectedItem) return;
                let parentId = selectedItem.parentId;
                let sibilings = ary.filter(item => item.parentId === parentId)
                                   .map(item => ({
                                       text: item.name,
                                       value: item.id,
                                       selected: item.selected,
                                   }));
                yield (
                    <Select select={select} options={sibilings} value={selectedItem.id} />
                );
                if (parentId == null)
                    return;
                selectedItem = ary.filter(item => item.id === parentId)[0];
            }
        }
        let dialog = {
            show: this.show.bind(this),
            close: this.close.bind(this),
        };
        return (
            <div className="container">
                <div className="center-block" style={{ maxWidth: "50%", paddingTop: "3rem" }}>
                    <div className="row">{
                        [...travel(this.props.treeContents)].reverse().map((select, idx, ary) => {
                            return (
                                <div key={idx} className={"col col-xs-3"}>
                                    <div style={{marginLeft: "-0.5rem", marginRight: "-0.5rem"}}>
                                        {select}
                                    </div>
                                </div>
                            );
                        })
                    }</div>
                    <div style={{marginTop: "0.5rem"}}>
                        <Tree data={data} treeOp={this.props.treeOp} dialog={dialog} />
                    </div>
                </div>
                <Dialog {...this.state.dialog} />
            </div>
        );
    }
}
Root.proptypes = {
    treeContents: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            value: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            parentId: PropTypes.number,
        })
    ),
};


function mapStateToProps(state, ownProps) {
    return {
        treeContents: state.tree.contents,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        treeOp: bindActionCreators(actionCreators.treeItem, dispatch),
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    DragDropContext(HTML5Backend)
)(Root);
