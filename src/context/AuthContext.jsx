import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { getMyProfile } from '../lib/profile';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        // 1️⃣ Initial session check (page refresh / first load)
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!isMounted) return;

            if (!session?.user) {
                setUser(null);
                setRole(null);
                setLoading(false);
                return;
            }

            setUser(session.user);
            setLoading(true);

            getMyProfile()
                .then((profile) => setRole(profile.role))
                .catch(() => setRole(null))
                .finally(() => setLoading(false));
        });

        // 2️⃣ Listen for auth changes (login, logout, OAuth)
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session?.user) {
                setUser(null);
                setRole(null);
                setLoading(false);
                return;
            }

            setUser(session.user);
            setLoading(true);

            getMyProfile()
                .then((profile) => setRole(profile.role))
                .catch(() => setRole(null))
                .finally(() => setLoading(false));
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, role, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
