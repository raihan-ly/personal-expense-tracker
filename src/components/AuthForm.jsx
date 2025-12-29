import { useState } from 'react';
import { signIn, signUp } from '../lib/auth';
import { signInWithGoogle } from '../lib/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyProfile } from '../lib/profile';

const inputClass = `
  w-full px-3 py-2 rounded-lg
  bg-white dark:bg-white/10
  border border-slate-300 dark:border-white/20
  text-slate-900 dark:text-white
  placeholder-slate-400
  focus:outline-none focus:ring-2 focus:ring-sky-500
`;

const AuthForm = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isSignup) {
                await signUp(email, password);
            } else {
                await signIn(email, password);
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authLoading) return;
        if (!user) return;

        getMyProfile()
            .then((profile) => {
                if (profile.role === 'admin') {
                    navigate('/admin', { replace: true });
                } else {
                    navigate('/dashboard', { replace: true });
                }
            })
            .catch(() => {
                // fallback safety
                navigate('/dashboard', { replace: true });
            });
    }, [user, authLoading, navigate]);




    return (
        <div className="w-full max-w-md mx-auto">
            <h2 className="text-2xl font-heading mb-4 text-center">
                {isSignup ? 'Create Account' : 'Welcome Back'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    className={inputClass}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    className={inputClass}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="
            w-full mt-2
            px-4 py-2 rounded-lg
            bg-sky-500 hover:bg-sky-600
            text-white font-medium
            transition
            disabled:opacity-60
          "
                >
                    {loading ? 'Please wait…' : isSignup ? 'Sign Up' : 'Login'}
                </button>
            </form>

            <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-[color:var(--border-color)]" />
                <span className="text-sm text-[color:var(--text-muted)]">
                    or continue with
                </span>
                <div className="h-px flex-1 bg-[color:var(--border-color)]" />
            </div>

            <button
                type="button"
                onClick={signInWithGoogle}
                className="
    w-full flex items-center justify-center gap-3
    px-4 py-2 rounded-lg
    border border-[color:var(--border-color)]
    bg-transparent
    text-[color:var(--text-primary)]
    hover:bg-[color:var(--accent-soft)]
    transition
  "
            >
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                />
                <span className="font-medium">
                    Continue with Google
                </span>
            </button>



            {error && (
                <div className="mt-3 p-3 rounded-lg bg-red-500/20 text-red-600 dark:text-red-400 text-sm">
                    {error}
                </div>
            )}

            <div className="mt-4 text-center">
                <button
                    type="button"
                    onClick={() => setIsSignup(!isSignup)}
                    className="
            text-sm
            px-3 py-1 rounded-lg
            bg-slate-200 dark:bg-white/10
            hover:bg-slate-300 dark:hover:bg-white/20
            transition
          "
                >
                    {isSignup
                        ? 'Already have an account? Login'
                        : 'New user? Create an account'}
                </button>
            </div>
        </div>
    );
};

export default AuthForm;
