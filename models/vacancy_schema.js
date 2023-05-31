const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

const sql = `
CREATE TABLE IF NOT EXISTS JobCategory (
  id INTEGER PRIMARY KEY,
  titleEn TEXT,
  titleRu TEXT
);

CREATE TABLE IF NOT EXISTS SpecialistLevel (
  id INTEGER PRIMARY KEY,
  titleEn TEXT,
  titleRu TEXT
);

CREATE TABLE IF NOT EXISTS Vacancy (
  id INTEGER PRIMARY KEY,
  image TEXT,
  titleEn TEXT,
  titleRu TEXT,
  descriptionEn TEXT,
  descriptionRu TEXT,
  deadline TEXT,
  jobCategory_id INTEGER,
  specialistLevel_id INTEGER,
  FOREIGN KEY (jobCategory_id) REFERENCES JobCategory(id),
  FOREIGN KEY (specialistLevel_id) REFERENCES SpecialistLevel(id)
);
`;

function createVacancyTable(db) {
    db.exec(sql, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Tables created successfully!");
        }
    });
}

createVacancyTable(db);

// Rest of your server code...

module.exports = { createVacancyTable };
