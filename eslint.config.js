import js from '@eslint/js'
import globals from 'globals'
import pluginTs from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

import stylistic from '@stylistic/eslint-plugin'

import {
  defineConfig
} from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: {
      '@stylistic': stylistic,
      js,
    },
    extends: ['js/recommended'],

    languageOptions: {
      globals: globals.browser
    },
    rules: {
      '@stylistic/indent': ['error', 2, {
        SwitchCase: 1,
      }],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/comma-spacing': ['error', {
        'before': false, 'after': true
      }],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/block-spacing': ['error'],
      '@stylistic/object-curly-newline': ['error', 'always'],
      '@stylistic/space-before-blocks': ['error'],
      '@stylistic/no-trailing-spaces': ['error'],
    },
  },
  pluginTs.configs.recommended,
  pluginVue.configs['flat/recommended'],
  {
    name: 'Vue',
    files: ['**/*.vue'],
    rules: {
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 3
        },
        multiline: {
          max: 1
        }
      }],
    },
    languageOptions: {
      parserOptions: {
        parser: pluginTs.parser
      }
    }
  },
  {
    ignores: ['dist/*']
  },
]);
