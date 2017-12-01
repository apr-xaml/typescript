import { getAllProperties } from "./Commons.Reflection";
import { TypeDescription } from "./Commons.TypeAliases";

export const IsDisposableSymbolValue = Symbol("isDisposable");



export interface IDisposable
{
    //https://stackoverflow.com/questions/41402558/why-does-typescript-have-a-limitation-with-using-custom-symbols-in-interfaces
    readonly IsDisposableSymbol: symbol;

    readonly isAlreadyDisposed: boolean;
    dispose(): void;
}





export function isDisposable(obj: any): obj is IDisposable
{


    const isDisposableSymbol: keyof IDisposable = "IsDisposableSymbol";


    //At least this construct will error when new properties are added to IDisposable interface
    const typeDesc: TypeDescription<IDisposable> =
        {
            dispose: undefined,
            isAlreadyDisposed: undefined,
            IsDisposableSymbol: undefined,
        };

    const propsOfIDisposable = getAllProperties(typeDesc);

    const allPropsDefined = propsOfIDisposable.every(x => obj[x] != undefined);

    const specialPropHasCorrectValue = (obj[isDisposableSymbol] == IsDisposableSymbolValue);


    return (allPropsDefined && specialPropHasCorrectValue);

}