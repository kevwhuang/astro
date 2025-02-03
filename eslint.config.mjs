import { eslint } from '@aephonics/config';

const overrides = [
    {
        files: ['**/*.{ts,tsx,astro}'],
        languageOptions: {
            globals: {
                Submission: true,
            },
        },
        rules: {
            'stylistic/no-mixed-operators': 0,
        },
    },
];

const ignores = [
    '.astro/**',
    '.netlify/**',
    'dist/**',
];

eslint.push(...overrides);
eslint.forEach(e => (e.ignores = ignores));

export default eslint;
