import type { ActiveReleases, PhpRelease, PhpSource } from './types';

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requireRecord(value: unknown, path: string): Record<string, unknown> {
    if (!isRecord(value)) {
        throw new Error(`Invalid PHP releases response: ${path} must be an object`);
    }

    return value;
}

function requireString(value: unknown, path: string): string {
    if (typeof value !== 'string') {
        throw new Error(`Invalid PHP releases response: ${path} must be a string`);
    }

    return value;
}

function parseSource(value: unknown, path: string): PhpSource {
    const source = requireRecord(value, path);

    return {
        filename: requireString(source.filename, `${path}.filename`),
        name: requireString(source.name, `${path}.name`),
        sha256: requireString(source.sha256, `${path}.sha256`),
        date: requireString(source.date, `${path}.date`),
    };
}

function parseRelease(value: unknown, path: string): PhpRelease {
    const release = requireRecord(value, path);

    if (typeof release.announcement !== 'boolean') {
        throw new Error(`Invalid PHP releases response: ${path}.announcement must be a boolean`);
    }
    if (!Array.isArray(release.tags) || !release.tags.every((tag) => typeof tag === 'string')) {
        throw new Error(`Invalid PHP releases response: ${path}.tags must be an array of strings`);
    }
    if (!Array.isArray(release.source)) {
        throw new Error(`Invalid PHP releases response: ${path}.source must be an array`);
    }

    return {
        announcement: release.announcement,
        tags: release.tags,
        date: requireString(release.date, `${path}.date`),
        source: release.source.map((source, index) => parseSource(source, `${path}.source[${index}]`)),
        version: requireString(release.version, `${path}.version`),
    };
}

export function parseActiveReleases(value: unknown): ActiveReleases {
    const majors = requireRecord(value, 'root');
    const result: ActiveReleases = {};

    for (const [major, releasesValue] of Object.entries(majors)) {
        const releases = requireRecord(releasesValue, major);
        result[major] = {};

        for (const [minor, release] of Object.entries(releases)) {
            result[major][minor] = parseRelease(release, `root[${JSON.stringify(major)}][${JSON.stringify(minor)}]`);
        }
    }

    return result;
}
