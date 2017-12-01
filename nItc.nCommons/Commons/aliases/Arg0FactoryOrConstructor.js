"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commons_Assertions_1 = require("../Commons.Assertions");
var CallingModeEnum;
(function (CallingModeEnum) {
    CallingModeEnum[CallingModeEnum["JustInvoke"] = 0] = "JustInvoke";
    CallingModeEnum[CallingModeEnum["InvokeWithNew"] = 1] = "InvokeWithNew";
})(CallingModeEnum = exports.CallingModeEnum || (exports.CallingModeEnum = {}));
function invokeArg0FactoryOrConstructor(ctrOrFactory, callingProcedure) {
    switch (callingProcedure) {
        case CallingModeEnum.JustInvoke:
            {
                return ctrOrFactory();
            }
        case CallingModeEnum.InvokeWithNew:
            {
                return new ctrOrFactory();
            }
        default:
            return Commons_Assertions_1._NEVER(callingProcedure);
    }
}
exports.invokeArg0FactoryOrConstructor = invokeArg0FactoryOrConstructor;
//# sourceMappingURL=Arg0FactoryOrConstructor.js.map