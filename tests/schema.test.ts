import { describe, expect, it } from 'vitest';
import { parseActiveReleases } from '../src/schema';
import { activeReleases } from './fixtures';

describe('parseActiveReleases', () => {
    it('accepts and returns a valid response', () => {
        expect(parseActiveReleases(activeReleases)).toEqual(activeReleases);
    });

    it('rejects a response with an invalid release date', () => {
        const invalid = structuredClone(activeReleases) as unknown as Record<string, Record<string, { date: unknown }>>;
        invalid['8']['8.3'].date = new Date();

        expect(() => parseActiveReleases(invalid)).toThrow('root["8"]["8.3"].date must be a string');
    });

    it('rejects a response with an invalid source', () => {
        const invalid = structuredClone(activeReleases) as unknown as Record<
            string,
            Record<string, { source: unknown }>
        >;
        invalid['8']['8.3'].source = null;

        expect(() => parseActiveReleases(invalid)).toThrow('root["8"]["8.3"].source must be an array');
    });
});
