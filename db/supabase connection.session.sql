SELECT * FROM users
UPDATE users 
SET is_admin = TRUE 
WHERE username = 'admin';

DELETE FROM comments WHERE post_id = 18
DELETE FROM submissions WHERE id = 18