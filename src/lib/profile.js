import { supabase } from './supabase';

export const getMyProfile = async () => {
    const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .single();

    if (error) throw error;
    return data;
};
