const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('database.db');
const {checkAdmin} = require('../functions/checkAdmin');

function getOneCategory(req, res){
    const id = req.params.id;
    db.get(`SELECT * FROM Category where id = ?`, [id],(error, data) => {
        if(error) {
            res.status(500).json({msg: 'Error: Server error'});
        }
        if(!data) {
            res.status(404).json({msg: 'Error: Category not found'});
        }
        res.status(200).json(data);
    })

}

function getCategoryList(req, res){
    db.all(`SELECT * FROM Category`, (error, data) => {
        if(error) {
            res.status(500).json({msg: 'Error: Server error'});
        }
        console.log(data)
        res.status(200).json(data || []);
    })
}




function createCategory(req, res) {
    const isAdmin = checkAdmin(req, res);
    if (isAdmin) {
        const {title,description} = req.body;
        db.run('INSERT INTO Category (title,description) VALUES (?,?)', [title,description], (error, data) => {
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

function updateCategory(req, res) {
    const id = req.params.id;
    const isAdmin = checkAdmin(req, res);
    if (isAdmin) {
        const {title, description} = req.body;

        db.run('UPDATE Category SET title = ?, description = ? WHERE id = ?', [title, description, id], (error, data) => {
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

function deleteCategory(req, res) {
    const id = req.params.id;
    const isAdmin = checkAdmin(req, res);
    if (isAdmin) {
        db.run('DELETE FROM Category WHERE id = ?', [id], (error, data) => {
            if (error) {
                res.send(error);
            } else {
                res.status(201).json({msg: "Product deleted"});
            }
        })
    } else {
        res.status(401).send({msg: "Denied Access"});
    }
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getOneCategory,
    getCategoryList
}