/*
# Create RFQ submissions table and storage bucket

1. New Tables
- `rfq_submissions` — stores engineering RFQ requests submitted via the website
  - id (uuid, primary key)
  - product_type (text, not null) — selected fastener type
  - company_name (text, not null) — company or contact name
  - contact_name (text) — optional individual contact name
  - email (text, not null) — reply email
  - industry (text) — optional industry sector
  - application (text) — optional application description
  - engineering_data (jsonb) — all dynamic engineering fields keyed by field name
  - notes (text) — additional requirements / notes
  - delivery_date (text) — required delivery date
  - file_urls (jsonb) — array of {name, url} objects for uploaded files
  - created_at (timestamptz, default now)
2. Storage
- Create public bucket `rfq-uploads` for RFQ file attachments
3. Security
- Enable RLS on `rfq_submissions`
- Allow anon + authenticated INSERT only (public submission form, no read access)
- Storage bucket policies allow anon upload to rfq-uploads path
*/

CREATE TABLE IF NOT EXISTS rfq_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_type text NOT NULL,
  company_name text NOT NULL,
  contact_name text,
  email text NOT NULL,
  industry text,
  application text,
  engineering_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  notes text,
  delivery_date text,
  file_urls jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE rfq_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_rfq" ON rfq_submissions;
CREATE POLICY "anon_insert_rfq" ON rfq_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('rfq-uploads', 'rfq-uploads', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "anon_upload_rfq" ON storage.objects;
CREATE POLICY "anon_upload_rfq" ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'rfq-uploads');

DROP POLICY IF EXISTS "public_read_rfq" ON storage.objects;
CREATE POLICY "public_read_rfq" ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'rfq-uploads');
