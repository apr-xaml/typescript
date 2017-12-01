import * as linqOps from "./LinqOperations";
import { ILinqBuilder, IGroup } from "./ILingBuilder";
import { AfterGroupByLinqBuilder, AfterWhereLinqBuilder, AfterSelectLinqBuilder, AfterSingleLinqBuilder, IAfterSingleLinqBuilder, AfterAggregateLinqBuilder, IAfterAggregateLinqBuilder } from "./AbstractBuilderImplementation/AbstractBuilderImplementation";
import { OxSelect2Func, OxSelectFunc } from "./LinqOperations";
import { Primitive } from "../Commons.TypeAliases";


export function linqFrom<T>(array: ReadonlyArray<T>): ILinqBuilder<T>
{
    return new StartingLinqBuilder<T>(array);
}





class StartingLinqBuilder<T> implements ILinqBuilder<T> 
{


    constructor(private readonly _sequence: ReadonlyArray<T>)
    {

    }


    groupBy<TKey extends Primitive>(oxSelect: linqOps.OxSelectFunc<T, TKey>): ILinqBuilder<IGroup<TKey, T>>
    {
        return new AfterGroupByLinqBuilder<T, TKey>(this._sequence, oxSelect);
    }

    where(oxWhere: linqOps.OxWherePredicate<T>): ILinqBuilder<T>
    {
        return new AfterWhereLinqBuilder(this._sequence, oxWhere);
    }
    select<TResNext>(oxSelect: linqOps.OxSelectFunc<T, TResNext>): ILinqBuilder<TResNext>
    {
        return new AfterSelectLinqBuilder<T, TResNext>(this._sequence, oxSelect);
    }

    aggregate<TAggr>(oxTransformFunc: OxSelect2Func<T, TAggr, TAggr>, oxInitialTransformFunc: OxSelectFunc<T, TAggr>, oxOnEmptySequenceReturn: () => TAggr): IAfterAggregateLinqBuilder<TAggr>
    {
        return new AfterAggregateLinqBuilder<T, TAggr>(this._sequence, oxTransformFunc, oxInitialTransformFunc, oxOnEmptySequenceReturn);
    }

    single(oxWhere?: linqOps.OxWherePredicate<T>): IAfterSingleLinqBuilder<T>
    {
        return new AfterSingleLinqBuilder<T>(this._sequence, oxWhere);
    }

    go(): ReadonlyArray<T>
    {
        return this._sequence;
    }

}