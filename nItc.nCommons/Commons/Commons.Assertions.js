"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function _FAIL() {
    throw new Error();
}
exports._FAIL = _FAIL;
function _NEVER(neverValue) {
    throw new Error();
}
exports._NEVER = _NEVER;
function _ASSERT(condition) {
    if (!condition) {
        throw new Error();
    }
}
exports._ASSERT = _ASSERT;
function _ASSERT_DEFINED(obj) {
    if (obj == undefined) {
        return _FAIL();
    }
    else {
        return obj;
    }
}
exports._ASSERT_DEFINED = _ASSERT_DEFINED;
function _ASSERT_SINGLE_ITEM(array) {
    const [x, ...rest] = array;
    if (rest.length > 0) {
        return _FAIL();
    }
    else {
        return [x];
    }
}
exports._ASSERT_SINGLE_ITEM = _ASSERT_SINGLE_ITEM;
//# sourceMappingURL=Commons.Assertions.js.map