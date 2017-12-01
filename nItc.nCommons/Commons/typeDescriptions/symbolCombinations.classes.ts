import { IArg0Symbol, IArg1Symbol, IArg2Symbol } from "./symbolCombinations";
import { ISymbolOfType, SymbolOfType } from "./SymbolOfType";

export class Arg0Symbol<TRes> implements IArg0Symbol<TRes>
{
    get args(): ReadonlyArray<SymbolOfType<TRes>> { return []; }

    constructor(public readonly resSymb: SymbolOfType<TRes>)
    {

    }


}




export class Arg1Symbol<TArg1, TRes> implements IArg1Symbol<TArg1, TRes>
{
    get args() { return [this.arg1Symb]; }


    constructor(public readonly resSymb: SymbolOfType<TRes>, public readonly arg1Symb: SymbolOfType<TArg1>)
    {

    }
}


export class Arg2Symbol<TArg1, TArg2, TRes> implements IArg2Symbol<TArg1, TArg2, TRes>
{
    get args() { return [this.arg1Symb, this.arg2Symb]; }

    constructor(public readonly resSymb: SymbolOfType<TRes>, public readonly arg1Symb: SymbolOfType<TArg1>, public readonly arg2Symb: SymbolOfType<TArg2>)
    {

    }
}