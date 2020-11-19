BEGIN;

TRUNCATE contacts RESTART IDENTITY CASCADE;

INSERT INTO contacts ( user_id, name, email, phone, street, zip, note ) 
    VALUES 
    ('1', 'Jane', 'jane@test.com', '123-456-7890', '123 main st.', '90210', 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.');

    COMMIT;
