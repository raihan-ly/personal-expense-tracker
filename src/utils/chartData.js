export const categoryChartData = (categoryTotals) => {
    return Object.entries(categoryTotals).map(([category, amount]) => ({
        name: category,
        value: amount,
    }));
};

export const monthlyChartData = (monthlyTotals) => {
    return Object.entries(monthlyTotals).map(([month, amount]) => ({
        month,
        amount,
    }));
};
