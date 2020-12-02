BEGIN;

TRUNCATE contacts RESTART IDENTITY CASCADE;

INSERT INTO contacts ( user_id, name, email, phone, address, city, state, note) 
    VALUES 
    ('e2edecdf-4445-4e14-91c6-3b9a290b722d', 'Augustus', 'fatcat@feline.com', '888-228-6963', '666 Meow Ln', 'Denver', 'CO', 'Meow meow meow'),
    ('e2edecdf-4445-4e14-91c6-3b9a290b722d', 'jane', 'jane@test.com', '123-456-7890', '123 main st.', 'Boulder', 'CO', 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.');

    COMMIT;
