import { describe, expect, it, vi } from 'vitest';
import { ACTIVE_RELEASES_URL, fetchActiveReleases } from '../src/php-releases';
import { activeReleases } from './fixtures';

describe('fetchActiveReleases', () => {
    it('fetches and validates active releases', async () => {
        const fetchFn = vi.fn<typeof fetch>().mockResolvedValue(
            new Response(JSON.stringify(activeReleases), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            })
        );

        await expect(fetchActiveReleases(fetchFn)).resolves.toEqual(activeReleases);
        expect(fetchFn).toHaveBeenCalledWith(
            ACTIVE_RELEASES_URL,
            expect.objectContaining({ method: 'GET', signal: expect.any(AbortSignal) })
        );
    });

    it('reports an HTTP failure', async () => {
        const fetchFn = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 503 }));

        await expect(fetchActiveReleases(fetchFn)).rejects.toThrow('HTTP 503');
    });

    it('reports invalid JSON', async () => {
        const fetchFn = vi.fn<typeof fetch>().mockResolvedValue(new Response('{', { status: 200 }));

        await expect(fetchActiveReleases(fetchFn)).rejects.toThrow('Invalid JSON');
    });

    it('adds endpoint context to network failures', async () => {
        const fetchFn = vi.fn<typeof fetch>().mockRejectedValue(new Error('connection refused'));

        await expect(fetchActiveReleases(fetchFn)).rejects.toThrow(
            `Failed to fetch active PHP releases from ${ACTIVE_RELEASES_URL}: connection refused`
        );
    });
});
