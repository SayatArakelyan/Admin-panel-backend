const sql = 'CREATE TABLE IF NOT EXISTS Services (id INTEGER PRIMARY KEY, title TEXT, description TEXT)';

function createServicesTable(db) {
    db.run(sql);
}

module.exports = { createServicesTable }