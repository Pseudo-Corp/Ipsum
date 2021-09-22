import { describe, test, expect } from '@jest/globals';
import { format } from '../src/utility';

/**
 * Tests format.
 */
describe('format', () => {
    /*
     * partitions
     * Negative (<0), Zero (=0), Small (0 < n < 1), Medium (1 <= n <= 999), Large (n > 999)
     * Zero Accuracy (=0), Positive Accuracy (>0)
     */

    test('Large, Accuracy = 0', () => {
        expect(format(1000 * Math.PI, 0)).toEqual('3,141');
    });

    test('Small, Accuracy = 2', () => {
        expect(format(0.219999999999999, 2)).toEqual('0.22');
    });

    test('Small, Accuracy = 4', () => {
        expect(format(0.003, 4)).toEqual('0.0030');
    });

    test('Zero, Accuracy = 10', () => {
        expect(format(0, 10)).toEqual('0');
    });

    test('Negative, Accuracy = 4', () => {
        expect(format(-1.4242425, 4)).toEqual('-1.4242');
    });

    test('Large, Accuracy = 2', () => {
        expect(format(Math.pow(10, 9) - 1 + 0.3245, 2)).toEqual(
            '999,999,999.32'
        );
    });

    test('Medium, Accuracy = 3', () => {
        expect(format(421.235141, 3)).toEqual('421.235');
    });
});
