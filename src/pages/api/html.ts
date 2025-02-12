import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
    const res = await fetch('https://k-astro.netlify.app/edge');
    const data = await res.text();

    return new Response(data, { headers: { 'content-type': 'text/html' } });
};
