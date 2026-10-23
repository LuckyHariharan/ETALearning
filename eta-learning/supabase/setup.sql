alter table public.profiles enable row level security;
alter table public.students enable row level security;

create or replace function public.eta_is_active_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'admin'
      and is_active = true
  );
$$;

revoke all on function public.eta_is_active_admin() from public;
grant execute on function public.eta_is_active_admin() to authenticated;
grant select on public.profiles, public.students to authenticated;

drop policy if exists "eta_profiles_select_self_or_admin" on public.profiles;
create policy "eta_profiles_select_self_or_admin"
  on public.profiles
  for select
  to authenticated
  using (id = (select auth.uid()) or public.eta_is_active_admin());

drop policy if exists "eta_profiles_select_guard" on public.profiles;
create policy "eta_profiles_select_guard"
  on public.profiles
  as restrictive
  for select
  to authenticated
  using (id = (select auth.uid()) or public.eta_is_active_admin());

drop policy if exists "eta_students_select_owned_or_admin" on public.students;
create policy "eta_students_select_owned_or_admin"
  on public.students
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.profiles
      where id = (select auth.uid())
        and is_active = true
    )
    and (parent_id = (select auth.uid()) or public.eta_is_active_admin())
  );

drop policy if exists "eta_students_select_guard" on public.students;
create policy "eta_students_select_guard"
  on public.students
  as restrictive
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.profiles
      where id = (select auth.uid())
        and is_active = true
    )
    and (parent_id = (select auth.uid()) or public.eta_is_active_admin())
  );
