const express = require('express');
const bookRouter = express.Router();
const { MongoClient, ObjectID } = require('mongodb');
// const sql = require('mssql'); IF SQLSERVER IS USED

function router(nav) {
    bookRouter.use((req,res,next)=>{
        if(req.user){
            next();
        }else{
            res.redirect('/');
        }
    });

    bookRouter.route('/').get((req, res) => {
        //    IF SQLSERVER IS USED     
        // const request = new sql.Request();
        // request.query('select * from books')
        // .then(result=> {console.log(result);
        // res.render('bookListView',
        // {
        //     nav, 
        //     title:'Library',
        //     books:result.recordset
        // })}) 
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                console.log('Connected correctly to server');
                const db = client.db(dbName);
                const col = await db.collection('books')
                const books = await col.find().toArray();

                res.render('bookListView',
                    {
                        nav,
                        title: 'Library',
                        books
                    });
            } catch (err) {
                console.log(err.stack);
            }
            client.close();
        }());
    });

    bookRouter.route('/:id').get((req, res) => {

        const { id } = req.params;
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                console.log('Connected correctly to server');
                const db = client.db(dbName);
                const col = await db.collection('books');
                const book = await col.findOne({_id: new ObjectID(id)});
                console.log(book);
                res.render('bookView',
                {
                    nav,
                    title: 'Library',
                    book
                });
            }catch(err){
                console.log(err.stack);
            }
            client.close();
        }());
        
    });
    return bookRouter
}

module.exports = router;