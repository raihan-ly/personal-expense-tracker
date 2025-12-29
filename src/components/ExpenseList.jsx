import { useState } from 'react';
import { updateExpense, deleteExpense } from '../lib/expenses';
import {
    inputClass,
    primaryButton,
    secondaryButton,
    dangerButton,
} from './ui';
import { CATEGORIES } from '../constants/categories';
import { formatAmount } from '../utils/formatAmount';


// small local helper
const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const ExpenseList = ({ expenses, onChange }) => {
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        item_name: '',
        category: '',
        amount: '',
        expense_date: '',
        note: '',
    });

    if (!expenses.length) {
        return <p className="text-sm opacity-70">No expenses yet.</p>;
    }

    const startEdit = (expense) => {
        setEditingId(expense.id);
        setForm({
            item_name: expense.item_name,
            category: expense.category,
            amount: expense.amount,
            expense_date: expense.expense_date,
            note: expense.note || '',
        });
    };


    const saveEdit = async (id) => {
        await updateExpense(id, {
            item_name: form.item_name,
            category: form.category,
            amount: Number(form.amount),
            expense_date: form.expense_date,
            note: form.note || null,
        });

        setEditingId(null);
        onChange();
    };

    return (
        <ul className="space-y-3">
            {expenses.map((e) => (
                <li
                    key={e.id}
                    className="
            p-4 rounded-xl border transition
            flex flex-col gap-2
          "
                    style={{
                        backgroundColor: 'var(--surface-primary)',
                        borderColor: 'var(--border-color)',
                    }}
                >
                    {editingId === e.id ? (
                        /* ================= EDIT MODE ================= */
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                {/* Item name */}
                                <input
                                    className={inputClass}
                                    placeholder="Item name"
                                    value={form.item_name}
                                    onChange={(ev) =>
                                        setForm({ ...form, item_name: ev.target.value })
                                    }
                                />

                                {/* Category (controlled dropdown) */}
                                <select
                                    className={inputClass}
                                    value={form.category}
                                    onChange={(ev) =>
                                        setForm({ ...form, category: ev.target.value })
                                    }
                                >
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
                                    placeholder="Amount"
                                    value={form.amount}
                                    onChange={(ev) =>
                                        setForm({ ...form, amount: ev.target.value })
                                    }
                                />

                                {/* Date */}
                                <input
                                    className={inputClass}
                                    type="date"
                                    value={form.expense_date}
                                    onChange={(ev) =>
                                        setForm({ ...form, expense_date: ev.target.value })
                                    }
                                />
                            </div>

                            {/* Note */}
                            <textarea
                                className={inputClass}
                                rows={2}
                                placeholder="Note (optional)"
                                value={form.note}
                                onChange={(ev) =>
                                    setForm({ ...form, note: ev.target.value })
                                }
                            />

                            <div className="flex gap-2">
                                <button
                                    onClick={() => saveEdit(e.id)}
                                    className={primaryButton}
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditingId(null)}
                                    className={secondaryButton}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        /* ================= VIEW MODE ================= */
                        <>
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <p className="font-medium">
                                        {e.item_name}{' '}
                                        <span className="text-sm opacity-70">
                                            ({e.category})
                                        </span>
                                    </p>

                                    <p className="text-sm opacity-70">
                                        📅 {formatDate(e.expense_date)}
                                    </p>

                                    {e.note && (
                                        <p className="text-sm mt-1">
                                            📝 {e.note}
                                        </p>
                                    )}
                                </div>

                                <p className="font-semibold whitespace-nowrap">
                                    ₹{formatAmount(e.amount)}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => startEdit(e)}
                                    className={secondaryButton}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteExpense(e.id).then(onChange)}
                                    className={dangerButton}
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default ExpenseList;
