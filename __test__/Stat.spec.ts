import { Health, statData } from '../src/Classes/Stats';

describe('Base Stats', () => {
    const testHealth = new Health();
    test('Max Health', () => {
        expect(testHealth.value).toEqual(statData.health.baseStat);
    });
    // We expect current health to equal maximum health on initialization
    test('Current Health', () => {
        expect(testHealth.current).toEqual(
            statData.health.baseStat
        );
    });
});
