"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPEOF_NUMBER = 'number';
exports.TYPEOF_STRING = 'string';
exports.TYPEOF_BOOL = 'boolean';
exports.TYPEOF_SYMBOL = 'symbol';
function isPrimitive(obj) {
    const objType = typeof obj;
    switch (objType) {
        case exports.TYPEOF_BOOL:
        case exports.TYPEOF_NUMBER:
        case exports.TYPEOF_STRING:
        case exports.TYPEOF_SYMBOL:
            return true;
        default:
            return false;
    }
}
exports.isPrimitive = isPrimitive;
//# sourceMappingURL=Commons.TypeAliases.js.map