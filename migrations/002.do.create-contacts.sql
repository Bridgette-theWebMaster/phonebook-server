CREATE TABLE contacts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid,
    name TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    picture TEXT,
    note TEXT,
    CONSTRAINT fk_users
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
	  ON DELETE CASCADE
);