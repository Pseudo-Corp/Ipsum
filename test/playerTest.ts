import assert from "assert";
import { player } from "../src/Main"

const createTestPlayer = () => {
    const playTest = player;
    return playTest
}

/**
 * Tests player object implementation
 **/
describe("player implementation", function() {
    it('base interactions', function() {
        const playerTest = createTestPlayer();

        assert.strictEqual(100, playerTest.stats.health.current);
        assert.strictEqual(100, playerTest.stats.health.value);

        playerTest.skills.idling.gainEXP(100000);
        playerTest.stats.health.updateStat();
        assert(100 < playerTest.stats.health.value);
        assert(0 < playerTest.skills.idling.calculateTNL());
        console.log(playerTest)
    });
})

