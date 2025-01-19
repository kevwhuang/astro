export async function handler(event) {
    const { endpoint, method, payload } = JSON.parse(event.body);
    const url = `${process.env.NETLIFY_BASE}${endpoint}`;

    if (method === 'get') {
        const res = await fetch(url);
        const data = await res.json();

        return { body: JSON.stringify(data), statusCode: 200 };
    } else if (method === 'post') {
        const res = await fetch(url, {
            body: JSON.stringify(payload),
            headers: { 'content-type': 'application/json' },
            method,
        });

        const data = await res.json();

        return { body: JSON.stringify(data), statusCode: 200 };
    }

    return { body: '', statusCode: 200 };
}
