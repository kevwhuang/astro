declare module 'astro:content';
declare module 'https://esm.sh/react';
declare module 'https://esm.sh/react-dom/server';

type Role = 'button' | 'contentinfo' | 'heading' | 'img' | 'link' | 'navigation' | 'textbox';

interface Submission {
    id: number;
    producer: string;
    stream: string;
    title: string;
}
