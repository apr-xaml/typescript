"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linqOps = require("../LinqOperations");
const LinqOperations_errors_1 = require("../LinqOperations.errors");
const OxAlwaysThrowFunc_1 = require("../../aliases/OxAlwaysThrowFunc");
class AbstractBuilderImplementation {
    constructor(_sequence) {
        this._sequence = _sequence;
    }
    select(oxSelect) {
        const seqTransformed = this._transformThisSeq();
        const res = new AfterSelectLinqBuilder(seqTransformed, oxSelect);
        return res;
    }
    where(oxWhere) {
        const seqTrans = this._transformThisSeq();
        return new AfterWhereLinqBuilder(seqTrans, oxWhere);
    }
    aggregate(oxTransformFunc, oxInitialTransformFunc, oxOnEmptySequenceReturn) {
        const seqTrans = this._transformThisSeq();
        return new AfterAggregateLinqBuilder(seqTrans, oxTransformFunc, oxInitialTransformFunc, oxOnEmptySequenceReturn);
    }
    single(oxWhere) {
        const seqTrans = this._transformThisSeq();
        return new AfterSingleLinqBuilder(seqTrans, oxWhere);
    }
    groupBy(oxSelect) {
        const seqTrans = this._transformThisSeq();
        return new AfterGroupByLinqBuilder(seqTrans, oxSelect);
    }
    go() {
        return Array.from(this._transformThisSeq());
    }
}
exports.AbstractBuilderImplementation = AbstractBuilderImplementation;
class AfterAggregateLinqBuilder {
    constructor(_sequence, _oxTransformFunc, _oxInitialTransformFunc, _oxOnEmptyCollectionReturnFunc) {
        this._sequence = _sequence;
        this._oxTransformFunc = _oxTransformFunc;
        this._oxInitialTransformFunc = _oxInitialTransformFunc;
        this._oxOnEmptyCollectionReturnFunc = _oxOnEmptyCollectionReturnFunc;
    }
    go() {
        return linqOps.aggregate(this._sequence, this._oxTransformFunc, this._oxOnEmptyCollectionReturnFunc, this._oxInitialTransformFunc);
    }
}
exports.AfterAggregateLinqBuilder = AfterAggregateLinqBuilder;
class AfterGroupByLinqBuilder extends AbstractBuilderImplementation {
    constructor(_sequence, _oxGroupByFunc) {
        super(_sequence);
        this._oxGroupByFunc = _oxGroupByFunc;
    }
    _transformThisSeq() {
        return linqOps.groupBy(this._sequence, this._oxGroupByFunc);
    }
}
exports.AfterGroupByLinqBuilder = AfterGroupByLinqBuilder;
class AfterSelectLinqBuilder extends AbstractBuilderImplementation {
    constructor(_sequence, _oxSelectFunc) {
        super(_sequence);
        this._oxSelectFunc = _oxSelectFunc;
    }
    _transformThisSeq() {
        return linqOps.select(this._sequence, this._oxSelectFunc);
    }
}
exports.AfterSelectLinqBuilder = AfterSelectLinqBuilder;
class AfterSingleLinqBuilder {
    constructor(_sequence, _oxWherePred) {
        this._sequence = _sequence;
        this._oxWherePred = _oxWherePred;
    }
    goAssert(oxOnFailureFunc = OxAlwaysThrowFunc_1.OxAlwaysThrowFunc) {
        const res = linqOps.single(this._sequence, this._oxWherePred);
        if (!(res instanceof LinqOperations_errors_1.MoreThanOneElementError) && !(res instanceof LinqOperations_errors_1.NotFoundError)) {
            return res;
        }
        else {
            return oxOnFailureFunc();
        }
    }
    go() {
        return linqOps.single(this._sequence, this._oxWherePred);
    }
}
exports.AfterSingleLinqBuilder = AfterSingleLinqBuilder;
class AfterWhereLinqBuilder extends AbstractBuilderImplementation {
    constructor(_sequence, _oxWherFunc) {
        super(_sequence);
        this._oxWherFunc = _oxWherFunc;
    }
    _transformThisSeq() {
        return linqOps.where(this._sequence, this._oxWherFunc);
    }
}
exports.AfterWhereLinqBuilder = AfterWhereLinqBuilder;
//# sourceMappingURL=AbstractBuilderImplementation.js.map