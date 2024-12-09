import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  {
    ignores: ['**/node_modules/', '**/dist/', '**/*.d.mts', '**/*.d.ts', '**/*.js', '**/generated/**/*'],
  },
  ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'),
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      perfectionist,
      prettier,
    },
    rules: {
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],
      'eol-last': 'error',
      'no-console': 1,
      'no-constant-binary-expression': 'error',
      'perfectionist/sort-classes': [
        'error',
        {
          groups: [
            'static-property',
            'private-property',
            'property',
            'constructor',
            'method',
            'private-method',
            'static-method',
          ],
        },
      ],
      'perfectionist/sort-enums': ['error'],
      'perfectionist/sort-interfaces': ['error'],
      'perfectionist/sort-intersection-types': ['error'],
      'perfectionist/sort-object-types': ['error'],
      'perfectionist/sort-objects': ['error'],
      'perfectionist/sort-union-types': ['error'],
      'prettier/prettier': 'error',
    },
  },
];
