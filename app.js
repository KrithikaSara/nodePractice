const express = require('express');
const chalk = require('chalk');
// const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
// const pug = require('pug');
// const sql= require('mssql'); IF SQLSERVER IS USED

const app = express();
const port=process.env.PORT || 3000;

const config = {
    user: 'library',
    password: 'psL1brary',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'PSLibrary',
 
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

// sql.connect(config).catch(err=>console.log(err));

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [{link:'/books',title:'Books'},
{link:'/authors',title:'Authors'}];

const bookRouter=require('./src/routes/bookRoutes')(nav);
const adminRouter=require('./src/routes/adminRoutes')(nav);

app.use('/books',bookRouter);
app.use('/admin',adminRouter);
app.get('/', (req, res) => {
    res.render(
        'index', 
        {
            nav, 
            title:'Library'
        }
    );
});


app.listen(port, () => {
    console.log(`listening on port ${chalk.green(port)}`);
});