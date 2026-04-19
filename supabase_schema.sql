-- EMBEDDER MASTER SCHEMA
-- Ensure schema exists
create schema if not exists public;

-- WARNING: This will drop all existing tables and recreate the entire hardware intelligence layer.

-- 0. Cleanup existing entities
drop table if exists test_runs cascade;
drop table if exists chat_messages cascade;
drop table if exists devices cascade;
drop table if exists files cascade;
drop table if exists projects cascade;
drop table if exists embeddings cascade;
drop function if exists match_embeddings;

-- 1. Prerequisites
create extension if not exists vector;

-- 2. Projects Table (Hardware Knowledge Graphs)
create table projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null,
  description text,
  target_device text not null, -- 'arduino_uno', 'esp32', 'stm32', etc.
  language text not null, -- 'c_cpp', 'micropython', 'verilog'
  metadata jsonb default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 3. Files Table (Firmware Source & Schematics)
create table files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects on delete cascade not null,
  path text not null,
  content text,
  language text,
  is_entry_point boolean default false,
  metadata jsonb default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(project_id, path)
);

-- 4. Devices Table (Hardware Registry)
create table devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  port_path text,
  vendor_id int,
  product_id int,
  device_type text,
  chip_id text,
  name text,
  capabilities jsonb default '{}',
  last_seen timestamp with time zone default now()
);

-- 5. Chat Messages (Neural Link History)
create table chat_messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects on delete cascade not null,
  user_id uuid references auth.users not null,
  role text check (role in ('user', 'assistant', 'system')),
  content text not null,
  metadata jsonb default '{}',
  created_at timestamp with time zone default now()
);

-- 6. Test Runs (HIL Verification Logs)
create table test_runs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects on delete cascade not null,
  user_id uuid references auth.users not null,
  device_id uuid references devices,
  status text check (status in ('pending', 'running', 'passed', 'failed')),
  results jsonb default '{}',
  created_at timestamp with time zone default now(),
  completed_at timestamp with time zone
);

-- 7. Embeddings (Vectorized Datasheets & Component Docs)
create table embeddings (
  id uuid primary key default gen_random_uuid(),
  source text,
  content text,
  embedding vector(1536), -- Optimized for Gemini / OpenAI embedding models
  metadata jsonb default '{}',
  created_at timestamp with time zone default now()
);

-- 8. Vector Search Function
create or replace function match_embeddings (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  source text,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    embeddings.id,
    embeddings.source,
    embeddings.content,
    embeddings.metadata,
    1 - (embeddings.embedding <=> query_embedding) as similarity
  from embeddings
  where 1 - (embeddings.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
end;
$$;

-- 9. Row Level Security (RLS) Policies
alter table projects enable row level security;
drop policy if exists "Users can manage their own projects" on projects;
create policy "Users can manage their own projects" on projects for all using (auth.uid() = user_id);

alter table files enable row level security;
drop policy if exists "Users can manage files of their projects" on files;
create policy "Users can manage files of their projects" on files for all using (
  exists (select 1 from projects where id = files.project_id and user_id = auth.uid())
);

alter table devices enable row level security;
drop policy if exists "Users can manage their own devices" on devices;
create policy "Users can manage their own devices" on devices for all using (auth.uid() = user_id);

alter table chat_messages enable row level security;
drop policy if exists "Users can manage their own chat messages" on chat_messages;
create policy "Users can manage their own chat messages" on chat_messages for all using (auth.uid() = user_id);

alter table test_runs enable row level security;
drop policy if exists "Users can manage their own test runs" on test_runs;
create policy "Users can manage their own test runs" on test_runs for all using (auth.uid() = user_id);

alter table embeddings enable row level security;
drop policy if exists "Embeddings are readable by authenticated users" on embeddings;
create policy "Embeddings are readable by authenticated users" on embeddings for select using (auth.role() = 'authenticated');

-- 11. Triggers for updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_projects_updated_at on projects;
create trigger update_projects_updated_at before update on projects for each row execute function update_updated_at_column();

drop trigger if exists update_files_updated_at on files;
create trigger update_files_updated_at before update on files for each row execute function update_updated_at_column();

-- 12. PERMISSIONS (Apply after tables are created)
grant usage on schema public to postgres, anon, authenticated, service_role;
grant all on all tables in schema public to postgres, anon, authenticated, service_role;
grant all on all sequences in schema public to postgres, anon, authenticated, service_role;
grant all on all routines in schema public to postgres, anon, authenticated, service_role;

-- Ensure future tables also get these permissions
alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to postgres, anon, authenticated, service_role;
