import type { Config, Context } from '@netlify/edge-functions';
import React from 'https://esm.sh/react';
import { renderToReadableStream } from 'https://esm.sh/react-dom/server';

const config: Config = { path: '/geo' };

async function handler(res: Response, context: Context): Promise<Response> {
    if (!React) return new Response;

    const { geo } = context;

    const jsx = (
        <html lang="en-us">
            <body>
                <title>Geo</title>
                <a href="/">Home</a>
                <p>{geo.latitude}, {geo.longitude}</p>
                <p>{geo.city}, {geo.subdivision?.name}, {geo.country?.name}</p>
            </body>
        </html>
    );

    return new Response(await renderToReadableStream(jsx), {
        headers: { 'content-type': 'text/html' },
        status: 200,
    });
}

export default handler;
export { config };
