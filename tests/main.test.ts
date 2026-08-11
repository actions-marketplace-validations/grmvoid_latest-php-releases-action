import { describe, expect, it, vi } from 'vitest';
import { run } from '../src/main';
import { activeReleases } from './fixtures';

describe('run', () => {
    it('sets the releases output', async () => {
        const fetchFn = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify(activeReleases)));
        const setOutputFn = vi.fn();

        await run({ fetchFn, setOutputFn });

        expect(setOutputFn).toHaveBeenCalledWith('releases', [
            { version: '8.2.20', sources: [] },
            { version: '8.3.10', sources: activeReleases['8']['8.3'].source },
        ]);
    });
});
