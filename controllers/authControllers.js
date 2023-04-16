const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('database.db');
const CryptoJS = require("crypto-js");
const { generateAccessToken } = require('../middlewares/generateAccessToken');

function register(req, res) {

    console.log(req.body)
    const username = req.body.username;
    const  password = req.body.password

    db.get('SELECT * FROM users WHERE username = ?', [username], (error, row) => {
        if (error) {
            res.status(500).json({msg: 'Error: from username check'});
        }
        if (row) {
            res.status(409).json({msg: 'Username Already Exists'});
        } else {
            const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
            const hashed_password = CryptoJS.SHA256(password).toString();

            db.run(sql, [username, hashed_password, "admin"], (error, data) => {
                if (error) {
                    res.status(500).json({msg: 'Error: User create error'});
                }
                res.status(201).send({ msg:'User created', data});
                // db.get('SELECT * FROM users WHERE username = ?', [username], (error, row) => {
                //     if (error) {
                //         res.send('Error2');
                //     } else {
                //         db.run('INSERT INTO carts (user_id) VALUES (?)', [row.user_id], (error) => {
                //             if (error) {
                //                 res.send('Error3');
                //             } else {
                //                 res.send(JSON.stringify({ status:'User created' }));
                //             }
                //         })
                //     }
                // })
            })
        }
    })
}

function login(req, res) {
    const {username, password } = req.body;
    const hashed_password = CryptoJS.SHA256(password).toString();

    const sql = `SELECT * FROM Users WHERE username = ?`;
    db.get(sql, [username],(error, row) => {
        if (error) {
            res.status(500).json({ msg: 'Error: Server error'});
        }
        if (!row) {
            res.status(404).json({ msg:'No Such User' });
        } else if(hashed_password === row.password) {
            const token = generateAccessToken(row.username, row.role);
            res.status(200).json({jwt: token});
        } else {
            res.status(403).json({ msg:'Wrong Password' });
        }
    })
}
function changeUserRole(req, res) {
    const {username, role } = req.body;
    db.run('UPDATE Users SET role = ? WHERE username = ?', [role, username], (error, data) => {
        if (error) {
            res.status(500).json({msg: error.message});
        } else {
            res.status(201).json(data);
        }
    })
}

module.exports = {
    register,
    login,
    changeUserRole
}