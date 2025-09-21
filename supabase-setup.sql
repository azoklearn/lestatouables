-- Configuration de la base de données Supabase pour Les Tatouables
-- Exécuter ces requêtes dans l'éditeur SQL de Supabase

-- Table pour les flash de Sinkolor
CREATE TABLE flash_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    src TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour les créations de Sinkolor
CREATE TABLE sinkolor_creations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    src TEXT NOT NULL,
    alt TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour les tarifs de LDermo
CREATE TABLE ldermo_tarifs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    service TEXT NOT NULL,
    description TEXT,
    prix TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour la sécurité (clés d'administration)
CREATE TABLE admin_keys (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key_name TEXT UNIQUE NOT NULL,
    key_value TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insérer la clé d'administration par défaut
INSERT INTO admin_keys (key_name, key_value) 
VALUES ('admin_password', '03KinepolisdDiva23!');

-- Données par défaut pour les flash
INSERT INTO flash_items (src, caption) VALUES
('images/flash1.jpeg', 'Flash 1'),
('images/flash2.jpeg', 'Flash 2'),
('images/flash3.jpeg', 'Flash 3');

-- Données par défaut pour les créations Sinkolor
INSERT INTO sinkolor_creations (src, alt) VALUES
('images/image9.jpeg', 'Tatouage S''inkolor 9'),
('images/image10.jpeg', 'Tatouage S''inkolor 10'),
('images/image12.jpeg', 'Tatouage S''inkolor 12'),
('images/image13.jpeg', 'Tatouage S''inkolor 13'),
('images/image14.jpeg', 'Tatouage S''inkolor 14'),
('images/image15.jpeg', 'Tatouage S''inkolor 15'),
('images/image16.jpeg', 'Tatouage S''inkolor 16'),
('images/image17.jpeg', 'Tatouage S''inkolor 17');

-- Données par défaut pour les tarifs LDermo
INSERT INTO ldermo_tarifs (service, description, prix) VALUES
('Reconstruction de l''aréole mammaire', 'Tatouage réparateur pour reconstruction de l''aréole après chirurgie mammaire', 'À partir de 200€'),
('Camouflage de cicatrices', 'Tatouage réparateur pour atténuer les cicatrices visibles', 'À partir de 150€'),
('Camouflage de vergetures', 'Tatouage réparateur pour atténuer les vergetures', 'À partir de 180€'),
('Peau brûlée ou greffée', 'Tatouage réparateur spécialisé pour peau brûlée ou greffée', 'Sur devis');

-- Politique de sécurité : lecture publique
CREATE POLICY "Lecture publique" ON flash_items FOR SELECT USING (true);
CREATE POLICY "Lecture publique" ON sinkolor_creations FOR SELECT USING (true);
CREATE POLICY "Lecture publique" ON ldermo_tarifs FOR SELECT USING (true);

-- Politique de sécurité : modification avec clé d'administration
CREATE POLICY "Modification admin" ON flash_items FOR ALL USING (
    EXISTS (
        SELECT 1 FROM admin_keys 
        WHERE key_name = 'admin_password' 
        AND key_value = current_setting('request.headers.x-admin-key', true)
        AND is_active = true
    )
);

CREATE POLICY "Modification admin" ON sinkolor_creations FOR ALL USING (
    EXISTS (
        SELECT 1 FROM admin_keys 
        WHERE key_name = 'admin_password' 
        AND key_value = current_setting('request.headers.x-admin-key', true)
        AND is_active = true
    )
);

CREATE POLICY "Modification admin" ON ldermo_tarifs FOR ALL USING (
    EXISTS (
        SELECT 1 FROM admin_keys 
        WHERE key_name = 'admin_password' 
        AND key_value = current_setting('request.headers.x-admin-key', true)
        AND is_active = true
    )
);

-- Activer RLS (Row Level Security)
ALTER TABLE flash_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE sinkolor_creations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ldermo_tarifs ENABLE ROW LEVEL SECURITY;
