const express = require('express')
const app = express()
require('dotenv').config();
const sqlite = require('sqlite3').verbose();
const usersSchema = require('./models/user_schema');
const vacancySchema = require('./models/vacancy_schema')
const servicesSchema = require('./models/services_schema')
const productSchema = require('./models/products_schema')
const categorySchema = require("./models/category_schema")

const port = process.env.PORT || 3000

const db = new sqlite.Database("database.db")

const auth = require('./routes/auth');
const products = require('./routes/products');
const categories = require('./routes/category')

app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/products', products);
app.use('/api/categories', categories);

app.use('/uploads', express.static('./_uploads'));

app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    res.status(err.status).json({error: err.message})
});
app.use((err, req, res, next) => {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).json({error: err.message});
});

usersSchema.createUsersTable(db);
vacancySchema.createVacancyTable(db)
servicesSchema.createServicesTable(db)
productSchema.createProductTable(db)
categorySchema.createCategoryTable(db)

app.use(express.json());



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})