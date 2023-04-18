const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('database.db');


function getOneUser(req, res){
    const id = req.params.id;
    db.get(`SELECT * FROM Users where id = ?`, [id],(error, data) => {
        if(error) {
            res.status(500).json({msg: 'Error: Server error'});
        }
        if(!data) {
            res.status(404).json({msg: 'Error: Category not found'});
        }
        res.status(200).json(data);
    })
}

function getUsersList(req, res){
    db.all(`SELECT * FROM Users`, (error, data) => {
        if(error) {
            res.status(500).json({msg: 'Error: Server error'});
        }
        res.status(200).json(data || []);
    })
}








module.exports = {
    getOneUser,
    getUsersList
}