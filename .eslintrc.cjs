module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'prettier',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['@typescript-eslint'],
};
