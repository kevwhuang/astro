import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
    const res = await fetch('https://k-astro.netlify.app/edge');
    const text = await res.text();

    return new Response(text, { headers: { 'content-type': 'text/html' } });
};
