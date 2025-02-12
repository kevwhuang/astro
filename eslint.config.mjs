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
];

const overrides = [
    {
        files: ['**/*.{ts,tsx,astro}'],
        languageOptions: { globals: Object.fromEntries(globals.map(e => [e, true])) },
        rules: {},
    },
];

eslint.push(...overrides);
eslint.forEach(e => (e.ignores = ignores));

export default eslint;
