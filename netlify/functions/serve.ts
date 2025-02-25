import type { HandlerEvent, HandlerResponse } from '@netlify/functions';

async function handler(event: HandlerEvent): Promise<HandlerResponse> {
    const { endpoint, method, payload } = JSON.parse(event.body!);
    const url = `${process.env.NETLIFY_BASE}${endpoint}`;
    const statusCode = 200;

    try {
        if (method === 'get') {
            const res = await fetch(url);
            const json = await res.json();

            return { body: JSON.stringify(json), statusCode };
        } else if (method === 'post') {
            const ops = {
                body: JSON.stringify(payload),
                headers: { 'content-type': 'application/json' },
                method,
            };

            const res = await fetch(url, ops);
            const json = await res.json();

            return { body: JSON.stringify(json), statusCode };
        }
    } catch { }

    return { body: '', statusCode };
}

export { handler };
