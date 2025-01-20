import React from 'react';

import '@/styles/components/react/Form.scss';

type Dispatch = React.Dispatch<Submission[]>;

async function load(setSubmissions: Dispatch, payload: string | null): Promise<void> {
    if (payload === '') return;

    const res = await fetch('/.netlify/functions/serve', {
        body: JSON.stringify({
            endpoint: import.meta.env.PUBLIC_ENDPOINT,
            method: payload ? 'post' : 'get',
            payload: payload ? JSON.parse(payload) : null,
        }),
        method: 'post',
    });

    const data = await res.json();

    if (Array.isArray(data)) {
        data.sort((a: Submission, b: Submission) => b.id - a.id);
        setSubmissions(data);
    } else if ('id' in data) {
        await load(setSubmissions, null);
    }
}

function Form(): React.ReactElement {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [input, setInput] = React.useState('');
    const [submissions, setSubmissions] = React.useState<Submission[]>([]);

    React.useEffect(() => {
        void load(setSubmissions, null);
    }, []);

    async function handleSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        const payload = { stream: input };
        inputRef.current!.value = '';
        await load(setSubmissions, JSON.stringify(payload));
    }

    return (
        <section className="form">
            <form className="form__main" onSubmit={e => handleSubmit(e) as unknown}>
                <label htmlFor="input-submissions">Link</label>

                <input
                    ref={inputRef}
                    aria-label="submission url"
                    id="input-submissions"
                    maxLength={200}
                    onChange={e => setInput(e.target.value)}
                />
            </form>

            <div className="form__results">
                {
                    submissions.map(e => (
                        <div key={e.id}>
                            <h3>{e.id}</h3>
                            <p>{e.producer}</p>
                            <p>{e.title}</p>
                            <p>{e.stream}</p>
                        </div>
                    ))
                }
            </div>
        </section>
    );
}

export default Form;
