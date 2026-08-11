import { parseActiveReleases } from './schema';
import type { ActiveReleases } from './types';

export const ACTIVE_RELEASES_URL = 'https://www.php.net/releases/active';
export const DEFAULT_TIMEOUT_MS = 10_000;

export async function fetchActiveReleases(
    fetchFn: typeof fetch = fetch,
    timeoutMs = DEFAULT_TIMEOUT_MS
): Promise<ActiveReleases> {
    let response: Response;

    try {
        response = await fetchFn(ACTIVE_RELEASES_URL, {
            method: 'GET',
            headers: { Accept: 'application/json' },
            signal: AbortSignal.timeout(timeoutMs),
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to fetch active PHP releases from ${ACTIVE_RELEASES_URL}: ${message}`, {
            cause: error,
        });
    }

    if (!response.ok) {
        throw new Error(
            `Failed to fetch active PHP releases from ${ACTIVE_RELEASES_URL}: HTTP ${response.status} ${response.statusText}`
        );
    }

    let data: unknown;
    try {
        data = await response.json();
    } catch (error: unknown) {
        throw new Error(`Invalid JSON returned by ${ACTIVE_RELEASES_URL}`, { cause: error });
    }

    return parseActiveReleases(data);
}
