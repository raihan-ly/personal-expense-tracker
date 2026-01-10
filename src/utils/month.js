export const getMonthKey = (dateStr) => {
    const d = new Date(dateStr);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    return `${y}-${m}`;
};

export const toMonthDate = (dateStr) => {
    // returns YYYY-MM-01
    const [y, m] = getMonthKey(dateStr).split('-');
    return `${y}-${m}-01`;
};
