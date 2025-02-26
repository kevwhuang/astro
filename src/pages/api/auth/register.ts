import type { APIRoute } from 'astro';

import supabase from '@/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    const form = await request.formData();

    const { error } = await supabase.auth.signUp({
        email: String(form.get('email')),
        password: String(form.get('password')),
    });

    if (error?.status === 422) return new Response(null, { status: 422 });
    if (error?.status === 429) return new Response(null, { status: 429 });
    if (error) return new Response(null, { status: 500 });

    return new Response;
};
