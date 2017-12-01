import { ILinqBuilder } from "./ILingBuilder";
import { AbstractBuilderImplementation } from "./AbstractBuilderImplementation/AbstractBuilderImplementation";
import * as linqOps from "./LinqOperations";
import { _FAIL } from "../Commons.Assertions";



export function zipSameLen<T1, T2>(array1: ReadonlyArray<T1>, array2: ReadonlyArray<T2>, offsetToAddTofirstIndex: number = 0): ILinqBuilder<[T1, T2]>
{
    const iter = createZipSameLenArraysIterable(array1, array2, offsetToAddTofirstIndex);
    return new ZippedBuilder(iter);
}


class ZippedBuilder<T1, T2> extends AbstractBuilderImplementation<[T1, T2], [T1, T2]> implements ILinqBuilder<[T1, T2]>
{
    protected _transformThisSeq(): Iterable<[T1, T2]>
    {
        return this._sequence;
    }

    constructor(iter: Iterable<[T1, T2]>)    
    {
        super(iter);
    }
}



function* createZipSameLenArraysIterable<T1, T2>(array1: ReadonlyArray<T1>, array2: ReadonlyArray<T2>, offsetToAddTofirstIndex: number): Iterable<[T1, T2]>
{
    const len1 = array1.length;
    const len2 = array2.length;

    if (len1 != len2)
    {
        return _FAIL();
    }

    for (let i = 0; i < len1; i++)
    {
        const firstIndex = (i + offsetToAddTofirstIndex) % len1;
        const secondIndex = i;

        yield [array1[firstIndex], array2[secondIndex]];
    }
    
}