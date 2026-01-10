import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { upsertBudget } from '../lib/budgets';
import { CATEGORIES } from '../constants/categories';
import { inputClass, primaryButton } from './ui';

const BudgetForm = ({ month, onSaved }) => {
    const { user } = useAuth();
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!category || !amount) {
            setError('Category and amount are required');
            return;
        }

        try {
            setSaving(true);
            await upsertBudget({
                user_id: user.id,
                category,
                month,
                amount: Number(amount),
            });

            setCategory('');
            setAmount('');
            onSaved?.();
        } catch (err) {
            setError(err.message || 'Failed to save budget');
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <select
                    className={inputClass}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select category</option>
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <input
                    className={inputClass}
                    type="number"
                    placeholder="Budget amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <button
                    type="submit"
                    disabled={saving}
                    className={primaryButton}
                >
                    {saving ? 'Saving…' : 'Save Budget'}
                </button>
            </div>

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </form>
    );
};

export default BudgetForm;
