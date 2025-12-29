import { supabase } from './supabase';

// Admin-only: enforced via RLS
export const getAllExpenses = async () => {
    const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('expense_date', { ascending: false });

    if (error) throw error;
    return data;
};
