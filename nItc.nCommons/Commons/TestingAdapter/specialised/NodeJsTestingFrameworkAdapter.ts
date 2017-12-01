import { ITestingFramework } from "../TestAdapter";
import * as  _assert from 'assert';
import { NonPrimitive, Primitive, isPrimitive } from "../../Commons.TypeAliases";
import { _FAIL } from "../../Commons.Assertions";
import { getAllProperties } from "../../Commons.Reflection";
import { SomeConstructorWithKnownResult } from "../../aliases/SomeCtrOrFactory";


export class NodeJsTestingFrameworkAdapter implements ITestingFramework
{


    assert(value: boolean): void
    {
        _assert.ok(value);
    }


    //I don't get this declaration really...'
    isConstructedFromElseFail<T1Expected extends NonPrimitive>(value: NonPrimitive, constructor: SomeConstructorWithKnownResult<T1Expected>): value is T1Expected
    {
        const isOfType = (value instanceof constructor);

        if (isOfType)
        {
            return true;
        }
        else
        {
            _assert.fail("Assertion 'isConstructedFromElseFail' failed");
            return _FAIL();
        }
    }


    //TODO: repair when typescript compiler is properly implemented
    //isOfTypeElseFail<TExtended extends object>(value: object , oxIsOfType: (xVal: object) => boolean): value is TExtended
    isOfTypeElseFail<TExtended extends TBase, TBase>(value: TExtended, oxIsOfType: (xVal: TBase) => boolean): value is TExtended
    {
        return oxIsOfType(value);
    }


    failOtherTypeWasExpected(res: Object): never
    {
        _assert.fail("Assertion 'failOtherTypeWasExpected' failed");
        return _FAIL();
    }

    isNotNullElseFail<T>(obj: T | null): obj is T
    {
        if (obj != null)
        {
            return true;
        }
        else
        {
            _assert.fail("Assertion 'isNotNullElseFail' failed");
            return _FAIL();
        }
    }
    isNullElseFail<T>(obj: T | null): obj is null
    {
        _assert.strictEqual(obj, null);
        return true;
    }
    isUndefinedElseFail<T>(obj: T | undefined): obj is undefined
    {
        _assert.strictEqual(obj, undefined);
        return true;
    }
    isDefinedElseFail<T>(obj: T | undefined): obj is T
    {
        _assert.notStrictEqual(obj, undefined);
        return true;
    }
    assertIsEmpty<T>(array: ReadonlyArray<T>): void
    {
        _assert.strictEqual(array.length, 0);
    }
    assertIsNotEmpty<T>(array: ReadonlyArray<T>): void
    {
        _assert.notStrictEqual(array.length, 0);
    }
    getSingleItemElseFail<T>(array: ReadonlyArray<T>): T
    {
        _assert.strictEqual(array.length, 1);
        const [res] = array;
        return res;
    }
    assertLenIs<T>(expectedLen: number, array: ReadonlyArray<T>): void
    {
        _assert.strictEqual(array.length, expectedLen);
    }
    assertSameLengthAndReturnIt<T>(expected: ReadonlyArray<T>, actual: ReadonlyArray<T>): number
    {
        _assert.strictEqual(actual.length, expected.length);
        return expected.length;
    }

    assertSameLengthEqualTo<T>(expectedLength: number, ...arrays: (ReadonlyArray<T>)[]): void
    {
        for (let iArr in arrays)
        {
            _assert.strictEqual(iArr.length, expectedLength);
        }
    }

    assertAreEqual<T extends Primitive>(expected: T, actual: T): (void | never)
    {
        _assert.strictEqual(actual, expected);
    }

    assertAreEquivalent<T, TProp extends keyof T>(obj1: T, obj2: T, propertiesToCompare: (ReadonlyArray<TProp> | "TakeAllLeft" | "TakeAllRight")): void
    {
        function _getPropsToCompare()
        {
            if (propertiesToCompare == "TakeAllLeft")
            {
                return getAllProperties(obj1);
            }
            else if (propertiesToCompare == "TakeAllRight")
            {
                return getAllProperties(obj2);
            }
            else
            {
                return propertiesToCompare;
            }
        }

        const props = _getPropsToCompare();

        for (var iPropName in props)
        {
            const propVal1 = obj1[iPropName as TProp];
            const propVal2 = obj2[iPropName as TProp];


            if (isPrimitive(propVal1) && isPrimitive(propVal2))
            {
                this.assertAreEqual(propVal1, propVal2);
            }
            else
            {
                this.assertSameInstances(propVal1, propVal2);
            }

        }


    }

    assertSameInstances<T>(obj1: T, obj2: T): void
    {
        _assert.ok(obj1 === obj2);
    }

    assertDifferentInstances<T>(obj1: T, obj2: T): void
    {
        _assert.ok(obj1 !== obj2);
    }

    assertIsVariant<TDerived extends TSuper, TSuper extends (string | number | boolean)>(expected: TDerived, actual: TSuper): void
    {
        _assert.strictEqual(actual, expected);
    }



    fail(): never
    {
        _assert.fail("Asssertion - failed");
        return _FAIL();
    }


}