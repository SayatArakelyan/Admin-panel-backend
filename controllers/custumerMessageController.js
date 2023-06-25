const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('database.db');
const {checkAdmin} = require('../functions/checkAdmin');

function getMessageList(req, res) {
    const { userId } = req.params;


    db.all(`SELECT * FROM CustomerMessage WHERE userId = ?`, [userId],(error, data) => {
        if (error) {
            res.status(500).json({msg: 'Error: Server error'});
        }
        res.status(200).json(data || []);
    })
}


function createCustomerMessage(req, res) {
    const isAdmin = checkAdmin(req, res);
    if (isAdmin) {
        const {message,userId} = req.body;
        db.run('INSERT INTO CustomerMessage(message,userId) VALUES (?,?)', [message,userId], (error, data) => {
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


function updateCustomerMessage(req, res) {
    const id = req.params.id;


    db.run('UPDATE CustomerMessage SET isRead = 1 WHERE id = ?', [ id], (error, data) => {
        if (error) {
            res.status(500).json({ msg: error.message });
        } else {
            res.status(201).json(data);
        }
    });
}


function deleteCustomerMessage(req, res) {
    const { userId, id } = req.params;
     const {isRead} = req.body

        db.run('DELETE FROM CustomerMessage   WHERE userId = ? AND id = ?', [id,userId], (error, data) => {
            if (error) {
                res.send(error);
            } else {
                res.status(201).json({msg: "Customer message deleted"});
            }
        })

}





module.exports = {
    getMessageList,
    createCustomerMessage,
    updateCustomerMessage,
    deleteCustomerMessage,

}
























