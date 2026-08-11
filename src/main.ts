import { setOutput } from '@actions/core';
import { fetchActiveReleases } from './php-releases';
import { toReleaseOutputs } from './transform';

export interface RunDependencies {
    fetchFn?: typeof fetch;
    setOutputFn?: typeof setOutput;
    timeoutMs?: number;
}

export async function run({
    fetchFn = fetch,
    setOutputFn = setOutput,
    timeoutMs,
}: RunDependencies = {}): Promise<void> {
    const data = await fetchActiveReleases(fetchFn, timeoutMs);
    setOutputFn('releases', toReleaseOutputs(data));
}
