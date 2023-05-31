const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('database.db');
const {checkAdmin} = require('../functions/checkAdmin');

function getOneProduct(req, res) {
    const id = req.params.id;
    db.get(`SELECT name, title, price, Products.description as pdescription, Category.description as cDescription FROM Products INNER JOIN Category ON Products.category_id = Category.id WHERE Products.id = ?`, [id], (error, data) => {
        if (error) {
            res.status(500).json({msg: 'Error: Server error'});
        }
        if (!data) {
            res.status(404).json({msg: 'Error: Product not found'});
        }
        res.status(200).json(data);
    })

}

function getProductsList(req, res) {
    db.all(`SELECT * FROM Products`, (error, data) => {
        if (error) {
            res.status(500).json({msg: 'Error: Server error'});
        }
        res.status(200).json(data || []);
    })
}


function createProduct(req, res) {
    const isAdmin = checkAdmin(req, res);
    if (isAdmin) {
        const {nameEn, nameRu, price, descriptionEn, descriptionRu, category} = req.body;
        db.run('INSERT INTO Products(nameEn, nameRu, descriptionEn, descriptionRu, price, image, category) VALUES (?,?,?,?,?,?,?)', [nameEn, nameRu, descriptionEn, descriptionRu, price, `uploads/products/${req.file.filename}`, category], (error, data) => {
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

function updateProduct(req, res) {
    const id = req.params.id;
    const isAdmin = checkAdmin(req, res);
    if (isAdmin) {
        const {nameEn, NameRu, price, descriptionEn, descriptionRu, category} = req.body;

        db.run('UPDATE Products SET nameEn = ?, nameRu = ?, price = ?, descriptionEn = ?, descriptionRu= ?, WHERE id = ?', [nameEn, NameRu, price, descriptionEn, descriptionRu, id], (error, data) => {
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

function deleteProduct(req, res) {
    const id = req.params.id
    const isAdmin = checkAdmin(req, res);
    if (isAdmin) {
        db.run('DELETE FROM Products WHERE id = ?', [id], (error, data) => {
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
    createProduct,
    updateProduct,
    deleteProduct,
    getOneProduct,
    getProductsList
}