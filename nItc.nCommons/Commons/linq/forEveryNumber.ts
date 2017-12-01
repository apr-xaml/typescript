import { ILinqBuilder } from "./ILingBuilder";
import { AbstractBuilderImplementation } from "./AbstractBuilderImplementation/AbstractBuilderImplementation";


export function forEveryNumber(startIncl: number, endIncl: number): ILinqBuilder<number>
{
    function* getNumberIterable(startIncl: number, endIncl: number): Iterable<number>
    {
        yield startIncl;

        let iRes = (startIncl + 1);
        while (iRes <= endIncl)
        {
            yield iRes;

            iRes = (iRes + 1);
        }
    }

    return new ForEveryNumberLinqBuilder(getNumberIterable(startIncl, endIncl));
}



class ForEveryNumberLinqBuilder extends AbstractBuilderImplementation<number, number> implements ILinqBuilder<number>
{
    protected _transformThisSeq(): Iterable<number>
    {
        return this._sequence;
    }

    constructor(iter: Iterable<number>)
    {
        super(iter);
    }
}
