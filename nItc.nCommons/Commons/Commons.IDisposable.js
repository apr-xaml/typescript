"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commons_Reflection_1 = require("./Commons.Reflection");
exports.IsDisposableSymbolValue = Symbol("isDisposable");
function isDisposable(obj) {
    const isDisposableSymbol = "IsDisposableSymbol";
    const typeDesc = {
        dispose: undefined,
        isAlreadyDisposed: undefined,
        IsDisposableSymbol: undefined,
    };
    const propsOfIDisposable = Commons_Reflection_1.getAllProperties(typeDesc);
    const allPropsDefined = propsOfIDisposable.every(x => obj[x] != undefined);
    const specialPropHasCorrectValue = (obj[isDisposableSymbol] == exports.IsDisposableSymbolValue);
    return (allPropsDefined && specialPropHasCorrectValue);
}
exports.isDisposable = isDisposable;
//# sourceMappingURL=Commons.IDisposable.js.map