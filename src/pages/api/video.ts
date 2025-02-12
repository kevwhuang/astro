import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
    const url = `${import.meta.env.SUPABASE_URL}/storage/v1/object/public/resources/video.mov`;
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();

    return new Response(buffer, {
        headers: {
            'cache-control': 'max-age:86400',
            'content-type': 'video/mp4',
        },
    });
};
