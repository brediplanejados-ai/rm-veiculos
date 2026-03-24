-- Tabela de Agendamentos da RM Auto Center
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  plate TEXT NOT NULL,
  service TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed'))
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Política simples: Qualquer um pode inserir (para o bot do site)
-- Em produção, você pode restringir isso por IP ou usar um Webhook
CREATE POLICY "Enable insert for everyone" ON appointments
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (true);

-- Política: Apenas leitura interna (ou autenticada) para o painel administrativo
CREATE POLICY "Enable reading for authenticated users" ON appointments
AS PERMISSIVE FOR SELECT
TO authenticated
USING (true);
