/*
# Create Database Webhook: rfq_submissions INSERT -> Make.com

1. Purpose
   - When a new RFQ row is inserted into public.rfq_submissions, send an HTTP POST
     notification to the Make.com Custom Webhook URL so the Make scenario can email
     artimo.engineering@gmail.com with the RFQ details.
   - This is the only notification path configured for RFQ submissions.

2. Extensions
   - Enable pg_net (async HTTP client for PostgreSQL) if not already enabled.
     Used only for the outbound POST; no schema/table changes occur.

3. Database objects
   - Create schema `rfq_webhook` (IF NOT EXISTS) to hold the trigger function so
     no existing application schema is modified.
   - Create function `rfq_webhook.notify_make_rfq()` which:
       * Reads the NEW row from public.rfq_submissions
       * Builds a JSON payload containing: id, product_type, company_name,
         contact_name, email, industry, application, delivery_date, notes,
         file_urls, created_at
       * Calls net.http_post() to the Make.com webhook URL with Content-Type
         application/json
   - Create trigger `rfq_submissions_insert_make_webhook`
       AFTER INSERT ON public.rfq_submissions
       FOR EACH ROW
       EXECUTE FUNCTION rfq_webhook.notify_make_rfq()

4. Security
   - No new tables, no RLS changes, no policy changes.
   - The trigger function runs with SECURITY INVOKER (default) and performs only
     an outbound HTTP POST to the configured Make.com webhook URL.
   - No secrets are stored in the database; the Make.com webhook URL is a public
     endpoint intended to receive POSTed data.

5. Idempotency
   - CREATE EXTENSION IF NOT EXISTS pg_net
   - CREATE SCHEMA IF NOT EXISTS rfq_webhook
   - DROP TRIGGER IF EXISTS before CREATE TRIGGER
   - CREATE OR REPLACE FUNCTION for the trigger function
   - Safe to re-run.

6. Important notes
   - This migration does NOT touch:
       * supabase/functions/submit-rfq/index.ts
       * Any table schema, column, migration, RLS policy, or storage setting
       * Any frontend file
       * Gmail configuration
       * The Make.com scenario itself
   - The Make.com Custom Webhook URL is:
       https://hook.eu1.make.com/9xu7yjcx9b8j77mr33jjizb4mqftci0a
*/

-- 1. Enable pg_net for outbound HTTP
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 2. Dedicated schema for the webhook trigger function (does not touch app schema)
CREATE SCHEMA IF NOT EXISTS rfq_webhook;

-- 3. Trigger function: POST the new RFQ row to the Make.com webhook
CREATE OR REPLACE FUNCTION rfq_webhook.notify_make_rfq()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  payload jsonb;
  webhook_url text := 'https://hook.eu1.make.com/9xu7yjcx9b8j77mr33jjizb4mqftci0a';
BEGIN
  payload := jsonb_build_object(
    'event',         'rfq_insert',
    'table',         'rfq_submissions',
    'id',            NEW.id,
    'product_type',  NEW.product_type,
    'company_name',  NEW.company_name,
    'contact_name',  NEW.contact_name,
    'email',         NEW.email,
    'industry',      NEW.industry,
    'application',   NEW.application,
    'delivery_date', NEW.delivery_date,
    'notes',         NEW.notes,
    'file_urls',     NEW.file_urls,
    'created_at',    NEW.created_at
  );

  PERFORM net.http_post(
    url := webhook_url,
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := payload
  );

  RETURN NEW;
END;
$$;

-- 4. AFTER INSERT trigger on rfq_submissions (idempotent)
DROP TRIGGER IF EXISTS rfq_submissions_insert_make_webhook ON public.rfq_submissions;

CREATE TRIGGER rfq_submissions_insert_make_webhook
  AFTER INSERT ON public.rfq_submissions
  FOR EACH ROW
  EXECUTE FUNCTION rfq_webhook.notify_make_rfq();
