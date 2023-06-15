const express = require('express')
const app = express()
let cors = require('cors')
require('dotenv').config();
const sqlite = require('sqlite3').verbose();

const usersSchema = require('./models/user_schema');
const servicesSchema = require('./models/services_schema')
const productSchema = require('./models/products_schema')
const categorySchema = require("./models/category_schema")
const messageSchema = require("./models/message_schema")
const vacancySchema = require("./models/vacancy_schema")
const customer_message_schema = require("./models/customer_message_schema")

const port = process.env.PORT || 3000

const db = new sqlite.Database("database.db")

const auth = require('./routes/auth');
const products = require('./routes/products');
const categories = require('./routes/category')
const users = require('./routes/users')
const message = require("./routes/message")
const vacancy = require("./routes/vacancy")
const customerMessage = require("./routes/customerMessage")
app.use(cors())

app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/products', products);
app.use('/api/categories', categories);
app.use('/api/users',users);
app.use('/api/sendEmail', message);
app.use('/api/vacancy', vacancy)
app.use("/api/customerMessage",customerMessage)

app.use('/uploads', express.static('./_uploads'));

app.use((req, res) => {
    const err = new Error('Not found');
    err.status = 404;
    res.status(err.status).json({error: err.message})
});
app.use((err, req, res ) => {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).json({error: err.message});
});

usersSchema.createUsersTable(db);
vacancySchema.createVacancyTable(db)
servicesSchema.createServicesTable(db)
productSchema.createProductTable(db)
categorySchema.createCategoryTable(db)
messageSchema.createMessageTable(db)
customer_message_schema.createCustomerMessageTable(db)


app.use(express.json());
const expressListRoutes = require('express-list-endpoints');


const routes = expressListRoutes(app);
console.log('All Routes:');
routes.forEach((route) => {
    console.log(route.path);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})