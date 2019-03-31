const express = require('express');
const bookRouter=express.Router();
const { MongoClient } = require('mongodb');
// const sql = require('mssql'); IF SQLSERVER IS USED

 function router(nav){
  const books=[{
        title:'War and Peace',
        genre:'Historical Fiction',
        author:'Lev Nikolayevich Tolstoy',
        read:false
    },
    {
        title:'Les Miserables',
        genre:'Historical Fiction',
        author:'Victor Hugo',
        read:false
    },
    {
        title:'The Time Machine',
        genre:'Science Fiction',
        author:'H.G. Wells',
        read:false
    },
    {
        title:'A Journey into Center of the Earth',
        genre:'Science Fiction',
        author:'Jules Verne',
        read:false
    },
    {
        title:'The Dark World',
        genre:'Fantasy',
        author:'Henry Kuttner',
        read:false
    }
 ];
    
    bookRouter.route('/').get((req,res)=>{
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
//  IF MONGODB IS USED
        // const url ='mongodb://localhost:27017';
        // const dbName='libraryApp';
        // (async function mongo(){
        //     let client;
        //     try{
        //         client= await MongoClient.connect(url);
        //         console.log('Connected correctly to server');
        //         const db=client.db(dbName);
        //         const col = await db.collection('books')
        //         const books =await col.find().toArray();
        
        res.render('bookListView',
        {
            nav, 
            title:'Library',
            books
        });
        // IF MONGODB IS USED
    // }catch(err){
    //     console.log(err.stack);
    // }
    // client.close();
    // }());
    });
    
    bookRouter.route('/:id').get((req,res)=>{
        const {id}= req.params;
        res.render('bookView',
        {
            nav, 
            title:'Library',
            book:books[id]});
    });
    return bookRouter
}

    module.exports=router;