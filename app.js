const express = require('express');
const chalk = require('chalk');
// const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
// const pug = require('pug');
// const sql= require('mssql'); IF SQLSERVER IS USED
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT;

// IF SQLSERVER IS USED
// const config = {
//     user: 'library',
//     password: 'psL1brary',
//     server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
//     database: 'PSLibrary',

//     options: {
//         encrypt: true // Use this if you're on Windows Azure
//     }
// }
// sql.connect(config).catch(err=>console.log(err));

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));
require('./src/config/passport.js')(app);
app.use(express.static(path.join(__dirname, '/public/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [{ link: '/books', title: 'Books' },
{ link: '/authors', title: 'Authors' }
];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.get('/', (req, res) => {
    res.render(
        'index',
        {
            nav,
            title: 'Library'
        }
    );
});

app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`listening on port ${chalk.green(port)}`);
});