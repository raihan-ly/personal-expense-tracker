import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

const COLORS = [
    '#38bdf8', // sky-400
    '#22c55e', // green-500
    '#f97316', // orange-500
    '#a855f7', // purple-500
    '#ef4444', // red-500
    '#eab308', // yellow-500
];

const CategoryPieChart = ({ data }) => {
    const { theme } = useTheme();

    if (!data.length) return null;

    const isDark = theme === 'dark';

    const tooltipBg = isDark ? '#020617' : '#ffffff';
    const tooltipBorder = isDark ? '#334155' : '#cbd5f5';
    const tooltipText = isDark ? '#e5e7eb' : '#0f172a';
    const labelColor = isDark ? '#e5e7eb' : '#0f172a';

    return (
        <div
            className="
        bg-white/70 dark:bg-white/10
        backdrop-blur-xl
        border border-slate-200 dark:border-white/20
        p-4 rounded-xl
      "
        >
            <h3 className="mb-3 font-semibold">
                Spending by Category
            </h3>

            <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        innerRadius={45}
                        stroke={isDark ? '#0f172a' : '#ffffff'}
                        strokeWidth={2}
                        isAnimationActive={false}
                        activeIndex={undefined}
                        label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip
                        contentStyle={{
                            backgroundColor: tooltipBg,
                            border: `1px solid ${tooltipBorder}`,
                            borderRadius: '8px',
                            color: tooltipText,
                        }}
                        labelStyle={{
                            color: '#38bdf8',
                            fontWeight: 600,
                        }}
                        itemStyle={{
                            color: tooltipText,
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryPieChart;
