const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('database.db');
const {checkAdmin} = require('../functions/checkAdmin');

function getJobCategoryList(req, res) {
    db.all(`SELECT * FROM JobCategory`, (error, data) => {
        if (error) {
            res.status(500).json({msg: 'Error: Server error'});
        }
        res.status(200).json(data || []);
    })
}


function createJobCategory(req, res) {
    const isAdmin = checkAdmin(req, res);
    if (isAdmin) {
        const {titleEn, titleRu} = req.body;
        db.run('INSERT INTO JobCategory(titleEn,titleRu) VALUES (?,?)', [titleEn, titleRu], (error, data) => {
            if (error) {
                res.status(500).json({msg: error.message});
            } else {
                res.status(200).json(data);
            }
        })
    } else {
        res.status(401).json({msg: "Denied Access"});
    }
}


function updateJobCategory(req, res) {
    const id = req.params.id;
    const isAdmin = checkAdmin(req, res);
    if (isAdmin) {
        const {titleRu, titleEn} = req.body;

        db.run('UPDATE JobCategory SET titleEn = ?, titleRu = ? WHERE id = ?', [titleEn, titleRu, id], (error, data) => {
            if (error) {
                res.status(500).json({msg: error.message});
            } else {
                res.status(201).json(data);
            }
        })
    } else {
        res.status(401).send({msg: "Denied Access"});
    }
}

function deleteJobCategory(req, res) {
    const id = req.params.id
    const isAdmin = checkAdmin(req, res);
    if (isAdmin) {
        db.run('DELETE FROM JobCategory WHERE id = ?', [id], (error, data) => {
            if (error) {
                res.send(error);
            } else {
                res.status(201).json({msg: "JobCategory deleted"});
            }
        })
    } else {
        res.status(401).send({msg: "Denied Access"});
    }
}

function getSpecialistLevelList(req, res) {
    db.all(`SELECT * FROM SpecialistLevel`, (error, data) => {
        if (error) {
            res.status(500).json({msg: 'Error: Server error'});
        }
        res.status(200).json(data || []);
    })
}


function createSpecialistLevel(req, res) {
    const isAdmin = checkAdmin(req, res);
    if (isAdmin) {
        const {titleEn, titleRu} = req.body;
        db.run('INSERT INTO SpecialistLevel(titleEn,titleRu) VALUES (?,?)', [titleEn, titleRu], (error, data) => {
            if (error) {
                res.status(500).json({msg: error.message});
            } else {
                res.status(200).json(data);
            }
        })
    } else {
        res.status(401).json({msg: "Denied Access"});
    }
}


function updateSpecialistLevel(req, res) {
    const id = req.params.id;
    const isAdmin = checkAdmin(req, res);
    if (isAdmin) {
        const {titleRu, titleEn} = req.body;

        db.run('UPDATE SpecialistLevel SET titleEn = ?, titleRu = ? WHERE id = ?', [titleEn, titleRu, id], (error, data) => {
            if (error) {
                res.status(500).json({msg: error.message});
            } else {
                res.status(201).json(data);
            }
        })
    } else {
        res.status(401).send({msg: "Denied Access"});
    }
}

function deleteSpecialistLevel(req, res) {
    const id = req.params.id;
    const isAdmin = checkAdmin(req, res);
    if (isAdmin) {
        db.run('DELETE FROM SpecialistLevel WHERE id = ?', [id], (error, data) => {
            if (error) {
                res.status(500).json({ msg: error.message });
            } else {
                res.status(201).json({ msg: "JobCategory deleted" });
            }
        });
    } else {
        res.status(401).send({ msg: "Denied Access" });
    }
}


function getVacancyList(req, res) {
    const { categoryId, levelId } = req.query;

    let sql = `SELECT * FROM Vacancy`;

    if (categoryId && levelId) {
        sql += ` WHERE id IN (
            SELECT id FROM Vacancy WHERE jobCategory_id = ? AND specialistLevel_id = ?
        )`;
    } else if (categoryId) {
        sql += ` WHERE id IN (
            SELECT id FROM Vacancy WHERE jobCategory_id = ?
        )`;
    } else if (levelId) {
        sql += ` WHERE id IN (
            SELECT id FROM Vacancy WHERE specialistLevel_id = ?
        )`;
    }

    if (categoryId && levelId) {
        db.all(sql, [categoryId, levelId], (error, data) => {
            if (error) {
                res.status(500).json({ msg: 'Error: Server error' });
            }
            res.status(200).json(data || []);
        });
    } else if (categoryId) {
        db.all(sql, [categoryId], (error, data) => {
            if (error) {
                res.status(500).json({ msg: 'Error: Server error' });
            }
            res.status(200).json(data || []);
        });
    } else if (levelId) {
        db.all(sql, [levelId], (error, data) => {
            if (error) {
                res.status(500).json({ msg: 'Error: Server error' });
            }
            res.status(200).json(data || []);
        });
    } else {
        db.all(sql, (error, data) => {
            if (error) {
                res.status(500).json({ msg: 'Error: Server error' });
            }
            res.status(200).json(data || []);
        });
    }
}



function createVacancy(req, res) {
    const isAdmin = checkAdmin(req, res);
    if (isAdmin) {
        const {
            titleEn, titleRu, descriptionEn, descriptionRu, deadline,jobCategory_id,specialistLevel_id
        } = req.body;

        db.run('INSERT INTO Vacancy(image,titleEn,titleRu,descriptionEn, descriptionRu, deadline,jobCategory_id,specialistLevel_id) VALUES (?,?,?,?,?,?,?,?)', [`uploads/vacancy/${req.file.filename}`, titleEn, titleRu, descriptionEn, descriptionRu, deadline,jobCategory_id,specialistLevel_id], (error, data) => {
            if (error) {
                res.status(500).json({msg: error.message});
            } else {
                res.status(200).json(data);
            }
        })
    } else {
        res.status(401).json({msg: "Denied Access"});
    }
}


function updateVacancy(req, res) {
    const id = req.params.id;
    const isAdmin = checkAdmin(req, res);
    if (isAdmin) {
        const { titleEn, titleRu, descriptionEn, descriptionRu, deadline,jobCategory_id,specialistLevel_id } = req.body;

        db.run('UPDATE Vacancy SET titleEn = ?, titleRu = ?, descriptionEn = ?, descriptionRu = ?, deadline = ?,jobCategory_id= ?,specialistLevel_id= ? WHERE id = ?', [titleEn, titleRu, descriptionEn, descriptionRu, deadline,jobCategory_id,specialistLevel_id, id], (error, data) => {
            if (error) {
                res.status(500).json({ msg: error.message });
            } else {
                res.status(201).json(data);
            }
        });
    } else {
        res.status(401).send({ msg: "Denied Access" });
    }
}


function deleteVacancy(req, res) {
    const id = req.params.id
    const isAdmin = checkAdmin(req, res);
    if (isAdmin) {
        db.run('DELETE FROM Vacancy WHERE id = ?', [id], (error, data) => {
            if (error) {
                res.send(error);
            } else {
                res.status(201).json({msg: "Vacancy deleted"});
            }
        })
    } else {
        res.status(401).send({msg: "Denied Access"});
    }
}


module.exports = {
    getJobCategoryList,
    createJobCategory,
    updateJobCategory,
    deleteJobCategory,
    getSpecialistLevelList,
    createSpecialistLevel,
    updateSpecialistLevel,
    deleteSpecialistLevel,
    getVacancyList,
    createVacancy,
    updateVacancy,
    deleteVacancy
}