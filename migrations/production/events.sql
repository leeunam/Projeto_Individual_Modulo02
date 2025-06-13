CREATE TABLE IF NOT EXISTS 'events' (
    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'name' VARCHAR(100) NOT NULL,
    'user_id' INTEGER REFERENCES 'users' ('id'),
    'address_id' INTEGER REFERENCES 'address' ('id'),
    'event_time' TIME NOT NULL,
    'event_date' DATE NOT NULL,
    'description' VARCHAR(250),
)