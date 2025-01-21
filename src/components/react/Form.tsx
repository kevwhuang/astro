import React from 'react';

import '@/styles/components/react/Form.scss';

type Dispatch = React.Dispatch<Submission[]>;

async function load(payload: string | null, setSubmissions: Dispatch): Promise<void> {
    if (payload === '') return;

    const res = await fetch('/.netlify/functions/serve', {
        body: JSON.stringify({
            endpoint: import.meta.env.PUBLIC_ENDPOINT,
            method: payload ? 'post' : 'get',
            payload: payload ? { stream: payload } : null,
        }),
        method: 'post',
    });

    const data = await res.json();

    if (Array.isArray(data)) {
        data.sort((a, b) => b.id - a.id);
        setSubmissions(data);
    } else if ('id' in data) {
        await load(null, setSubmissions);
    }
}

function Form(): React.ReactElement {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [input, setInput] = React.useState('');
    const [submissions, setSubmissions] = React.useState<Submission[]>([]);

    React.useEffect(() => {
        void load(null, setSubmissions);
    }, []);

    async function handleSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        const payload = input;
        inputRef.current!.value = '';
        await load(payload, setSubmissions);
    }

    return (
        <section className="form">
            <form onSubmit={e => handleSubmit(e) as unknown}>
                <label htmlFor="input-submission">Link</label>

                <input
                    ref={inputRef}
                    aria-label="submission link"
                    id="input-submission"
                    maxLength={200}
                    onChange={e => setInput(e.target.value)}
                />
            </form>

            {
                submissions.map(e => (
                    <div key={e.id}>
                        <h4>{e.id}</h4>
                        <p>{e.producer}</p>
                        <a href={e.stream} rel="noreferrer" target="_blank">{e.title}</a>
                    </div>
                ))
            }
        </section>
    );
}

export default Form;
