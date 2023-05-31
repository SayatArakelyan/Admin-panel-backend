
const sql = 'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY, image TEXT DEFAULT "uploads/users/default-avatar.jpg",Email TEXT UNIQUE , password TEXT, FirstName TEXT,  LastName TEXT, BirthDate TEXT, gender TEXT, country TEXT,phoneNumber INTEGER,   role TEXT DEFAULT "user", isVerify INTEGER DEFAULT 0   )';

function createUsersTable(db) {
    db.run(sql);
}

module.exports = { createUsersTable }