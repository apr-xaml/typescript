"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractBuilderImplementation_1 = require("./AbstractBuilderImplementation/AbstractBuilderImplementation");
function linqFrom(array) {
    return new StartingLinqBuilder(array);
}
exports.linqFrom = linqFrom;
class StartingLinqBuilder {
    constructor(_sequence) {
        this._sequence = _sequence;
    }
    groupBy(oxSelect) {
        return new AbstractBuilderImplementation_1.AfterGroupByLinqBuilder(this._sequence, oxSelect);
    }
    where(oxWhere) {
        return new AbstractBuilderImplementation_1.AfterWhereLinqBuilder(this._sequence, oxWhere);
    }
    select(oxSelect) {
        return new AbstractBuilderImplementation_1.AfterSelectLinqBuilder(this._sequence, oxSelect);
    }
    aggregate(oxTransformFunc, oxInitialTransformFunc, oxOnEmptySequenceReturn) {
        return new AbstractBuilderImplementation_1.AfterAggregateLinqBuilder(this._sequence, oxTransformFunc, oxInitialTransformFunc, oxOnEmptySequenceReturn);
    }
    single(oxWhere) {
        return new AbstractBuilderImplementation_1.AfterSingleLinqBuilder(this._sequence, oxWhere);
    }
    go() {
        return this._sequence;
    }
}
//# sourceMappingURL=From.js.map