import { supabase } from './supabase';

/**
 * Month format: YYYY-MM-01
 */

export const getBudgetsForMonth = async (month) => {
    const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .eq('month', month);

    if (error) throw error;
    return data;
};

export const upsertBudget = async ({
    user_id,
    category,
    month,
    amount,
}) => {
    const { data, error } = await supabase
        .from('budgets')
        .upsert(
            { user_id, category, month, amount },
            { onConflict: 'user_id,category,month' }
        )
        .select()
        .single();

    if (error) throw error;
    return data;
};
