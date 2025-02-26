import type { APIRoute } from 'astro';

import supabase from '@/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ cookies, request }) => {
    const form = await request.formData();

    const { data, error } = await supabase.auth.signInWithPassword({
        email: String(form.get('email')),
        password: String(form.get('password')),
    });

    if (error?.status === 400) return new Response(null, { status: 400 });
    if (error) return new Response(null, { status: 500 });

    cookies.set('sb-access-token', data.session.access_token, { path: '/' });
    cookies.set('sb-refresh-token', data.session.refresh_token, { path: '/' });

    return new Response;
};
