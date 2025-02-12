import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
    const res = await fetch('https://picsum.photos/500.webp');
    const buffer = await res.arrayBuffer();

    return new Response(buffer, { headers: { 'content-type': 'image/webp' } });
};
