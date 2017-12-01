"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAllProperties(typeDesc) {
    const props = [];
    for (var iPropName in typeDesc) {
        props.push(iPropName);
    }
    return props;
}
exports.getAllProperties = getAllProperties;
function instanceOf(x, propety) {
    const prop = x[propety];
    return (prop != undefined);
}
exports.instanceOf = instanceOf;
//# sourceMappingURL=Commons.Reflection.js.map