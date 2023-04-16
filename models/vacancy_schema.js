const sql = 'CREATE TABLE IF NOT EXISTS Vacancy (id INTEGER PRIMARY KEY, title TEXT,  description TEXT )';

function createVacancyTable(db) {
    db.run(sql);
}

module.exports = { createVacancyTable }

