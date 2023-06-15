const sql = 'CREATE TABLE IF NOT EXISTS CustomerMessage (id INTEGER PRIMARY KEY,  message TEXT, isRead INTEGER DEFAULT 0, userId INTEGER, FOREIGN KEY (userId) REFERENCES users(id))';

function createCustomerMessageTable(db) {
    db.run(sql);
}

module.exports = { createCustomerMessageTable }