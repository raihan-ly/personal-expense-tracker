import { useEffect, useState } from 'react';
import { getMyExpenses } from '../lib/expenses';
import AddExpense from '../components/AddExpense';
import ExpenseList from '../components/ExpenseList';
import { getBudgetsForMonth } from '../lib/budgets';
import { calculateBudgetVsActual } from '../utils/budgetAnalytics';
import { getMonthKey } from '../utils/month';
import BudgetForm from '../components/BudgetForm';
import MonthSelector from '../components/MonthSelector';
import BudgetVsActualTable from '../components/BudgetVsActualTable';
import { deriveInsights } from '../utils/insights';
import InsightCard from '../components/InsightCard';
import { formatAmount } from '../utils/formatAmount';

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
    const [month, setMonth] = useState(getMonthKey(new Date()));
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        getMyExpenses().then(setExpenses);
    }, []);

    const loadBudgets = () =>
        getBudgetsForMonth(`${month}-01`).then(setBudgets);

    const filteredExpenses = expenses.filter(
        (e) => getMonthKey(e.expense_date) === month
    );

    const budgetAnalytics = calculateBudgetVsActual({
        expenses,
        budgets,
        monthKey: month,
    });

    useEffect(() => {
        loadBudgets();
    }, [month]);


    const insights = deriveInsights(budgetAnalytics);

    const reload = () => getMyExpenses().then(setExpenses);

    return (
        <>
            <div className="space-y-4">
                <AddExpense onAdd={reload} />
                <ExpenseList expenses={expenses} onChange={reload} />
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <InsightCard
                    label="Total Budget"
                    value={`₹${formatAmount(insights.totalBudget)}`}
                />

                <InsightCard
                    label="Total Spent"
                    value={`₹${formatAmount(insights.totalActual)}`}
                />

                <InsightCard
                    label="Overall Status"
                    value={insights.status}
                    tone={
                        insights.status === 'Overspending'
                            ? 'bad'
                            : insights.status === 'Under budget'
                                ? 'good'
                                : 'neutral'
                    }
                />

                {insights.mostOver && (
                    <InsightCard
                        label="Top Overspend"
                        value={`${insights.mostOver.category} (−₹${formatAmount(
                            Math.abs(insights.mostOver.variance)
                        )})`}
                        tone="bad"
                    />
                )}

                {insights.mostUnder && (
                    <InsightCard
                        label="Top Under Budget"
                        value={`${insights.mostUnder.category} (+₹${formatAmount(
                            Math.abs(insights.mostUnder.variance)
                        )})`}
                        tone="good"
                    />
                )}
            </div>

            <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold tracking-tight">
                        Budget vs Actual
                    </h3>

                    <MonthSelector
                        value={month}
                        onChange={setMonth}
                    />
                </div>

                {/* Budget input */}
                <BudgetForm
                    month={`${month}-01`}
                    onSaved={loadBudgets}
                />

                {/* Budget comparison */}
                <BudgetVsActualTable data={budgetAnalytics} />
            </div>



            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <CategoryPieChart data={categoryChartData(getCategoryTotals(filteredExpenses))} />

                <MonthlyTrendChart data={monthlyChartData(getMonthlyExpenses(filteredExpenses))} />
            </div>
        </>
    );
};

export default Dashboard;
