import { getMonthKey } from '../utils/month';

const MonthSelector = ({ value, onChange }) => {
    const currentMonth = getMonthKey(new Date());

    const handleChange = (e) => {
        const newValue = e.target.value;

        // Defensive guards
        if (!newValue) return;
        if (newValue === value) return;

        onChange(newValue);
    };

    return (
        <input
            type="month"
            value={value}
            max={currentMonth}
            onChange={handleChange}
            className="px-3 py-2 rounded-lg border border-[color:var(--border-color)] bg-white/70 dark:bg-white/10 text-[color:var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
        />
    );
};

export default MonthSelector;
