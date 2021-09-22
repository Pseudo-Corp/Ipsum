import assert from "assert"
import {describe, it} from "mocha"
import { format } from "../src/utility";

/**
 * Tests format.
 */
describe('format', function() {
    /** partitions
     * Negative (<0), Zero (=0), Small (0 < n < 1), Medium (1 <= n <= 999), Large (n > 999)
     * Zero Accuracy (=0), Positive Accuracy (>0)
     */
    it('Large, Accuracy = 0', function() {
        assert.strictEqual("3,141", format(1000 * Math.PI, 0));
    });
    it('Small, Accuracy = 2', function () {
        assert.strictEqual("0.22", format(0.219999999999999, 2))
    })
    it('Small, Accuracy = 4', function () {
        assert.strictEqual("0.0030", format(0.003, 4))
    })
    it('Zero, Accuracy = 10', function () {
        assert.strictEqual("0", format(0, 10))
    })
    it('Negative, Accuracy = 4', function() {
        assert.strictEqual("-1.4242", format(-1.4242425, 4))
    })
    it('Large, Accuracy = 2', function() {
        assert.strictEqual("999,999,999.32", format(Math.pow(10, 9) - 1 + 0.3245, 2))
    })
    it('Medium, Accuracy = 3', function() {
        assert.strictEqual("421.235", format(421.235141, 3))
    })
});

