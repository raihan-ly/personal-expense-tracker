const AppLoader = ({ label = 'Loading…' }) => {
    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
            <div
                className="
        flex flex-col items-center gap-4
        backdrop-blur-xl
        rounded-2xl
        px-8 py-6
        shadow-lg
        "
                style={{
                    backgroundColor: 'var(--bg-glass)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                }}
            >
                {/* Spinner */}
                <div
                    className="w-10 h-10 rounded-full border-4 animate-spin"
                    style={{
                        borderColor: 'var(--accent-soft)',
                        borderTopColor: 'var(--accent-primary)',
                    }}
                />

                {/* Label */}
                <p className="text-sm tracking-wide text-[color:var(--text-secondary)]">
                    {label}
                </p>
            </div>
        </div>
    );
};

export default AppLoader;
