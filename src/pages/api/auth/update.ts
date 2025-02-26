import type { APIRoute } from 'astro';

import supabase from '@/supabase';

export const prerender = false;

export const PATCH: APIRoute = async ({ request }) => {
    const form = await request.formData();

    const { error } = await supabase.auth.updateUser({
        password: String(form.get('password')),
    });

    if (error?.status === 422) return new Response(error.code, { status: 422 });
    if (error) return new Response(null, { status: 500 });

    return new Response;
};
