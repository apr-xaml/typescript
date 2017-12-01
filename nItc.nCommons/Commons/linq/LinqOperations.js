"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linqErrors = require("./LinqOperations.errors");
const Commons_Assertions_1 = require("../Commons.Assertions");
function* _mergeIterableWithIteratorResults(res1, res2, partiallyConsumedIterator) {
    yield res1;
    yield res2;
    while (true) {
        const iRes = partiallyConsumedIterator.next();
        if (iRes.done) {
            return;
        }
        else {
            yield iRes.value;
        }
    }
}
function* where(sequence, oxFilterFunc) {
    for (let i of sequence) {
        if (oxFilterFunc(i)) {
            yield i;
        }
    }
}
exports.where = where;
function* select(sequence, oxSelectFunc) {
    for (let i of sequence) {
        const res = oxSelectFunc(i);
        yield res;
    }
}
exports.select = select;
function aggregate(sequence, oxSelect, oxEmptyColFunc, oxFirstTransform) {
    const iterator = sequence[Symbol.iterator]();
    const firstRun = iterator.next();
    if (firstRun.done) {
        return oxEmptyColFunc();
    }
    const firstTransform = oxFirstTransform(firstRun.value);
    const secondRun = iterator.next();
    if (secondRun.done) {
        return firstTransform;
    }
    const secondTransform = oxSelect(secondRun.value, firstTransform);
    let iTransform = secondTransform;
    while (true) {
        const iRes = iterator.next();
        if (iRes.done) {
            break;
        }
        iTransform = oxSelect(iRes.value, iTransform);
    }
    return iTransform;
}
exports.aggregate = aggregate;
function groupBy(sequence, oxKeySelectFunc) {
    const groups = [];
    for (let i of sequence) {
        const key = oxKeySelectFunc(i);
        const index = groups.findIndex(x => x.key === key);
        if (index == (-1)) {
            groups.push({ key: key, values: [i] });
        }
        else {
            const oldGroup = groups[index];
            const newGroup = { key: key, values: [...oldGroup.values, i] };
            groups[index] = newGroup;
        }
    }
    return groups;
}
exports.groupBy = groupBy;
function single(sequence, oxWhere) {
    let results = [];
    const oxWherOrIdentity = !oxWhere ? ((x) => true) : oxWhere;
    for (let i of sequence) {
        if (oxWherOrIdentity(i)) {
            results = [...results, i];
        }
        if (results.length > 1) {
            break;
        }
    }
    switch (results.length) {
        case 1:
            {
                return results[0];
            }
        case 0:
            {
                return new linqErrors.NotFoundError(sequence);
            }
        default:
            {
                const [x1, x2] = results;
                return new linqErrors.MoreThanOneElementError(sequence, x1, x2);
            }
    }
}
exports.single = single;
function* zipSameLen(seq1, seq2) {
    while (true) {
        const seq1Iter = seq1[Symbol.iterator]();
        const seq2Iter = seq2[Symbol.iterator]();
        const firstCall1 = seq1Iter.next();
        const firstCall2 = seq2Iter.next();
        let iCall1 = firstCall1;
        let iCall2 = firstCall2;
        function _areBothDone(iter1, iter2) {
            const areBothDone = (iter1.done && iter2.done);
            const areBothNotDone = (!iter1.done && !iter2.done);
            if (areBothDone) {
                return true;
            }
            else if (areBothNotDone) {
                return false;
            }
            else {
                return Commons_Assertions_1._FAIL();
            }
        }
        let iAreDone = _areBothDone(firstCall1, firstCall2);
        while (!iAreDone) {
            yield [iCall1.value, iCall2.value];
            iCall1 = seq1Iter.next();
            iCall2 = seq2Iter.next();
            iAreDone = _areBothDone(iCall1, iCall2);
        }
    }
}
exports.zipSameLen = zipSameLen;
//# sourceMappingURL=LinqOperations.js.map