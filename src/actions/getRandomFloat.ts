import { defineAction } from 'astro:actions';

const getRandomFloat = defineAction({
    handler: () => Math.random(),
});

export default getRandomFloat;
