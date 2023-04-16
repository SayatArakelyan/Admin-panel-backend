

const sql = 'CREATE TABLE IF NOT EXISTS Products(id INTEGER PRIMARY KEY, name TEXT, description TEXT, price INTEGER, image TEXT, category_id INTEGER NOT NULL, FOREIGN KEY(category_id) REFERENCES Category(id))';

function createProductTable(db) {
    db.run(sql);
}

module.exports = { createProductTable }

