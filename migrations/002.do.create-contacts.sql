CREATE DOMAIN zip AS TEXT
CHECK(
   VALUE ~ '^\d{5}$'
OR VALUE ~ '^\d{5}-\d{4}$'
);

CREATE TABLE contacts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid,
    name TEXT,
    email TEXT,
    phone TEXT,
    street TEXT,
    zip TEXT,
    note TEXT,
    CONSTRAINT fk_users
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
	  ON DELETE CASCADE
);