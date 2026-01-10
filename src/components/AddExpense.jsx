import { useState } from 'react';
import { addExpense } from '../lib/expenses';
import { useAuth } from '../context/AuthContext';
import { inputClass, primaryButton } from './ui';
import { CATEGORIES } from '../constants/categories';

const AddExpense = ({ onAdd }) => {
    const { user } = useAuth();
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        item_name: '',
        category: '',
        amount: '',
        expense_date: '',
        note: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!form.item_name || !form.category || !form.expense_date) {
            setError('Item name, category, and date are required');
            return;
        }

        try {
            setSaving(true);

            await addExpense({
                user_id: user.id,
                item_name: form.item_name,
                category: form.category,
                amount: Number(form.amount),
                expense_date: form.expense_date,
                note: form.note || null,
            });

            setForm({
                item_name: '',
                category: '',
                amount: '',
                expense_date: '',
                note: '',
            });

            onAdd();
        } catch (err) {
            setError(err.message || 'Failed to add expense');
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* Main inputs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {/* Item */}
                <input
                    className={inputClass}
                    name="item_name"
                    placeholder="Item name *"
                    value={form.item_name}
                    onChange={handleChange}
                />

                {/* Category */}
                <select
                    className={inputClass}
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                >
                    <option value="">Select category *</option>
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                {/* Amount */}
                <input
                    className={inputClass}
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                />

                {/* Date */}
                <input
                    className={inputClass}
                    type="date"
                    name="expense_date"
                    value={form.expense_date}
                    onChange={handleChange}
                />
            </div>

            {/* Note */}
            <textarea
                className={inputClass}
                name="note"
                placeholder="Note (optional – where / why)"
                rows={2}
                value={form.note}
                onChange={handleChange}
            />

            {/* Actions */}
            <div className="flex items-center gap-4">
                <button
                    type="submit"
                    disabled={saving}
                    className={`${primaryButton} disabled:opacity-60`}
                >
                    {saving ? 'Adding…' : 'Add Expense'}
                </button>

                {error && (
                    <span className="text-sm text-red-500">
                        {error}
                    </span>
                )}
            </div>
        </form>
    );
};

export default AddExpense;
