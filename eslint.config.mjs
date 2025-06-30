import eslint from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import tsEslintParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
import { fixupPluginRules } from '@eslint/compat';
import reactHooks from 'eslint-plugin-react-hooks';
import eslintSecurity from 'eslint-plugin-security';

export default tsEslint.config(
  eslint.configs.recommended,
  eslintSecurity.configs.recommended,
  ...tsEslint.configs.strict,
  ...tsEslint.configs.stylistic,
  prettierConfig,
  // eslintPluginPrettierRecommended,
  {
    files: ['**/*.{ts,mts,cts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    ignores: [
      '**/dist',
      '**/node_modules',
      '**/.next',
      '**/.yarn',
      '**/.vscode',
    ],
    languageOptions: {
      parser: tsEslintParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
        myCustomGlobal: 'readonly',
      },
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-unsafe-function-type': 'error',
      'no-console': ['error', { allow: ['warn', 'error', 'info', 'debug'] }],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...tsEslint.configs.disableTypeChecked,
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    files: ['apps/**/*.{ts,tsx}'],
    plugins: {
      react,
      'react-refresh': reactRefresh,
      'react-hooks': fixupPluginRules(reactHooks),
    },
    ...reactRecommended,
    ...reactJsxRuntime,
    languageOptions: {
      ...reactRecommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
          fixStyle: 'inline-type-imports',
        },
      ],
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
    },
  },
  {
    files: ['apps/app/**/*.{ts,tsx}'],
    plugins: {
      '@next/next': fixupPluginRules(nextPlugin),
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-duplicate-head': 'off',
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
);
