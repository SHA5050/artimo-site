/*
# Add engineering_data to Make.com Webhook Payload

## Purpose
The existing `rfq_webhook.notify_make_rfq()` trigger function sends 11 fields to
Make.com when a new RFQ is inserted, but it is missing the `engineering_data`
JSONB column. This column contains the complete engineering specification
submitted by the customer (country, phone, products, quantities, standards,
material grades, dimensions, and other engineering fields).

## Changes
1. Replaces the `rfq_webhook.notify_make_rfq()` function to include
   `engineering_data` in the webhook payload sent to Make.com.
2. No new tables, no column changes, no policy changes.
3. The existing trigger `rfq_submissions_insert_make_webhook` automatically
   uses the updated function (CREATE OR REPLACE FUNCTION updates in place).
4. All existing webhook fields are preserved — `engineering_data` is ADDED,
   nothing is removed.

## Security
- No RLS changes.
- No new grants.
- No SECURITY DEFINER — the function remains a regular plpgsql function.
- The webhook URL is hardcoded (same as before).
- No secrets or service-role keys are exposed.

## Notes
1. The webhook URL remains unchanged:
   `https://hook.eu1.make.com/9xu7yjcx9b8j77mr33jjizb4mqftci0a`
2. The trigger fires AFTER INSERT FOR EACH ROW — existing behavior preserved.
3. No data migration — existing rows are not touched.
*/

CREATE OR REPLACE FUNCTION rfq_webhook.notify_make_rfq()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
DECLARE
  payload jsonb;
  webhook_url text := 'https://hook.eu1.make.com/9xu7yjcx9b8j77mr33jjizb4mqftci0a';
BEGIN
  payload := jsonb_build_object(
    'event',            'rfq_insert',
    'table',            'rfq_submissions',
    'id',               NEW.id,
    'product_type',     NEW.product_type,
    'company_name',     NEW.company_name,
    'contact_name',     NEW.contact_name,
    'email',            NEW.email,
    'industry',         NEW.industry,
    'application',      NEW.application,
    'delivery_date',    NEW.delivery_date,
    'engineering_data', NEW.engineering_data,
    'notes',            NEW.notes,
    'file_urls',        NEW.file_urls,
    'created_at',       NEW.created_at
  );

  PERFORM net.http_post(
    url     := webhook_url,
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body    := payload
  );

  RETURN NEW;
END;
$function$;
