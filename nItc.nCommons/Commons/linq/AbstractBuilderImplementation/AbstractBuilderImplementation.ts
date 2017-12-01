import * as linqOps from "../LinqOperations";
import { ILinqBuilder, IGroup } from "../ILingBuilder";
import { NotFoundError, MoreThanOneElementError } from "../LinqOperations.errors";
import { OxAlwaysThrowFunc } from "../../aliases/OxAlwaysThrowFunc";
import { Arg0Factory } from "../../aliases/factories";
import { Primitive } from "../../Commons.TypeAliases";




export abstract class AbstractBuilderImplementation<TIncoming, TOutcoming> implements ILinqBuilder<TOutcoming>
{



    protected abstract _transformThisSeq(): Iterable<TOutcoming>;

    constructor(protected readonly _sequence: Iterable<TIncoming>)
    {

    }


    select<TOutcomingAfterNextSelect>(oxSelect: linqOps.OxSelectFunc<TOutcoming, TOutcomingAfterNextSelect>): ILinqBuilder<TOutcomingAfterNextSelect>
    {
        const seqTransformed = this._transformThisSeq();
        const res: ILinqBuilder<TOutcomingAfterNextSelect> = new AfterSelectLinqBuilder<TOutcoming, TOutcomingAfterNextSelect>(seqTransformed, oxSelect);
        return res;
    }


    where(oxWhere: linqOps.OxWherePredicate<TOutcoming>): ILinqBuilder<TOutcoming>
    {
        const seqTrans = this._transformThisSeq();
        return new AfterWhereLinqBuilder<TOutcoming>(seqTrans, oxWhere);
    }


    aggregate<TAggr>(oxTransformFunc: linqOps.OxSelect2Func<TOutcoming, TAggr, TAggr>, oxInitialTransformFunc: linqOps.OxSelectFunc<TOutcoming, TAggr>, oxOnEmptySequenceReturn: () => TAggr): IAfterAggregateLinqBuilder<TAggr>
    {
        const seqTrans = this._transformThisSeq();
        return new AfterAggregateLinqBuilder<TOutcoming, TAggr>(seqTrans, oxTransformFunc, oxInitialTransformFunc, oxOnEmptySequenceReturn);
    }



    single(oxWhere?: linqOps.OxWherePredicate<TOutcoming>): IAfterSingleLinqBuilder<TOutcoming>
    {
        const seqTrans = this._transformThisSeq();
        return new AfterSingleLinqBuilder<TOutcoming>(seqTrans, oxWhere);
    }

    groupBy<TKey extends Primitive>(oxSelect: linqOps.OxSelectFunc<TOutcoming, TKey>): ILinqBuilder<IGroup<TKey, TOutcoming>>
    {
        const seqTrans = this._transformThisSeq();
        return new AfterGroupByLinqBuilder(seqTrans, oxSelect);
    }

    go(): ReadonlyArray<TOutcoming>
    {
        return Array.from(this._transformThisSeq());
    }
}



export class AfterAggregateLinqBuilder<T, TAggr> implements IAfterAggregateLinqBuilder<TAggr>
{

    constructor(private _sequence: Iterable<T>, private readonly _oxTransformFunc: linqOps.OxAggregateFunc<T, TAggr, TAggr>, private readonly _oxInitialTransformFunc: linqOps.OxSelectFunc<T, TAggr>, private readonly _oxOnEmptyCollectionReturnFunc: Arg0Factory<TAggr>)
    {

    }

    go(): TAggr
    {
        return linqOps.aggregate(this._sequence, this._oxTransformFunc, this._oxOnEmptyCollectionReturnFunc, this._oxInitialTransformFunc);
    }


}



export class AfterGroupByLinqBuilder<T, TKey extends Primitive> extends AbstractBuilderImplementation<T, IGroup<TKey, T>>
{


    constructor(_sequence: Iterable<T>, private readonly _oxGroupByFunc: linqOps.OxSelectFunc<T, TKey>)
    {
        super(_sequence);
    }


    protected _transformThisSeq(): Iterable<IGroup<TKey, T>>
    {
        return linqOps.groupBy(this._sequence, this._oxGroupByFunc);
    }
}




export class AfterSelectLinqBuilder<T, TRes> extends AbstractBuilderImplementation<T, TRes>
{


    constructor(_sequence: Iterable<T>, private readonly _oxSelectFunc: linqOps.OxSelectFunc<T, TRes>)
    {
        super(_sequence);
    }


    protected _transformThisSeq(): Iterable<TRes>
    {
        return linqOps.select(this._sequence, this._oxSelectFunc);
    }
}


export interface IAfterAggregateLinqBuilder<TAggrRes>
{
    go(): TAggrRes;
}

export interface IAfterSingleLinqBuilder<T>
{
    go(): (T | MoreThanOneElementError<T> | NotFoundError<T>);
    goAssert(oxOnFailureFunc?: OxAlwaysThrowFunc): T;
}


export class AfterSingleLinqBuilder<T> implements IAfterSingleLinqBuilder<T>
{
    goAssert(oxOnFailureFunc: (OxAlwaysThrowFunc) = OxAlwaysThrowFunc): T
    {
        const res = linqOps.single(this._sequence, this._oxWherePred);
        if (!(res instanceof MoreThanOneElementError) && !(res instanceof NotFoundError))
        {
            return res;
        }
        else
        {

            return oxOnFailureFunc();
        }
    }


    constructor(private readonly _sequence: Iterable<T>, private readonly _oxWherePred?: linqOps.OxWherePredicate<T>)
    {

    }

    go(): (T | MoreThanOneElementError<T> | NotFoundError<T>)
    {
        return linqOps.single(this._sequence, this._oxWherePred);
    }


}


export class AfterWhereLinqBuilder<T> extends AbstractBuilderImplementation<T, T>
{


    constructor(_sequence: Iterable<T>, private readonly _oxWherFunc: linqOps.OxWherePredicate<T>)
    {
        super(_sequence);
    }


    protected _transformThisSeq(): Iterable<T>
    {
        return linqOps.where(this._sequence, this._oxWherFunc);
    }
}