"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractBuilderImplementation_1 = require("./AbstractBuilderImplementation/AbstractBuilderImplementation");
function forEveryNumber(startIncl, endIncl) {
    function* getNumberIterable(startIncl, endIncl) {
        yield startIncl;
        let iRes = (startIncl + 1);
        while (iRes <= endIncl) {
            yield iRes;
            iRes = (iRes + 1);
        }
    }
    return new ForEveryNumberLinqBuilder(getNumberIterable(startIncl, endIncl));
}
exports.forEveryNumber = forEveryNumber;
class ForEveryNumberLinqBuilder extends AbstractBuilderImplementation_1.AbstractBuilderImplementation {
    _transformThisSeq() {
        return this._sequence;
    }
    constructor(iter) {
        super(iter);
    }
}
//# sourceMappingURL=forEveryNumber.js.map