-- ONE CALL™ — Schema principale
-- Esegui questo script nel SQL Editor di Supabase

create table if not exists richieste (
  id              uuid        default gen_random_uuid() primary key,
  created_at      timestamptz default now(),
  numero          text        generated always as ('OC-' || to_char(created_at, 'YYYY') || '-' || lpad(floor(extract(epoch from created_at))::text, 4, '0')) stored,

  -- Step 1 & 2
  tipo_intervento text        not null,
  settore         text        not null,

  -- Step 3
  localita        text,
  indirizzo       text,
  tempistica      text        default 'breve_termine' check (tempistica in ('urgente','breve_termine','programmabile')),
  sopralluogo     boolean     default false,

  -- Step 5
  descrizione     text,
  condizioni      text,

  -- Step 6
  nome_cognome    text,
  azienda         text,
  telefono        text,
  email           text,

  -- Stato interno (gestito dall'admin)
  stato           text        default 'in_valutazione'
                              check (stato in ('in_valutazione','sopralluogo','in_esecuzione','in_attesa_info','completata')),
  note_admin      text,
  allegati        jsonb       default '[]'::jsonb
);

-- Indici
create index if not exists richieste_created_at_idx on richieste (created_at desc);
create index if not exists richieste_stato_idx       on richieste (stato);
create index if not exists richieste_tempistica_idx  on richieste (tempistica);

-- Row Level Security
alter table richieste enable row level security;

-- Chiunque può inserire (modulo pubblico, nessun login richiesto)
create policy "public_insert" on richieste
  for insert with check (true);

-- Solo utenti autenticati possono leggere (dashboard admin)
-- Per ora apriamo anche la lettura agli anonimi per test rapidi;
-- rimuovere la policy "anon_select" una volta aggiunta l'autenticazione admin.
create policy "anon_select" on richieste
  for select using (true);

-- Gli autenticati possono aggiornare (cambio stato, note)
create policy "auth_update" on richieste
  for update using (auth.role() = 'authenticated');
