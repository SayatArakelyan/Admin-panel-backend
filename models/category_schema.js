

const sql = 'CREATE TABLE IF NOT EXISTS Category (id INTEGER PRIMARY KEY, title TEXT)';

function createCategoryTable(db) {
    db.run(sql);
}

module.exports = { createCategoryTable }