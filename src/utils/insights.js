export const deriveInsights = (budgetAnalytics) => {
    const { rows, totalActual, totalBudget, totalVariance } =
        budgetAnalytics;

    const over = rows.filter((r) => r.variance < 0);
    const under = rows.filter((r) => r.variance > 0);

    const mostOver = over.sort(
        (a, b) => a.variance - b.variance
    )[0];

    const mostUnder = under.sort(
        (a, b) => b.variance - a.variance
    )[0];

    let status = 'On track';
    if (totalVariance < 0) status = 'Overspending';
    if (totalVariance > 0) status = 'Under budget';

    return {
        totalActual,
        totalBudget,
        totalVariance,
        status,
        mostOver,
        mostUnder,
    };
};
