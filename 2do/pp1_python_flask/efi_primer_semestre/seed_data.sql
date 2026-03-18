-- Asegúrate de que las tablas existan antes de ejecutar este script.

--
-- 1. Roles (Asumiendo que el campo 'role' en 'user' es un string)
--

-- Contraseña para todos es 'password123' (generada con 'generate_password_hash("password123")')
-- **IMPORTANTE:** Reemplaza los hashes a continuación con los generados por tu función `generate_password_hash("password123")`
-- Ejemplo de un hash:
SET @password_hash = 'sha256$gN9bH2bZ$0d862e3d5483f3e1f574d7f57351651e064972c35b809a1240c5f2479e39401f'; 


--
-- 2. Insertar Usuarios de Prueba
--
INSERT INTO user (username, email, password_hash, is_active, role) VALUES 
('AdminUser', 'admin@efi.com', @password_hash, 1, 'admin'),
('ModUser', 'moderator@efi.com', @password_hash, 1, 'moderator'),
('TestUser', 'user@efi.com', @password_hash, 1, 'user')
ON DUPLICATE KEY UPDATE username=username; -- Evita errores si ya existen


--
-- 3. Insertar Categorías
--
INSERT INTO category (name) VALUES 
('Tecnología'), 
('Tutoriales'), 
('Noticias'),
('Opinión')
ON DUPLICATE KEY UPDATE name=name;

-- 
-- 4. Insertar Posts 
--
SET @admin_id = (SELECT id FROM user WHERE username = 'AdminUser');
SET @tech_id = (SELECT id FROM category WHERE name = 'Tecnología');

INSERT INTO post (title, content, user_id, category_id, created_at) VALUES 
('Flask + React: La Combinación Perfecta', 'Un post sobre la arquitectura moderna con JWT.', @admin_id, @tech_id, NOW()),
('Guía de Despliegue', 'Pasos para llevar tu app a producción.', @admin_id, @tech_id, NOW());