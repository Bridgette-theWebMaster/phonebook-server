BEGIN;

TRUNCATE users RESTART IDENTITY CASCADE;

INSERT INTO users ( name, email, password, phone, address, city, state, picture ) 
    VALUES 
    ('test', 'test@test.com','$2a$10$vLs6m4crVxHaSZFjBKDhBONLrVDhggl8qTtWC9KffrYQXE18TEOo6', '213-456-7890', '321 main st.', 'Denver', 'CO', ''); /*password*/

    COMMIT;