"use strict";

import {
    TREE_ITEM_SELECT,
    TREE_ITEM_CHANGE,
    TREE_ITEM_ADD,
    TREE_ITEM_DELETE,
    TREE_ITEM_EXPAND,
    TREE_ITEM_COLLAPSE,
    TREE_ITEM_MOVE,
} from "../constants";

function select(id) {
    return {
        type: TREE_ITEM_SELECT,
        id,
    };
}

function change(id, name) {
    return {
        type: TREE_ITEM_CHANGE,
        id,
        name,
    };
}

function add(name, parentId) {
    return {
        type: TREE_ITEM_ADD,
        name: name,
        id: Date.now(),
        parentId,
    };
}

function del(id) {
    return {
        type: TREE_ITEM_DELETE,
        id,
    };
}

function expand(id) {
    return {
        type: TREE_ITEM_EXPAND,
        id,
    };
}

function collapse(id) {
    return {
        type: TREE_ITEM_COLLAPSE,
        id,
    };
}

function move(id, targetId, pos) {
    return {
        type: TREE_ITEM_MOVE,
        id,
        targetId,
        pos,
    };
}

export const treeItem = {
    select,
    change,
    add,
    del,
    expand,
    collapse,
    move,
};
