const InsightCard = ({ label, value, tone = 'neutral' }) => {
    const toneClass =
        tone === 'good'
            ? 'text-green-500'
            : tone === 'bad'
                ? 'text-red-500'
                : 'text-[color:var(--text-primary)]';

    return (
        <div
            className="
        p-4 rounded-xl
        border
        bg-white/60 dark:bg-white/5
    "
            style={{ borderColor: 'var(--border-color)' }}
        >
            <p className="text-sm opacity-70">{label}</p>
            <p className={`text-lg font-semibold ${toneClass}`}>
                {value}
            </p>
        </div>
    );
};

export default InsightCard;
