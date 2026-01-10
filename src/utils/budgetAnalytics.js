import { getMonthKey } from './month';

/**
 * expenses: [{ category, amount, expense_date }]
 * budgets:  [{ category, amount, month }]
 * monthKey: 'YYYY-MM'
 */
export const calculateBudgetVsActual = ({
    expenses,
    budgets,
    monthKey,
}) => {
    const actualByCategory = {};
    const budgetByCategory = {};

    // 1️⃣ Aggregate actual spending
    for (const e of expenses) {
        if (getMonthKey(e.expense_date) !== monthKey) continue;

        actualByCategory[e.category] =
            (actualByCategory[e.category] || 0) + Number(e.amount);
    }

    // 2️⃣ Read budgets
    for (const b of budgets) {
        if (getMonthKey(b.month) !== monthKey) continue;

        budgetByCategory[b.category] = Number(b.amount);
    }

    // 3️⃣ Merge into final structure
    const categories = new Set([
        ...Object.keys(actualByCategory),
        ...Object.keys(budgetByCategory),
    ]);

    const rows = [];
    let totalActual = 0;
    let totalBudget = 0;

    categories.forEach((category) => {
        const actual = actualByCategory[category] || 0;
        const budget = budgetByCategory[category] || 0;
        const variance = budget - actual;

        totalActual += actual;
        totalBudget += budget;

        rows.push({
            category,
            actual,
            budget,
            variance,
            status:
                variance < 0
                    ? 'over'
                    : variance > 0
                        ? 'under'
                        : 'exact',
        });
    });

    return {
        rows,
        totalActual,
        totalBudget,
        totalVariance: totalBudget - totalActual,
    };
};
