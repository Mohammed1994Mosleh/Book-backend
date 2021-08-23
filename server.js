'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const server = express();
server.use(cors());
mongoose.connect('mongodb://localhost:27017/Books', { useNewUrlParser: true, useUnifiedTopology: true });


const Book = new mongoose.Schema({
    title: String,
    description:String,
    email :String
});

const booKModel = mongoose.model('Books', Book);

function bookCollection() {
    const moHammed = new booKModel({
        title:'Pawns in the Game' ,
        description:'Here is a true story of international intrigue, romances, corruption, graft, and political assassinations, the like of which has never been written before',
        email :"mohammed1994mosleh@gmail.com"
    })

    const ali = new booKModel({
        title: 'Industrial instrumentation',
       description:'sensor types and transducer',
       email :"Ali1994mosleh@gmail.com"
    })

    const ahmed = new booKModel({
        title: 'power system analysis',
        description:'power sysytem analysis and types',
        email :"Ahmed1994mosleh@gmail.com"
    })
    moHammed.save();
    ali.save();
    ahmed.save();
}
bookCollection(); 

server.get('/test', testHandler);
server.get('/books',bookHandler)
//localhost:/books?bookName=bookName
function bookHandler(req,res){
    let bookName1=req.query.bookName;

console.log('hi');
    booKModel.find({email:bookName1},function(err,nameData){

        if(err) {
            console.log('error in getting the data')
        } else{

            res.send(nameData)
        }
        
    })

}

function testHandler(req, res) {
    res.send('all good')
}



server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
})














// seedDataCollection(); // npm start