import { test, expect, describe } from '@jest/globals';
import { Combat } from '../src/Classes/Skills';
import { assertAlmostEqual, sumQuadratic } from '../src/utility';

const createTestCombat = (baseLevel: number, baseEXP: number) =>
    new Combat(baseLevel, baseEXP);

/**
 * Tests Combat Skill implementation.
 */
describe('combat skill', () => {
    /**
     * Partitions
     * Base level 0, base level 1 < L < MAX, base level MAX
     * Base EXP 0, Base EXP > 0
     */

    test('base level 0, base exp 0', () => {
        const testSkill = createTestCombat(0, 0);

        expect(testSkill.level).toEqual(0);
        expect(testSkill.exp).toEqual(0);
        expect(testSkill.expCoefficient).toEqual(
            testSkill.calculateEXPToLevelUp()
        );

        testSkill.gainEXP(666);
        testSkill.calculateLevel();

        expect(testSkill.level > 0 || testSkill.expCoefficient).toBe(true);
        expect(testSkill.level > 0 || testSkill.expCoefficient > 666).toBe(
            true
        );
        expect(testSkill.calculateTNL() > 0).toBe(true);
    });

    test('base level 0, base exp > 0', () => {
        const testSkill = createTestCombat(0, 1e6);

        expect(testSkill.level > 0 || testSkill.expCoefficient > 1e6).toBe(
            true
        );
        expect(testSkill.exp).toEqual(1e6);
        expect(testSkill.calculateTNL() > 0).toBe(true);

        expect(testSkill.computeStatIncrease()).toEqual(30);
        expect(testSkill.computeSkillBonus()).toEqual(1.3);
    });

    test('base level 97, base exp = 0', () => {
        const testSkill = createTestCombat(97, 0);

        expect(testSkill.level).toEqual(97);
        expect(testSkill.exp).toEqual(0);
        expect(testSkill.expCoefficient * sumQuadratic(226)).toEqual(
            testSkill.calculateTNL()
        );

        expect(testSkill.computeStatIncrease()).toEqual(152);
        expect(() =>
            assertAlmostEqual(2.52, testSkill.computeSkillBonus(), 0.001)
        ).not.toThrow('AssertionError');

        expect(`${2.48} \u2192 ${2.52}`).toEqual(
            testSkill.displayBonusDifference(97)
        );
        expect(`${148} \u2192 ${152}`).toEqual(
            testSkill.displayStatDifference(97)
        );
    });

    test('base level 0, base exp = 1e10', () => {
        const testSkill = createTestCombat(0, 1e10);

        expect(testSkill.maxLevel).toEqual(testSkill.level);
        expect(testSkill.exp).toEqual(1e10);

        expect(testSkill.calculateTNL()).toEqual(0);
        expect(testSkill.calculateEXPToLevelUp()).toEqual(0);
    });
});
