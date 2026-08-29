import { describe, expect, it } from 'vitest';
import { toReleaseOutputs } from '../src/transform';
import { activeReleases } from './fixtures';

describe('toReleaseOutputs', () => {
    it('maps releases to the public output and sorts versions', () => {
        expect(toReleaseOutputs(activeReleases)).toEqual([
            { version: '8.2.20', sources: [] },
            { version: '8.3.10', sources: activeReleases['8']['8.3'].source },
        ]);
    });

    it('does not mutate the input', () => {
        const input = structuredClone(activeReleases);

        toReleaseOutputs(input);

        expect(input).toEqual(activeReleases);
    });
});
