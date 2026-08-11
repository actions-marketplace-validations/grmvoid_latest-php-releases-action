# Latest PHP Releases Action

A GitHub Action to fetch a list of active PHP releases from [php.net](https://php.net).

## Outputs

### `releases`

A JSON array containing all active PHP release branches. Releases are sorted by version in ascending order. Each
release contains its version and the source archives reported by php.net.

```json
[
    {
        "version": "8.3.8",
        "sources": [
            {
                "filename": "php-8.3.8.tar.gz",
                "name": "PHP 8.3.8 (tar.gz)",
                "sha256": "0ebed9f1471871cf131e504629f3947f2acd38a655cc31b036f99efd0e3dbdeb",
                "date": "06 Jun 2024"
            }
        ]
    }
]
```

## Example usage

```yaml
name: PHP Latest Releases

on:
    pull_request:
    push:

jobs:
    latest-releases:
        runs-on: ubuntu-latest
        outputs:
            releases: ${{ steps.get-latest-releases.outputs.releases }}
        steps:
            - name: Checkout
              uses: actions/checkout@v4
            - uses: sxbrsky/latest-php-releases-action@v1
              id: get-latest-releases

    print-php-version:
        needs: ['latest-releases']
        runs-on: ubuntu-latest
        strategy:
            matrix:
                releases: ${{ fromJson(needs.latest-releases.outputs.releases) }}
        steps:
            - name: Checkout
              uses: actions/checkout@v4
            - run: echo "php-${{ matrix.releases.version }}"
```

## License

This project is licensed under the [MIT License](LICENSE).
