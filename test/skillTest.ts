import assert from "assert";
import { Combat } from "../src/Classes/Skills"
import { assertAlmostEqual, sumQuadratic } from "../src/utility";

const createTestCombat = (baseLevel: number, baseEXP: number):Combat => {
    return new Combat(baseLevel, baseEXP)
}

/**
 * Tests Combat Skill implementation.
 */
 describe('combat skill', function() {
    /**
     * Partitions
     * Base level 0, base level 1 < L < MAX, base level MAX
     * Base EXP 0, Base EXP > 0
     */

    it('base level 0, base exp 0', function() {
        const testSkill = createTestCombat(0, 0);
        assert.strictEqual(0, testSkill.level);
        assert.strictEqual(0, testSkill.exp);
        assert.strictEqual(testSkill.expCoefficient, testSkill.calculateEXPToLevelUp());

        testSkill.gainEXP(666);
        testSkill.calculateLevel();

        assert(testSkill.level > 0 || testSkill.expCoefficient > 666);
        assert(testSkill.calculateTNL() > 0);
    })

    it('base level 0, base exp > 0', function () {
        const testSkill = createTestCombat(0, 1e6);
        assert(testSkill.level > 0 || testSkill.expCoefficient > 1e6);
        assert.strictEqual(1e6, testSkill.exp);
        assert(testSkill.calculateTNL() > 0);

        assert.strictEqual(30, testSkill.computeStatIncrease());
        assert.strictEqual(1.30, testSkill.computeSkillBonus());
    })

    it('base level 97, base exp = 0', function () {
        const testSkill = createTestCombat(97, 0);
        assert.strictEqual(97, testSkill.level);
        assert.strictEqual(0, testSkill.exp);
        assert.strictEqual(testSkill.expCoefficient * sumQuadratic(226), testSkill.calculateTNL())

        assert.strictEqual(152, testSkill.computeStatIncrease());
        assertAlmostEqual(2.52, testSkill.computeSkillBonus(), 0.001);

        assert.strictEqual(`${2.48} \u2192 ${2.52}`, testSkill.displayBonusDifference(97))
        assert.strictEqual(`${148} \u2192 ${152}`, testSkill.displayStatDifference(97))
    })

    it('base level 0, base exp = 1e10', function() {
        const testSkill = createTestCombat(0, 1e10);
        assert.strictEqual(testSkill.maxLevel, testSkill.level);
        assert.strictEqual(1e10, testSkill.exp);

        assert.strictEqual(0, testSkill.calculateTNL());
        assert.strictEqual(0, testSkill.calculateEXPToLevelUp());
    })
});