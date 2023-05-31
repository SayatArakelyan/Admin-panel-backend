const sql = 'CREATE TABLE IF NOT EXISTS SendMessage (id INTEGER PRIMARY KEY, image TEXT, message TEXT, email TEXT )';

function createMessageTable(db) {
    db.run(sql);
}

module.exports = { createMessageTable }