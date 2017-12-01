import * as linqErrors from "./LinqOperations.errors";
import { IGroup } from "./ILingBuilder";
import { Primitive, Mutable } from "../Commons.TypeAliases";
import { _FAIL } from "../Commons.Assertions";



export type OxWherePredicate<T> = (x: T) => boolean;
export type OxSelectFunc<T, TRes> = (x: T) => TRes;
export type OxSelect2Func<T1, T2, TRes> = (x1: T1, x2: T2) => TRes;
export type OxAggregateFunc<T, TAggr, TAggrRes> = (x: T, xAggr: TAggr) => TAggrRes;


function* _mergeIterableWithIteratorResults<T>(res1: T, res2: T, partiallyConsumedIterator: Iterator<T>): Iterable<T>
{
    yield res1;
    yield res2;

    while (true)
    {
        const iRes = partiallyConsumedIterator.next();
        if (iRes.done)
        {
            return;
        }
        else
        {
            yield iRes.value;
        }
    }
}

export function* where<T>(sequence: Iterable<T>, oxFilterFunc: OxWherePredicate<T>): Iterable<T>
{
    for (let i of sequence)
    {
        if (oxFilterFunc(i))
        {
            yield i;
        }
    }
}


export function* select<T, TRes>(sequence: Iterable<T>, oxSelectFunc: OxSelectFunc<T, TRes>): Iterable<TRes>
{
    for (let i of sequence)
    {
        const res = oxSelectFunc(i);
        yield res;
    }
}


export function aggregate<T, TAggr>(sequence: Iterable<T>, oxSelect: OxSelect2Func<T, TAggr, TAggr>, oxEmptyColFunc: (() => TAggr), oxFirstTransform: OxSelectFunc<T, TAggr>): TAggr
{
    const iterator = sequence[Symbol.iterator]();

    const firstRun = iterator.next();

    if (firstRun.done)
    {
        //Empty seq
        return oxEmptyColFunc();
    }

    const firstTransform = oxFirstTransform(firstRun.value);

    const secondRun = iterator.next();

    if (secondRun.done)
    {
        //Single-item seq
        return firstTransform;
    }

    const secondTransform = oxSelect(secondRun.value, firstTransform);

    let iTransform = secondTransform;

    while (true)
    {
        const iRes = iterator.next();

        if (iRes.done)
        {
            break;
        }

        iTransform = oxSelect(iRes.value, iTransform);
    }


    return iTransform;
}


export function groupBy<TKey extends Primitive, T>(sequence: Iterable<T>, oxKeySelectFunc: OxSelectFunc<T, TKey>): Iterable<IGroup<TKey, T>>
{

    const groups: Mutable<IGroup<TKey, T>>[] = [];

    for (let i of sequence)
    {
        const key = oxKeySelectFunc(i);

        const index = groups.findIndex(x => x.key === key);

        if (index == (-1))
        {
            groups.push({ key: key, values: [i] });
        }
        else
        {
            const oldGroup = groups[index];
            const newGroup = { key: key, values: [...oldGroup.values, i] }
            groups[index] = newGroup;
        }

    }

    return groups;
}


export function single<T>(sequence: Iterable<T>, oxWhere?: OxWherePredicate<T>): (T | linqErrors.MoreThanOneElementError<T> | linqErrors.NotFoundError<T>)
{

    let results: T[] = [];

    const oxWherOrIdentity = !oxWhere ? ((x: T) => true) : oxWhere;

    for (let i of sequence)
    {
        if (oxWherOrIdentity(i))
        {
            results = [...results, i];
        }

        if (results.length > 1)
        {
            break;
        }
    }


    switch (results.length)
    {
        case 1:
            {
                return results[0];
            }
        case 0:
            {
                return new linqErrors.NotFoundError<T>(sequence);
            }
        default:
            {
                const [x1, x2] = results;
                return new linqErrors.MoreThanOneElementError(sequence, x1, x2);
            }

    }
}

export function* zipSameLen<T1, T2>(seq1: Iterable<T1>, seq2: Iterable<T2>): Iterable<[T1, T2]>
{
    while (true)
    {
        const seq1Iter = seq1[Symbol.iterator]();
        const seq2Iter = seq2[Symbol.iterator]();

        const firstCall1 = seq1Iter.next();
        const firstCall2 = seq2Iter.next();

        let iCall1 = firstCall1;
        let iCall2 = firstCall2;


        function _areBothDone(iter1: IteratorResult<T1>, iter2: IteratorResult<T2>): boolean
        {
            const areBothDone = (iter1.done && iter2.done);
            const areBothNotDone = (!iter1.done && !iter2.done);

            if (areBothDone)
            {
                return true;
                
            }
            else if (areBothNotDone)
            {
                return false;
            }
            else
            {
                return _FAIL();
            }
        }

        let iAreDone = _areBothDone(firstCall1, firstCall2);

        while (!iAreDone)
        {
            yield [iCall1.value, iCall2.value];

            iCall1 = seq1Iter.next();
            iCall2 = seq2Iter.next();

            iAreDone = _areBothDone(iCall1, iCall2);
        }
    }

}

