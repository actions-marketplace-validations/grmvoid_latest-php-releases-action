export interface PhpSource {
    filename: string;
    name: string;
    sha256: string;
    date: string;
}

export interface PhpRelease {
    announcement: boolean;
    tags: string[];
    date: string;
    source: PhpSource[];
    version: string;
}

export type ActiveReleases = Record<string, Record<string, PhpRelease>>;

export interface ReleaseOutput {
    version: string;
    sources: PhpSource[];
}
