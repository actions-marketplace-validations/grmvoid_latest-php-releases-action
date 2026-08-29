import type { ActiveReleases } from '../src/types';

export const activeReleases: ActiveReleases = {
    '8': {
        '8.3': {
            announcement: true,
            tags: ['security'],
            date: '01 Jan 2026',
            source: [
                {
                    filename: 'php-8.3.10.tar.xz',
                    name: 'PHP 8.3.10 (tar.xz)',
                    sha256: 'abc123',
                    date: '01 Jan 2026',
                },
            ],
            version: '8.3.10',
        },
        '8.2': {
            announcement: true,
            tags: [],
            date: '01 Jan 2026',
            source: [],
            version: '8.2.20',
        },
    },
};
