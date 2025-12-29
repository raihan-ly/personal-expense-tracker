import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

const MonthlyTrendChart = ({ data }) => {
    const { theme } = useTheme();

    if (!data.length) return null;

    const isDark = theme === 'dark';

    const axisColor = isDark ? '#94a3b8' : '#475569'; // slate-400 / slate-600
    const gridColor = isDark ? '#334155' : '#e2e8f0';
    const tooltipBg = isDark ? '#020617' : '#ffffff';
    const tooltipBorder = isDark ? '#334155' : '#cbd5f5';
    const tooltipText = isDark ? '#e5e7eb' : '#0f172a';

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
                Monthly Spending Trend
            </h3>

            <ResponsiveContainer width="100%" height={260}>
                <LineChart data={data}>
                    <XAxis
                        dataKey="month"
                        stroke={axisColor}
                        tick={{ fill: axisColor, fontSize: 12 }}
                    />
                    <YAxis
                        stroke={axisColor}
                        tick={{ fill: axisColor, fontSize: 12 }}
                    />

                    <Tooltip
                        cursor={{ stroke: '#38bdf8', strokeWidth: 1 }}
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

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={isDark ? '#334155' : '#e2e8f0'}
                    />

                    <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#38bdf8"
                        strokeWidth={1}                
                        strokeOpacity={1}
                        strokeLinecap="round"
                        dot={{ r: 4, fill: '#38bdf8' }}
                        activeDot={{
                            r: 4,
                            fill: '#38bdf8',
                            stroke: '#0ea5e9',
                            strokeWidth: 2,
                        }}
                        isAnimationActive={false}
                    />


                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MonthlyTrendChart;
