const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('database.db');
const CryptoJS = require("crypto-js");
const {generateAccessToken} = require('../middlewares/generateAccessToken');

function register(req, res) {
    console.log(req.body);
    const email = req.body.Email;
    const password = req.body.password;


    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({msg: 'Invalid email format'});
    }


    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (password.length < 6 && !passwordRegex.test(password)) {
        return res.status(400).json({msg: 'Password should be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one digit'});
    }


    const {FirstName, LastName, BirthDate, gender, country, phoneNumber} = req.body
    db.get('SELECT * FROM users WHERE Email = ?', [email], (error, row) => {
        if (error) {
            res.status(500).json({msg: 'Error: from username check'});
        }
        if (row) {
            res.status(409).json({msg: 'Username Already Exists'});
        } else {
            const sql = 'INSERT INTO users (image, email, password, FirstName, LastName, birthDate, gender, country, phoneNumber, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const hashedPassword = CryptoJS.SHA256(password).toString();
            console.log(req.file.filename);
            let img = "";
            if (req.file.filename === undefined) {
                img = "uploads/users/default-avatar.jpg";
            } else {
                img = `uploads/users/${req.file.filename}`;
            }

            db.run(sql, [img, email, hashedPassword, FirstName, LastName, BirthDate, gender, country, phoneNumber, "user"], (error, data) => {
                if (error) {
                    res.status(500).json({msg: 'Error: User create error'});
                }

                res.status(201).send({msg: 'User created', data});
            });
        }
    });
}


function login(req, res) {
    const {Email, password} = req.body;
    const hashed_password = CryptoJS.SHA256(password).toString();

    const sql = `SELECT * FROM Users WHERE Email = ?`;
    db.get(sql, [Email], (error, row) => {
        if (error) {
            res.status(500).json({msg: 'Error: Server error'});
        }
        if (!row) {
            res.status(404).json({msg: 'No Such User'});
        } else if (hashed_password === row.password) {
            const token = generateAccessToken(row.image, row.Email, row.password, row.FirstName, row.LastName, row.BirthDate, row.country, row.phoneNumber, row.role);
            res.status(200).json({jwt: token, user: row});
        } else {
            res.status(403).json({msg: 'Wrong Password'});
        }
    })
}

function changeUserRole(req, res) {
    const {Email, role} = req.body;
    db.run('UPDATE Users SET role = ? WHERE Email = ?', [role, Email], (error, data) => {
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