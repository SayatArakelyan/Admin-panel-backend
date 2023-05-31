const sql = 'CREATE TABLE IF NOT EXISTS Products(id INTEGER PRIMARY KEY, nameEn TEXT, nameRu TEXT, descriptionEn TEXT, descriptionRu TEXT, price INTEGER, image TEXT, category TEXT NOT NULL, FOREIGN KEY(category) REFERENCES Category(title))';

function createProductTable(db) {
    db.run(sql);
}

module.exports = {createProductTable}

