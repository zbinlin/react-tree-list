"use strict";

import {
    TREE_ITEM_UPDATE,
    TREE_ITEM_SELECT,
    TREE_ITEM_CHANGE,
    TREE_ITEM_ADD,
    TREE_ITEM_DELETE,
    TREE_ITEM_EXPAND,
    TREE_ITEM_COLLAPSE,
    TREE_ITEM_MOVE,
} from "../constants";

function select(list, { id }) {
    return list.map(item => {
        return Object.assign({}, item, {
            selected: item.id === id,
        });
    });
}

function change(list, { id, name }) {
    return list.map(item => Object.assign({}, item, {
        name: item.id === id ? name : item.name,
    }));
}

function add(list, { id, name, parentId }) {
    return list.concat({
        id, name, parentId,
    });
}

function del(list, { id }) {
    let newList = list.slice();
    let ids = [id];
    let idx = newList.findIndex(item => item.id === id);
    if (idx > -1) {
        newList.splice(idx, 1);
    } else {
        return list;
    }
    while (true) {/*eslint no-constant-condition: [0]*/
        let nextIds = [];
        for (let i = 0; i < newList.length;) {
            let item = newList[i];
            if (ids.indexOf(item.parentId) > -1) {
                newList.splice(i, 1);
                nextIds.push(item.id);
            } else {
                ++i;
            }
        }
        if (nextIds.length === 0) {
            break;
        }
        ids = nextIds;
    }
    return newList;
}

function expand(list, { id }) {
    return list.map(item => Object.assign({}, item, {
        expanded: item.id === id ? true : item.expanded,
    }));
}

function collapse(list, { id }) {
    return list.map(item => Object.assign({}, item, {
        expanded: item.id === id ? false : item.expanded,
    }));
}

function move(list, { id, targetId, pos }) {
    let newList = list.slice();
    let idx = newList.findIndex(item => item.id === id);
    if (idx < 0) return list;
    let item = newList.splice(idx, 1)[0];
    let targetIdx = newList.findIndex(item => item.id === targetId);
    if (targetIdx < 0) return list;
    let targetItem = newList[targetIdx];
    if (pos === -1) { // before
        item.parentId = targetItem.parentId;
        newList.splice(targetIdx, 0, item);
    } else if (pos === 0) { // child
        let lastChildIndex = -1;
        let lastIndex = newList.length - 1;
        while (lastIndex >= 0) {
            if (newList[lastIndex].parentId === targetItem.id) {
                lastChildIndex = lastIndex;
                break;
            }
            --lastIndex;
        }
        if (lastChildIndex === -1) {
            lastChildIndex = targetIdx;
        }
        item.parentId = targetItem.id;
        newList.splice(lastChildIndex + 1, 0, item);
    } else if (pos === 1) { // after
        item.parentId = targetItem.parentId;
        newList.splice(targetIdx + pos, 0, item);
    } else {
        return list;
    }
    return newList;
}

export default function tree(state = {
    contents: [
        {id: 1, name: "foo", value: "foo"},
        {id: 2, name: "bar", value: "bar", parentId: 1},
        {id: 3, name: "bob", value: "bob", parentId: 2},
        {id: 4, name: "alice", value: "bob", parentId: 1},
    ],
}, action) {
    switch (action.type) {
        case TREE_ITEM_UPDATE:
            return Object.assign({}, state, {
                contents: action.contents,
            });
        case TREE_ITEM_SELECT:
            return Object.assign({}, state, {
                contents: select(state.contents, action),
            });
        case TREE_ITEM_CHANGE:
            return Object.assign({}, state, {
                contents: change(state.contents, action),
            });
        case TREE_ITEM_ADD:
            return Object.assign({}, state, {
                contents: add(state.contents, action),
            });
        case TREE_ITEM_DELETE:
            return Object.assign({}, state, {
                contents: del(state.contents, action),
            });
        case TREE_ITEM_EXPAND:
            return Object.assign({}, state, {
                contents: expand(state.contents, action),
            });
        case TREE_ITEM_COLLAPSE:
            return Object.assign({}, state, {
                contents: collapse(state.contents, action),
            });
        case TREE_ITEM_MOVE:
            return Object.assign({}, state, {
                contents: move(state.contents, action),
            });
        default:
            return state;
    }
}
