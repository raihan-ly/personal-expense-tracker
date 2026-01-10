import { supabase } from './supabase';

/**
 * Normalized auth error
 */
const createAuthError = (code) => ({ code });

export const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        throw createAuthError(error.message);
    }

    // Supabase security behavior:
    // identities.length === 0 → user already exists
    if (data?.user && data.user.identities?.length === 0) {
        throw createAuthError('EMAIL_EXISTS');
    }

    return { user: data.user };
};

export const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw createAuthError(error.message);
    }

    return { user: data.user };
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw createAuthError(error.message);
    }
};

export const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/dashboard`,
            queryParams: {
                prompt: 'select_account',
            },
        },
    });

    if (error) {
        throw createAuthError('GOOGLE_AUTH_FAILED');
    }
};
