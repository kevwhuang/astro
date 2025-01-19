import React, { type FormEvent } from 'react';

interface Submission {
    id: number;
    producer: string;
    stream: string;
    title: string;
}

type Dispatch = React.Dispatch<Submission[]>;

function Form(): React.ReactElement {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [input, setInput] = React.useState('');
    const [submissions, setSubmissions] = React.useState<Submission[]>([]);

    React.useEffect(() => {
        void load(setSubmissions, null);
    }, []);

    async function handleSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();
        const payload = { stream: input };
        inputRef.current!.value = '';
        await load(setSubmissions, JSON.stringify(payload));
    }

    return (
        <section>
            <form onSubmit={e => handleSubmit(e) as unknown}>
                <label htmlFor="input-submissions">Link: </label>

                <input
                    ref={inputRef}
                    id="input-submissions"
                    onChange={e => setInput(e.target.value)}
                />
            </form>

            <div>
                {
                    submissions.map(e => (
                        <div key={e.id}>
                            <h1>{e.id}</h1>
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

async function load(setSubmissions: Dispatch, payload: string | null): Promise<void> {
    if (payload === '') return;

    const res = await fetch('/.netlify/functions/server', {
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

export default Form;
