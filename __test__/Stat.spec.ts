import { statData } from '../src/Classes/Stats';
import { player } from '../src/Main';

export const blankSave = Object.assign({}, player);

describe('Base Stats', () => {
    const testPlayer = blankSave;
    test('Max Health', () => {
        expect(testPlayer.stats.health.value).toEqual(statData.health.baseStat);
    });
    // We expect current health to equal maximum health on initialization
    test('Current Health', () => {
        expect(testPlayer.stats.health.current).toEqual(
            statData.health.baseStat
        );
    });
    test('Base Strength', () => {
        expect(testPlayer.stats.strength.value).toEqual(
            statData.strength.baseStat
        );
    });
    test('Base Damage', () => {
        expect(testPlayer.stats.damage.value).toEqual(statData.damage.baseStat);
    });
    test('Base Defense', () => {
        expect(testPlayer.stats.defense.value).toEqual(
            statData.defense.baseStat
        );
    });
    test('Base Armor', () => {
        expect(testPlayer.stats.armor.value).toEqual(statData.armor.baseStat);
    });
    test('Base Critical Chance', () => {
        expect(testPlayer.stats.criticalChance.value).toEqual(
            statData.criticalChance.baseStat
        );
    });
    test('Base Critical Damage', () => {
        expect(player.stats.criticalDamage.value).toEqual(
            statData.criticalDamage.baseStat
        );
    });
});
