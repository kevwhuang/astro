declare module 'astro:actions';
declare module 'astro:content';
declare module 'https://esm.sh/react';
declare module 'https://esm.sh/react-dom/server';

type Role = 'button' | 'contentinfo' | 'heading' | 'img' | 'link' | 'navigation' | 'textbox';

type User = { theme: 'dark' | 'light' };

interface Post {
    data: {
        author: string;
        categories: string[];
        description: string;
        image: {
            alt: null | string;
            src: null | string;
        };
        pubDate: Date;
        title: string;
    };
    digest: string;
    id: string;
}

interface Submission {
    id: number;
    producer: string;
    stream: string;
    title: string;
}
