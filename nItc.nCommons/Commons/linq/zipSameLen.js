"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractBuilderImplementation_1 = require("./AbstractBuilderImplementation/AbstractBuilderImplementation");
const Commons_Assertions_1 = require("../Commons.Assertions");
function zipSameLen(array1, array2, offsetToAddTofirstIndex = 0) {
    const iter = createZipSameLenArraysIterable(array1, array2, offsetToAddTofirstIndex);
    return new ZippedBuilder(iter);
}
exports.zipSameLen = zipSameLen;
class ZippedBuilder extends AbstractBuilderImplementation_1.AbstractBuilderImplementation {
    constructor(iter) {
        super(iter);
    }
    _transformThisSeq() {
        return this._sequence;
    }
}
function* createZipSameLenArraysIterable(array1, array2, offsetToAddTofirstIndex) {
    const len1 = array1.length;
    const len2 = array2.length;
    if (len1 != len2) {
        return Commons_Assertions_1._FAIL();
    }
    for (let i = 0; i < len1; i++) {
        const firstIndex = (i + offsetToAddTofirstIndex) % len1;
        const secondIndex = i;
        yield [array1[firstIndex], array2[secondIndex]];
    }
}
//# sourceMappingURL=zipSameLen.js.map