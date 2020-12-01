BEGIN;

TRUNCATE contacts RESTART IDENTITY CASCADE;

INSERT INTO contacts ( user_id, name, email, phone, address, city, state, note) 
    VALUES 
    ('c07ed7bb-d31f-4184-9e24-a9de5d64bc88', 'Augustus', 'fatcar@feline.com', '888-228-6963', '666 Meow Ln', 'Denver', 'CO', 'Meow meow meow'),
    ('c07ed7bb-d31f-4184-9e24-a9de5d64bc88', 'jane', 'jane@test.com', '123-456-7890', '123 main st.', 'Boulder', 'CO', 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.');

    COMMIT;
