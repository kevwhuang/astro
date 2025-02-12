import type { Config, Context } from '@netlify/edge-functions';
import React from 'https://esm.sh/react';
import { renderToReadableStream } from 'https://esm.sh/react-dom/server';

const config: Config = { path: '/geo' };

async function handler(res: Response, context: Context): Promise<Response> {
    if (!React) return new Response;

    const { geo } = context;

    const style = {
        a: {
            color: '#669bbc',
            textDecoration: 'none',
        },
        body: {
            background: '#fdf0d5',
            margin: 0,
        },
        main: {
            OverflowX: 'hidden',
            fontFamily: 'sf pro display, helvetica neue, sans-serif',
            fontSize: '25.89px',
            lineHeight: 1.5,
            padding: '25.89px',
        },
        p: {
            marginBlock: 0,
        },
    };

    const jsx = (
        <html lang="en-us">
            <head>
                <title>Geo</title>
                <meta charSet="utf-8" />
                <meta content="#fdf0d5" name="theme-color" />
                <meta content="Kevin Huang" name="author" />
                <meta content="ie=edge" httpEquiv="x-ua-compatible" />
                <meta content="noindex" name="robots" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
            </head>

            <body style={style.body}>
                <main style={style.main}>
                    <section>
                        <a href="/" style={style.a}>Home</a>
                        <p style={style.p}>{geo.latitude}, {geo.longitude}</p>

                        <p style={style.p}>
                            {geo.city}, {geo.subdivision?.name}, {geo.country?.name}
                        </p>
                    </section>
                </main>
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
