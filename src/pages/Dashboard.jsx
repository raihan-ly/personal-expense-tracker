import { useEffect, useState } from 'react';
import { getMyExpenses } from '../lib/expenses';
import AddExpense from '../components/AddExpense';
import ExpenseList from '../components/ExpenseList';
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

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        getMyExpenses().then(setExpenses);
    }, []);

    const reload = () => getMyExpenses().then(setExpenses);

    return (
        <>
            <AddExpense onAdd={reload} />
            <ExpenseList expenses={expenses} onChange={reload} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <CategoryPieChart
                    data={categoryChartData(getCategoryTotals(expenses))}
                />
                <MonthlyTrendChart
                    data={monthlyChartData(getMonthlyExpenses(expenses))}
                />
            </div>
        </>
    );
};

export default Dashboard;
