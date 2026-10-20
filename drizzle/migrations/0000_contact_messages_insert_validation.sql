DROP POLICY IF EXISTS "Anyone can send a message" ON public.contact_messages;
CREATE POLICY "Anyone can send a valid message" ON public.contact_messages
FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 100
  AND char_length(email) <= 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(btrim(subject)) BETWEEN 1 AND 150
  AND char_length(btrim(message)) BETWEEN 10 AND 2000
  AND reason IN ('general','technical','suggestion','incorrect','feedback','business')
);