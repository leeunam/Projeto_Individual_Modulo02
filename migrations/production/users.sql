CREATE TABLE IF NOT EXISTS 'users' (
    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'name' VARCHAR(100) NOT NULL,
    'email' INTEGER REFERENCES 'users' ('id'),
    'password' INTEGER REFERENCES 'address' ('id'),
    'role' VARCHAR(60) NOT NULL,
)