module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
    ],
    overrides: [
    {
      files: ['*.ts'], // Your TypeScript files extension
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
    }
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      'prefer-const': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      'no-magic-numbers': ['warn', { ignore: [0,1,2] } ],
    }
};