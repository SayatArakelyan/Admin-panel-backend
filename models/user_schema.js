
const sql = 'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT, role TEXT DEFAULT "user", isVerify INTEGER DEFAULT 0   )';

function createUsersTable(db) {
    db.run(sql);
}

module.exports = { createUsersTable }