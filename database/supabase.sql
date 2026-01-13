/* ============================================================
    PERSONAL EXPENSE & BUDGET ANALYTICS — FULL DATABASE SETUP
    This file creates:
    - Auth-linked user profiles with roles (admin / user)
    - Expense records with item, category, date, and notes
    - Monthly budgets for budget vs actual tracking
    - Secure Row Level Security for multi-user isolation
    - Admin-level access for platform-wide analytics
    - Automatic profile creation on user signup
   ============================================================ */



-- =====================================================
-- PROFILES
-- =====================================================
create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    role text not null default 'user',
    created_at timestamp with time zone default now()
);

-- =====================================================
-- EXPENSES
-- =====================================================
create table public.expenses (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.profiles(id) on delete cascade,

    item_name text not null,
    category text not null,
    amount numeric not null,
    expense_date date not null,
    note text,

    created_at timestamp with time zone default now()
);

-- =====================================================
-- BUDGETS
-- =====================================================
create table public.budgets (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.profiles(id) on delete cascade,
    category text not null,
    month date not null,
    amount numeric not null,
    created_at timestamp with time zone default now()
);

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================
alter table public.profiles enable row level security;
alter table public.expenses enable row level security;
alter table public.budgets enable row level security;

-- =====================================================
-- PROFILE POLICIES
-- =====================================================

-- Users can read their own profile
create policy "Users can read own profile"
on public.profiles
for select
using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = id);

-- =====================================================
-- EXPENSE POLICIES (USER)
-- =====================================================

create policy "Users read own expenses"
on public.expenses
for select
using (auth.uid() = user_id);

create policy "Users insert own expenses"
on public.expenses
for insert
with check (auth.uid() = user_id);

create policy "Users update own expenses"
on public.expenses
for update
using (auth.uid() = user_id);

create policy "Users delete own expenses"
on public.expenses
for delete
using (auth.uid() = user_id);

-- =====================================================
-- ADMIN EXPENSE ACCESS
-- =====================================================

create policy "Admins read all expenses"
on public.expenses
for select
using (
    exists (
    select 1 from public.profiles
    where id = auth.uid()
        and role = 'admin'
    )
);

-- =====================================================
-- BUDGET POLICIES (USER ONLY)
-- =====================================================

create policy "Users read own budgets"
on public.budgets
for select
using (auth.uid() = user_id);

create policy "Users insert own budgets"
on public.budgets
for insert
with check (auth.uid() = user_id);

create policy "Users update own budgets"
on public.budgets
for update
using (auth.uid() = user_id);

-- =====================================================
-- AUTH → PROFILE AUTO CREATION
-- =====================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id)
    values (new.id);
    return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
