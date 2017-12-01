"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Arg0Symbol {
    constructor(resSymb) {
        this.resSymb = resSymb;
    }
    get args() { return []; }
}
exports.Arg0Symbol = Arg0Symbol;
class Arg1Symbol {
    constructor(resSymb, arg1Symb) {
        this.resSymb = resSymb;
        this.arg1Symb = arg1Symb;
    }
    get args() { return [this.arg1Symb]; }
}
exports.Arg1Symbol = Arg1Symbol;
class Arg2Symbol {
    constructor(resSymb, arg1Symb, arg2Symb) {
        this.resSymb = resSymb;
        this.arg1Symb = arg1Symb;
        this.arg2Symb = arg2Symb;
    }
    get args() { return [this.arg1Symb, this.arg2Symb]; }
}
exports.Arg2Symbol = Arg2Symbol;
//# sourceMappingURL=symbolCombinations.classes.js.map