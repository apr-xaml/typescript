"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _assert = require("assert");
const Commons_TypeAliases_1 = require("../../Commons.TypeAliases");
const Commons_Assertions_1 = require("../../Commons.Assertions");
const Commons_Reflection_1 = require("../../Commons.Reflection");
class NodeJsTestingFrameworkAdapter {
    assert(value) {
        _assert.ok(value);
    }
    isConstructedFromElseFail(value, constructor) {
        const isOfType = (value instanceof constructor);
        if (isOfType) {
            return true;
        }
        else {
            _assert.fail("Assertion 'isConstructedFromElseFail' failed");
            return Commons_Assertions_1._FAIL();
        }
    }
    isOfTypeElseFail(value, oxIsOfType) {
        return oxIsOfType(value);
    }
    failOtherTypeWasExpected(res) {
        _assert.fail("Assertion 'failOtherTypeWasExpected' failed");
        return Commons_Assertions_1._FAIL();
    }
    isNotNullElseFail(obj) {
        if (obj != null) {
            return true;
        }
        else {
            _assert.fail("Assertion 'isNotNullElseFail' failed");
            return Commons_Assertions_1._FAIL();
        }
    }
    isNullElseFail(obj) {
        _assert.strictEqual(obj, null);
        return true;
    }
    isUndefinedElseFail(obj) {
        _assert.strictEqual(obj, undefined);
        return true;
    }
    isDefinedElseFail(obj) {
        _assert.notStrictEqual(obj, undefined);
        return true;
    }
    assertIsEmpty(array) {
        _assert.strictEqual(array.length, 0);
    }
    assertIsNotEmpty(array) {
        _assert.notStrictEqual(array.length, 0);
    }
    getSingleItemElseFail(array) {
        _assert.strictEqual(array.length, 1);
        const [res] = array;
        return res;
    }
    assertLenIs(expectedLen, array) {
        _assert.strictEqual(array.length, expectedLen);
    }
    assertSameLengthAndReturnIt(expected, actual) {
        _assert.strictEqual(actual.length, expected.length);
        return expected.length;
    }
    assertSameLengthEqualTo(expectedLength, ...arrays) {
        for (let iArr in arrays) {
            _assert.strictEqual(iArr.length, expectedLength);
        }
    }
    assertAreEqual(expected, actual) {
        _assert.strictEqual(actual, expected);
    }
    assertAreEquivalent(obj1, obj2, propertiesToCompare) {
        function _getPropsToCompare() {
            if (propertiesToCompare == "TakeAllLeft") {
                return Commons_Reflection_1.getAllProperties(obj1);
            }
            else if (propertiesToCompare == "TakeAllRight") {
                return Commons_Reflection_1.getAllProperties(obj2);
            }
            else {
                return propertiesToCompare;
            }
        }
        const props = _getPropsToCompare();
        for (var iPropName in props) {
            const propVal1 = obj1[iPropName];
            const propVal2 = obj2[iPropName];
            if (Commons_TypeAliases_1.isPrimitive(propVal1) && Commons_TypeAliases_1.isPrimitive(propVal2)) {
                this.assertAreEqual(propVal1, propVal2);
            }
            else {
                this.assertSameInstances(propVal1, propVal2);
            }
        }
    }
    assertSameInstances(obj1, obj2) {
        _assert.ok(obj1 === obj2);
    }
    assertDifferentInstances(obj1, obj2) {
        _assert.ok(obj1 !== obj2);
    }
    assertIsVariant(expected, actual) {
        _assert.strictEqual(actual, expected);
    }
    fail() {
        _assert.fail("Asssertion - failed");
        return Commons_Assertions_1._FAIL();
    }
}
exports.NodeJsTestingFrameworkAdapter = NodeJsTestingFrameworkAdapter;
//# sourceMappingURL=NodeJsTestingFrameworkAdapter.js.map