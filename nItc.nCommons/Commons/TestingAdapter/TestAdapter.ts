import * as nCommons from './../Commons'
import { SomeConstructorWithKnownResult } from "../aliases/SomeCtrOrFactory";
import { Primitive, NonPrimitive } from "../Commons.TypeAliases";


export interface IPrimitiveValueAssertions
{
    assert(value: boolean): void;
}


export interface ITypeAssertions
{
    isConstructedFromElseFail<T1Expected extends NonPrimitive>(value: NonPrimitive, constructor: SomeConstructorWithKnownResult<T1Expected>): value is T1Expected;

    //isOfTypeElseFail<TExtended extends TBase, TBase>(value: TBase, oxIsOfType: (xVal: TBase) => boolean): value is TExtended;
    isOfTypeElseFail<TExtended extends TBase, TBase>(value: TExtended, oxIsOfType: (xVal: TBase) => boolean): value is TExtended;
    failOtherTypeWasExpected<TExpected>(res: Object): never;
}


export interface IExistentialAssertions
{
    isNotNullElseFail<T>(obj: (T | null)): obj is T | never;
    isNullElseFail<T>(obj: (T | null)): obj is null;

    isUndefinedElseFail<T>(obj: (T | undefined)): obj is undefined | never;
    isDefinedElseFail<T>(obj: (T | undefined)): obj is T | never;

}


export interface ICollectionAssertions
{
    assertIsEmpty<T>(array: ReadonlyArray<T>): void;
    assertIsNotEmpty<T>(array: ReadonlyArray<T>): void;

    assertLenIs<T>(expectedLen: number, array: ReadonlyArray<T>): void;
    assertSameLengthAndReturnIt<T>(expected: ReadonlyArray<T>, actual: ReadonlyArray<T>): number;
    assertSameLengthEqualTo<T>(expectedLength: number, ...arrays: (ReadonlyArray<T>)[]): void;

    getSingleItemElseFail<T>(array: ReadonlyArray<T>): T;
}

export interface IEqualityAssertions
{
    assertAreEqual<T extends Primitive>(expected: T, actual: T): (void | never);
    assertAreEquivalent<T, TProp extends keyof T>(obj1: T, obj2: T, propertiesToCompare: (ReadonlyArray<TProp> | "TakeAllLeft" | "TakeAllRight")): void
    assertIsVariant<TDerived extends TSuper, TSuper extends (string | number | boolean)>(expected: TDerived, actual: TSuper): (void);
    assertSameInstances<T>(obj1: T, obj2: T, msg?: string): (void);
    assertDifferentInstances<T>(obj1: T, obj2: T): (void);
}


export interface ITestOutput
{
    //Nie wiem, jak to zaimplementowac: powinno przerwac test i oglosic sukces
    //success(): never;
    fail(): never;
}


export type ITestingFramework = (IPrimitiveValueAssertions & ITypeAssertions & IExistentialAssertions & ICollectionAssertions & IEqualityAssertions & ITestOutput);


