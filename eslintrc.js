module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended'],
  overrides: [
    {
      files: ['*.page.ts'],
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            selector: 'CallExpression[callee.name="expect"]',
            message: '❌ Do not use assertions in Page Object files.',
          },
        ],
      },
    },
  ],
};