"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Arg0FactoryOrConstructor_1 = require("./Arg0FactoryOrConstructor");
const Commons_Assertions_1 = require("../Commons.Assertions");
function invokeSomeCtrOrFactory(oxCtrOrFactory, callingProcedure, args) {
    switch (callingProcedure) {
        case Arg0FactoryOrConstructor_1.CallingModeEnum.InvokeWithNew:
            {
                return new oxCtrOrFactory(...args);
            }
        case Arg0FactoryOrConstructor_1.CallingModeEnum.JustInvoke:
            {
                const res = oxCtrOrFactory(...args);
                return res;
            }
        default:
            return Commons_Assertions_1._NEVER(callingProcedure);
    }
}
exports.invokeSomeCtrOrFactory = invokeSomeCtrOrFactory;
//# sourceMappingURL=SomeCtrOrFactory.js.map