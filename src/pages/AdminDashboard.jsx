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

const AdminDashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const { toggleTheme } = useTheme();

    useEffect(() => {
        getAllExpenses().then(setExpenses);
    }, []);

    const total = getTotalExpense(expenses);
    const categoryData = categoryChartData(getCategoryTotals(expenses));
    const monthlyData = monthlyChartData(getMonthlyExpenses(expenses));

    return (
        <>
            <div className="mb-6">
                <p className="text-sm opacity-70">Total Platform Spend</p>
                <p className="text-2xl font-bold">₹{total}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CategoryPieChart data={categoryData} />
                <MonthlyTrendChart data={monthlyData} />
            </div>
        </>
    );
};

export default AdminDashboard;
