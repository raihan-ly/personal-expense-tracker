export const getTotalExpense = (expenses) => {
    return expenses.reduce((sum, e) => sum + Number(e.amount), 0);
};

export const getCategoryTotals = (expenses) => {
    return expenses.reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
        return acc;
    }, {});
};

export const getMonthlyExpenses = (expenses) => {
    return expenses.reduce((acc, e) => {
        const month = e.expense_date.slice(0, 7); // YYYY-MM
        acc[month] = (acc[month] || 0) + Number(e.amount);
        return acc;
    }, {});
};
