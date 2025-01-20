export async function handler(event) {
    const { endpoint, method, payload } = JSON.parse(event.body);
    const url = `${process.env.NETLIFY_BASE}${endpoint}`;
    const statusCode = 200;

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

    return { body: '', statusCode };
}
