BEGIN;

TRUNCATE users RESTART IDENTITY CASCADE;

INSERT INTO users ( name, email, password ) 
    VALUES 
    ('Test', 'Test@Test.com','$2b$10$RO/x8DiOhyW2eYqYfvenlOHCW9sM9nx4pcc7q54peqyCFRZFqlTmW');

    COMMIT;