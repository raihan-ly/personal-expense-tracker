import { signOut } from '../lib/auth';
import { useTheme } from '../context/ThemeContext';

const PageLayout = ({
    children,
    title,
    showHeader = true,
    showActions = true,
}) => {
    const { toggleTheme } = useTheme();

    return (
        <div
            className="min-h-screen flex items-center justify-center p-6"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
            <div
                className="w-full max-w-5xl backdrop-blur-xl rounded-2xl shadow-xl p-6"
                style={{
                    backgroundColor: 'var(--bg-glass)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                }}
            >


                {/* 🔹 OPTIONAL GLOBAL HEADER */}
                {showHeader && (
                    <header className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-heading">
                            {title}
                        </h2>

                        {showActions && (
                            <div className="flex gap-2">
                                <button
                                    onClick={toggleTheme}
                                    className="
                    px-3 py-1 rounded-lg
                    bg-slate-200 dark:bg-white/10
                    hover:bg-slate-300 dark:hover:bg-white/20
                    transition
                  "
                                >
                                    Theme
                                </button>

                                <button
                                    onClick={signOut}
                                    className="
                    px-3 py-1 rounded-lg
                    bg-red-500/80 hover:bg-red-500
                    text-white transition
                  "
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </header>
                )}

                {children}
            </div>
        </div>
    );
};

export default PageLayout;
