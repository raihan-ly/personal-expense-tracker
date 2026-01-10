import { formatAmount } from '../utils/formatAmount';

const BudgetVsActualTable = ({ data }) => {
    if (!data.rows.length) {
        return (
            <p className="text-sm opacity-70">
                No budget or expense data for this month.
            </p>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="text-left border-b border-[color:var(--border-color)]">
                        <th className="py-2">Category</th>
                        <th className="py-2">Budget</th>
                        <th className="py-2">Actual</th>
                        <th className="py-2">Variance</th>
                    </tr>
                </thead>

                <tbody>
                    {data.rows.map((row) => (
                        <tr
                            key={row.category}
                            className="border-b border-[color:var(--border-color)]"
                        >
                            <td className="py-2">{row.category}</td>
                            <td className="py-2">
                                ₹{formatAmount(row.budget)}
                            </td>

                            <td className="py-2">
                                ₹{formatAmount(row.actual)}
                            </td>

                            <td
                                className={`py-2 font-medium ${row.status === 'over'
                                        ? 'text-red-500'
                                        : row.status === 'under'
                                            ? 'text-green-500'
                                            : 'opacity-70'
                                    }`}
                            >
                                {row.variance < 0 ? '−' : '+'}₹{formatAmount(Math.abs(row.variance))}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BudgetVsActualTable;
