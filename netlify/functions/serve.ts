import type { Handler } from '@netlify/functions';

const handler: Handler = async event => {
    const { endpoint, method, payload } = JSON.parse(event.body!);
    const url = `${process.env.NETLIFY_BASE}${endpoint}`;
    const statusCode = 200;

    try {
        if (method === 'get') {
            const res = await fetch(url);
            const data = await res.json();

            return { body: JSON.stringify(data), statusCode };
        } else if (method === 'post') {
            const ops = {
                body: JSON.stringify(payload),
                headers: { 'content-type': 'application/json' },
                method,
            };

            const res = await fetch(url, ops);
            const data = await res.json();

            return { body: JSON.stringify(data), statusCode };
        }
    } catch {
        return { body: '', statusCode };
    }

    return { body: '', statusCode };
};

export { handler };
