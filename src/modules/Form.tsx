import React from 'react';

import { FidgetSpinner } from 'react-loader-spinner';
import toast from 'react-hot-toast';

import Toaster from '@/components/Toaster';

import '@/styles/modules/Form.scss';

type Dispatch = React.Dispatch<Submission[]>;

async function load(payload: string | null, setSubmissions: Dispatch): Promise<void> {
    if (payload === '') return Promise.reject(Error());

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
    } else {
        return Promise.reject(Error());
    }

    return Promise.resolve();
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
        setInput('');

        try {
            await toast.promise(load(payload, setSubmissions), {
                error: 'Check URL',
                loading: 'Processing...',
                success: 'Success',
            });
        } catch { }
    }

    if (submissions.length === 0) {
        return (
            <section className="m-form">
                <FidgetSpinner />
            </section>
        );
    }

    return (
        <section className="m-form">
            <Toaster />

            <form onSubmit={e => handleSubmit(e) as unknown}>
                <input aria-label="submit link" type="submit" value="&#x2705;" />

                <input
                    ref={inputRef}
                    aria-label="enter link"
                    maxLength={200}
                    onChange={e => setInput(e.target.value)}
                />
            </form>

            {
                submissions.map(e => (
                    <div key={e.id} className="m-form__card">
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
