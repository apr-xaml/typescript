import * as nSymb from "./SymbolOfType";
import { ISymbolOfType } from "./SymbolOfType";

export interface ISymbolCombination
{
    readonly resSymb: nSymb.ISymbolOfType;
    readonly args: ReadonlyArray<ISymbolOfType>;

}

export interface IArg0Symbol<TRes> extends ISymbolCombination 
    {
        readonly resSymb: nSymb.SymbolOfType<TRes>;
    }





export interface IArg1Symbol<TArg1, TRes> extends IArg0Symbol<TRes> 
{
    readonly arg1Symb: nSymb.SymbolOfType<TArg1>;

}


export interface IArg2Symbol<TArg1, TArg2, TRes> extends IArg1Symbol<TArg1, TRes>
{
    readonly arg2Symb: nSymb.SymbolOfType<TArg2>;
}








