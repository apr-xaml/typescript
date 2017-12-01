import * as ops from "./LinqOperations";
import { IAfterSingleLinqBuilder, IAfterAggregateLinqBuilder } from "./AbstractBuilderImplementation/AbstractBuilderImplementation";
import { OxSelect2Func, OxSelectFunc, OxWherePredicate } from "./LinqOperations";
import { Primitive } from "../Commons.TypeAliases";


export interface ILinqBuilder<T>
{
    where(oxWhere: OxWherePredicate<T>): ILinqBuilder<T>;
    select<TOutputNext>(oxSelect: OxSelectFunc<T, TOutputNext>): ILinqBuilder<TOutputNext>;
    groupBy<TKey extends Primitive>(oxSelect: OxSelectFunc<T, TKey>): ILinqBuilder<IGroup<TKey,T>>;

    aggregate<TAggr>(oxTransformFunc: OxSelect2Func<T, TAggr, TAggr>, oxInitialTransformFunc: OxSelectFunc<T, TAggr>, oxOnEmptySequenceReturn: () => TAggr): IAfterAggregateLinqBuilder<TAggr>;
    single(oxWhere?: OxWherePredicate<T>): IAfterSingleLinqBuilder<T>;

    go(): ReadonlyArray<T>;
}




export interface IGroup<TKey, TValue>
{
    readonly key: TKey;
    readonly values: ReadonlyArray<TValue>;
}