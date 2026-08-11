import type { ActiveReleases, ReleaseOutput } from './types';

function compareVersions(left: string, right: string): number {
    return left.localeCompare(right, undefined, { numeric: true });
}

export function toReleaseOutputs(data: ActiveReleases): ReleaseOutput[] {
    return Object.values(data)
        .flatMap((releases) => Object.values(releases))
        .map(({ version, source }) => ({ version, sources: source }))
        .sort((left, right) => compareVersions(left.version, right.version));
}
