import { eslint } from '@aephonics/config';

const overrides = [
    {
        files: ['**/*.{ts,tsx,astro}'],
        languageOptions: {
            globals: {
                MyType: true,
            },
        },
    },
];

const ignores = [
    '.astro/**',
    '.dist/**',
];

eslint.push(...overrides);
eslint.forEach(e => (e.ignores = ignores));

export default eslint;
