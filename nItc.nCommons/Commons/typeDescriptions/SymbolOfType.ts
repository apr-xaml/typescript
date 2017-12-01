export interface ISymbolOfType
{
    readonly raw: symbol;
}

export class SymbolOfType<T> implements ISymbolOfType
{
    readonly raw: symbol;

    constructor(typeName: string)
    {
        this.raw = Symbol(typeName);
    }
}



