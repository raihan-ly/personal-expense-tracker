import { useEffect, useState } from 'react';
import { getAllExpenses } from '../lib/admin';
import {
    getTotalExpense,
    getCategoryTotals,
    getMonthlyExpenses,
} from '../utils/analytics';
import {
    categoryChartData,
    monthlyChartData,
} from '../utils/chartData';
import CategoryPieChart from '../components/CategoryPieChart';
import MonthlyTrendChart from '../components/MonthlyTrendChart';
import { signOut } from '../lib/auth';
import { useTheme } from '../context/ThemeContext';
import { formatAmount } from '../utils/formatAmount';
import MonthSelector from '../components/MonthSelector';
import { getMonthKey } from '../utils/month';

const AdminDashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const { toggleTheme } = useTheme();
    const [month, setMonth] = useState(getMonthKey(new Date()));
    const [scope, setScope] = useState('month'); // 'month' | 'all'

    useEffect(() => {
        getAllExpenses().then(setExpenses);
    }, []);

    const scopedExpenses = scope === 'all' ? expenses : expenses.filter((e) => getMonthKey(e.expense_date) === month);
    const total = getTotalExpense(scopedExpenses);
    const categoryData = categoryChartData(getCategoryTotals(scopedExpenses));
    const monthlyData = monthlyChartData(getMonthlyExpenses(scopedExpenses));

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setScope('month')}
                        className={`px-3 py-1 rounded-lg transition ${scope === 'month'
                            ? 'bg-sky-500 text-white'
                            : 'bg-slate-200 dark:bg-white/10'
                            }`}
                    >
                        Month
                    </button>

                    <button
                        onClick={() => setScope('all')}
                        className={`px-3 py-1 rounded-lg transition ${scope === 'all'
                            ? 'bg-sky-500 text-white'
                            : 'bg-slate-200 dark:bg-white/10'
                            }`}
                    >
                        All Time
                    </button>
                </div>

                {scope === 'month' && (
                    <MonthSelector value={month} onChange={setMonth} />
                )}
            </div>

            {/* Overview */}
            <div className="mb-8">
                <p className="text-sm opacity-70">Total Platform Spend</p>
                <p className="text-2xl font-bold">₹{formatAmount(total)}</p>
            </div>

            {/* Empty state */}
            {!expenses.length ? (
                <p className="text-sm opacity-70">
                    No expense data available for the selected scope.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CategoryPieChart data={categoryData} />
                    <MonthlyTrendChart data={monthlyData} />
                </div>
            )}
        </>
    );
};

export default AdminDashboard;
