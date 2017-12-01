"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MoreThanOneElementError {
    constructor(entrySequence, firstMatching, secondMatching) {
        this.entrySequence = entrySequence;
        this.firstMatching = firstMatching;
        this.secondMatching = secondMatching;
    }
}
exports.MoreThanOneElementError = MoreThanOneElementError;
class NotFoundError {
    constructor(entrySequence) {
        this.entrySequence = entrySequence;
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=LinqOperations.errors.js.map