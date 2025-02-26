import { eslint } from '@aephonics/config';

const ignores = [
    '.astro/**',
    '.netlify/**',
    'dist/**',
];

const globals = [
    'Post',
    'Role',
    'Submission',
    'User',
];

const overrides = [
    {
        files: ['**/*.{ts,tsx,astro}'],
        languageOptions: { globals: Object.fromEntries(globals.map(e => [e, true])) },
    }, {
        files: ['**/*.astro'],
        rules: { 'consistent-return': 0 },
    },
];

eslint.push(...overrides);
eslint.forEach(e => (e.ignores = ignores));

export default eslint;
