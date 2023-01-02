module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            tsx: true,
        },
    },
    plugins: ['prettier', 'import'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:nuxt/recommended',
        'plugin:vue/vue3-recommended',
        'prettier',
    ],
    overrides: [
        {
            files: [
                '**/src/pages/**/*.{js,ts,vue}',
                '**/src/components/**/*.{js,ts,vue}',
                '**/src/composables/**/*.{js,ts,vue}',
                '**/src/layouts/**/*.{js,ts,vue}',
            ],
            rules: {
                'no-undef': 'off',
            },
        },
    ],
    rules: {
        // js/ts
        'no-console': 'off',
        'no-unused-vars': 'off',
        'no-unused-expressions': 'off',
        'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
        camelcase: 'off',
        'no-var': 'error',
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-void': 'error',
        'prefer-const': ['warn', { destructuring: 'all', ignoreReadBeforeAssign: true }],
        'prefer-template': 'error',
        'object-shorthand': ['error', 'always', { ignoreConstructors: false, avoidQuotes: true }],
        'block-scoped-var': 'error',
        'no-constant-condition': ['error', { checkLoops: false }],
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': 'error',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': 'off',

        // vue
        'vue/no-v-html': 'off',
        'vue/require-default-prop': 'off',
        'vue/require-explicit-emits': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/require-prop-types': 'off',

        // prettier
        'prettier/prettier': 'error',

        // import
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    'object',
                    'type',
                ],

                pathGroups: [
                    {
                        pattern: 'vue',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: '@vue/**',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: 'ant-design-vue',
                        group: 'internal',
                    },
                ],
                pathGroupsExcludedImportTypes: ['type'],
            },
        ],
    },
};
