import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
    const url = `${import.meta.env.NETLIFY_BASE}${import.meta.env.PUBLIC_ENDPOINT}`;
    const res = await fetch(url);
    const json = await res.json();

    return new Response(JSON.stringify(json));
};
