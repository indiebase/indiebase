import eslint from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import tslintParser from '@typescript-eslint/parser';
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { fixupPluginRules } from '@eslint/compat';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
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
      parser: tslintParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        // project: [
        //   './tsconfig.json',
        //   './first_party/*/tsconfig.json',
        //   './packages/*/tsconfig.json',
        //   './community/tsconfig.json',
        //   './apps/*/tsconfig.json',
        // ],
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
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/ban-types': [
        'error',
        {
          types: {
            Function: false,
          },
          extendDefaults: true,
        },
      ],
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...tseslint.configs.disableTypeChecked,
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
